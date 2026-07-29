"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { CreatePost } from "@/components/posts/create-post";
import { PostCard } from "@/components/posts/post-card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export function FeedClient({ initialPosts, user }: { initialPosts: any[]; user: any }) {
  const [posts, setPosts] = useState<any[]>(initialPosts);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length === 20);
  const supabase = createClient();

  const fetchPosts = async (offset = 0) => {
    const { data } = await supabase
      .from("posts")
      .select("*, profiles(*)")
      .order("created_at", { ascending: false })
      .range(offset, offset + 19);
    
    return data || [];
  };

  const loadMore = async () => {
    setLoadingMore(true);
    const newPosts = await fetchPosts(posts.length);
    if (newPosts.length < 20) setHasMore(false);
    setPosts(prev => [...prev, ...newPosts]);
    setLoadingMore(false);
  };

  const handlePostCreated = async () => {
    // Re-fetch top posts or rely on realtime
    const newPosts = await fetchPosts(0);
    setPosts(newPosts);
  };

  useEffect(() => {
    const channel = supabase
      .channel("public:posts")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "posts" },
        () => handlePostCreated()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <CreatePost user={user} onPostCreated={handlePostCreated} />
      
      <div className="space-y-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} user={user} />
        ))}
        
        {posts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-2xl border border-border/50">
            Hali hech qanday post yo'q. Birinchi bo'lib yozing!
          </div>
        )}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <Button 
            variant="outline" 
            onClick={loadMore} 
            disabled={loadingMore}
            className="rounded-full px-8"
          >
            {loadingMore && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Ko'proq yuklash
          </Button>
        </div>
      )}
    </div>
  );
}
