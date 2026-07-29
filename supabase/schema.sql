-- aidevs.uz Supabase Full Schema & RLS Policies

-- ==========================================
-- 1. PROFILES TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    location TEXT,
    github_url TEXT,
    twitter_url TEXT,
    website_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone." 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." 
ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Trigger to automatically create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'username', -- If passed during signup
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists so we can safely run this multiple times
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- ==========================================
-- 2. POSTS TABLE (For Lenta / Feed)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    code_snippet TEXT,
    language TEXT,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts are viewable by everyone." 
ON public.posts FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert posts." 
ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own posts." 
ON public.posts FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete own posts." 
ON public.posts FOR DELETE USING (auth.uid() = author_id);


-- ==========================================
-- 3. MESSAGES TABLE (For Community Realtime Chat)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    channel TEXT DEFAULT 'general' NOT NULL,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Messages are viewable by everyone." 
ON public.messages FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert messages." 
ON public.messages FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own messages." 
ON public.messages FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Users can delete own messages." 
ON public.messages FOR DELETE USING (auth.uid() = author_id);


-- ==========================================
-- 4. JOBS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.jobs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT NOT NULL,
    type TEXT NOT NULL, -- Remote, Full-time, Part-time, Freelance
    description TEXT NOT NULL,
    requirements TEXT,
    posted_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Jobs are viewable by everyone." 
ON public.jobs FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert jobs." 
ON public.jobs FOR INSERT WITH CHECK (auth.uid() = posted_by);

CREATE POLICY "Users can update own jobs." 
ON public.jobs FOR UPDATE USING (auth.uid() = posted_by);

CREATE POLICY "Users can delete own jobs." 
ON public.jobs FOR DELETE USING (auth.uid() = posted_by);


-- ==========================================
-- 5. AI TOOLS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.ai_tools (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    url TEXT NOT NULL,
    category TEXT NOT NULL,
    submitted_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.ai_tools ENABLE ROW LEVEL SECURITY;

CREATE POLICY "AI Tools are viewable by everyone." 
ON public.ai_tools FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert AI tools." 
ON public.ai_tools FOR INSERT WITH CHECK (auth.uid() = submitted_by);


-- ==========================================
-- 6. PROMPTS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.prompts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    votes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Prompts are viewable by everyone." 
ON public.prompts FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert prompts." 
ON public.prompts FOR INSERT WITH CHECK (auth.uid() = author_id);


-- ==========================================
-- 7. ISSUES TABLE (For Debug Center)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.issues (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    language TEXT NOT NULL,
    status TEXT DEFAULT 'open', -- open or solved
    votes_count INTEGER DEFAULT 0,
    answers_count INTEGER DEFAULT 0,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.issues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Issues are viewable by everyone." 
ON public.issues FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert issues." 
ON public.issues FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own issues." 
ON public.issues FOR UPDATE USING (auth.uid() = author_id);


-- ==========================================
-- 8. ISSUE ANSWERS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.issue_answers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    issue_id UUID REFERENCES public.issues(id) ON DELETE CASCADE NOT NULL,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.issue_answers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Issue answers are viewable by everyone." 
ON public.issue_answers FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert issue answers." 
ON public.issue_answers FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own issue answers." 
ON public.issue_answers FOR UPDATE USING (auth.uid() = author_id);


-- ==========================================
-- 9. ENABLE REALTIME FOR MESSAGES
-- ==========================================
-- Supabase needs publication to track realtime changes
-- Enable logical replication for messages table
BEGIN;
  DROP PUBLICATION IF EXISTS supabase_realtime;
  CREATE PUBLICATION supabase_realtime;
COMMIT;
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
