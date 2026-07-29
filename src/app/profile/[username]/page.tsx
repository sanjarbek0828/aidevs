import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Link as LinkIcon, Trophy, Flame, Sparkles, Edit, Calendar, LayoutGrid, MessageSquare, Terminal } from "lucide-react";
import { Icons } from "@/components/shared/icons";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FollowButton } from "@/components/profile/follow-button";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const supabase = await createClient();
  
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) {
    notFound();
  }

  const { data: { user } } = await supabase.auth.getUser();
  const isOwnProfile = user?.id === profile.id;

  const [{ count: followersCount }, { count: followingCount }, { count: postsCount }] = await Promise.all([
    supabase.from('follows').select('*', { count: 'exact', head: true }).eq('following_id', profile.id),
    supabase.from('follows').select('*', { count: 'exact', head: true }).eq('follower_id', profile.id),
    supabase.from('posts').select('*', { count: 'exact', head: true }).eq('author_id', profile.id)
  ]);

  const joinDate = new Date(profile.created_at).toLocaleDateString('uz-UZ', { year: 'numeric', month: 'long' });

  return (
    <div className="min-h-screen pb-20 relative bg-background pt-24">
      <div className="container max-w-5xl px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - User Info */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="flex flex-col items-center lg:items-start space-y-4">
              <Avatar className="h-28 w-28 md:h-32 md:w-32 border border-border bg-background rounded-full shadow-sm">
                <AvatarImage src={profile.avatar_url || `https://github.com/${username}.png`} alt={profile.full_name || username} />
                <AvatarFallback className="text-3xl bg-secondary text-secondary-foreground font-medium">
                  {(profile.full_name || username).substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center lg:items-start space-y-1 w-full text-center lg:text-left">
                <h1 className="text-2xl font-bold text-foreground">{profile.full_name || username}</h1>
                <p className="text-muted-foreground text-sm font-medium">@{username}</p>
                <div className="flex gap-4 mt-2 text-sm text-muted-foreground">
                  <div><span className="font-bold text-foreground">{followersCount || 0}</span> obunachilar</div>
                  <div><span className="font-bold text-foreground">{followingCount || 0}</span> obunalar</div>
                  <div><span className="font-bold text-foreground">{postsCount || 0}</span> postlar</div>
                </div>
              </div>
              
              {profile.bio && (
                <p className="text-center lg:text-left text-sm text-foreground leading-relaxed w-full">
                  {profile.bio}
                </p>
              )}
              
              <div className="flex flex-col space-y-3 text-sm text-muted-foreground w-full mt-4">
                {profile.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0" /> <span className="truncate">{profile.location}</span>
                  </div>
                )}
                {profile.website_url && (
                  <div className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 shrink-0" /> 
                    <Link href={profile.website_url} target="_blank" className="hover:text-foreground hover:underline transition-colors truncate">
                      {profile.website_url.replace(/^https?:\/\//, '')}
                    </Link>
                  </div>
                )}
                {profile.github_url && (
                  <div className="flex items-center gap-2">
                    <Icons.gitHub className="h-4 w-4 shrink-0" /> 
                    <Link href={profile.github_url} target="_blank" className="hover:text-foreground hover:underline transition-colors truncate">
                      {profile.github_url.split('github.com/')[1] || 'GitHub'}
                    </Link>
                  </div>
                )}
                {profile.twitter_url && (
                  <div className="flex items-center gap-2">
                    <Icons.twitter className="h-4 w-4 shrink-0" /> 
                    <Link href={profile.twitter_url} target="_blank" className="hover:text-foreground hover:underline transition-colors truncate">
                      {profile.twitter_url.split('twitter.com/')[1] || 'Twitter'}
                    </Link>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0" /> Joined {joinDate}
                </div>
              </div>
              
              <div className="flex w-full pt-4">
                {isOwnProfile ? (
                  <Link href="/profile/edit" className="w-full">
                    <Button className="w-full rounded-full bg-card hover:bg-accent border-border text-foreground font-medium" variant="outline">
                      <Edit className="h-4 w-4 mr-2" /> Profilni tahrirlash
                    </Button>
                  </Link>
                ) : (
                  <FollowButton targetUserId={profile.id} currentUser={user} />
                )}
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-border">
              <h3 className="font-semibold text-sm text-foreground">
                Yutuqlar
              </h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-accent text-foreground font-medium text-xs rounded-full px-3 py-1">
                  Hamjamiyat a'zosi
                </Badge>
              </div>
            </div>
            
          </div>

          {/* Right Content - Tabs */}
          <div className="lg:col-span-8">
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="flex border-b border-border bg-transparent w-full h-auto p-0 justify-start space-x-6">
                <TabsTrigger value="posts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-0 font-medium text-sm">
                  Postlar
                </TabsTrigger>
                <TabsTrigger value="prompts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-0 font-medium text-sm">
                  Prompts
                </TabsTrigger>
                <TabsTrigger value="projects" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-0 font-medium text-sm">
                  Loyihalar
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="posts" className="mt-6 space-y-4">
                <div className="bg-card border border-border rounded-xl p-8 text-center flex flex-col items-center justify-center">
                  <MessageSquare className="h-8 w-8 text-muted-foreground mb-3 opacity-20" />
                  <h3 className="text-base font-semibold mb-1">Hozircha postlar yo'q</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {isOwnProfile ? "Fikrlaringiz bilan bo'lishing." : `${profile.full_name || username} hali hech narsa e'lon qilmadi.`}
                  </p>
                  {isOwnProfile && (
                    <Link href="/community">
                      <Button variant="default" size="sm" className="rounded-lg">Birinchi postni yozish</Button>
                    </Link>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="prompts" className="mt-6">
                <div className="bg-card border border-border rounded-xl p-8 text-center flex flex-col items-center justify-center">
                  <Terminal className="h-8 w-8 text-muted-foreground mb-3 opacity-20" />
                  <h3 className="text-base font-semibold mb-1">Hozircha promptlar yo'q</h3>
                  <p className="text-sm text-muted-foreground">
                    Saqlangan yoki yaratilgan promptlar shu yerda ko'rinadi.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="projects" className="mt-6">
                <div className="bg-card border border-border rounded-xl p-8 text-center flex flex-col items-center justify-center">
                  <LayoutGrid className="h-8 w-8 text-muted-foreground mb-3 opacity-20" />
                  <h3 className="text-base font-semibold mb-1">Hozircha loyihalar yo'q</h3>
                  <p className="text-sm text-muted-foreground">
                    Loyihalar va ishlanmalar ro'yxati shu yerda bo'ladi.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
