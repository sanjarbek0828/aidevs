"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { MessageSquare, Heart, Terminal } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function getRelativeTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) return `${diffInSeconds}s`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} daqiqa oldin`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} soat oldin`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} kun oldin`;
}

export function FeedPreview() {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [newPostAvailable, setNewPostAvailable] = useState(false);
  const supabase = createClient();

  const fetchLatestPost = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*, profiles(*)")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();
    
    if (data) setPost(data);
    setLoading(false);
    setNewPostAvailable(false);
  };

  useEffect(() => {
    fetchLatestPost();

    // Subscribe to new posts
    const channel = supabase
      .channel("public:posts")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        () => {
          setNewPostAvailable(true);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  if (loading) {
    return <div className="h-48 rounded-xl bg-card animate-pulse w-full border border-border" />;
  }

  if (!post) {
    return (
      <div className="p-8 rounded-xl border border-border bg-card flex flex-col items-center justify-center text-center">
        <MessageSquare className="h-8 w-8 text-muted-foreground opacity-20 mb-3" />
        <p className="text-muted-foreground text-sm">
          Hozircha postlar mavjud emas.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {newPostAvailable && (
        <div className="absolute -top-6 inset-x-0 flex justify-center z-20">
          <button 
            onClick={fetchLatestPost}
            className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-semibold shadow-md animate-in slide-in-from-top-2 fade-in flex items-center gap-1.5 hover:opacity-90 transition-opacity"
          >
            Yangi post mavjud
          </button>
        </div>
      )}
      
      <div className="p-6 md:p-8 rounded-xl border border-border bg-card hover:border-border/80 transition-colors">
        <div className="flex justify-between items-start mb-5">
          <div className="flex items-center gap-3">
            <Link href={`/profile/${post.profiles?.username || 'dev'}`}>
              <Avatar className="h-10 w-10 rounded-full border border-border">
                <AvatarImage src={post.profiles?.avatar_url || `https://github.com/${post.profiles?.username || 'dev'}.png`} />
                <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-medium">
                  {post.profiles?.full_name?.charAt(0) || post.profiles?.username?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
              <Link href={`/profile/${post.profiles?.username || 'dev'}`}>
                <h4 className="font-semibold text-sm text-foreground hover:underline transition-colors">
                  {post.profiles?.full_name || `@${post.profiles?.username || 'developer'}`}
                </h4>
              </Link>
              <p className="text-xs text-muted-foreground">
                {getRelativeTime(post.created_at)}
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-foreground text-sm leading-relaxed mb-5 whitespace-pre-wrap">
          {post.content}
        </p>
        
        {post.code_snippet && (
          <div className="mb-5 rounded-lg border border-border bg-background p-4 overflow-x-auto">
            <div className="flex items-center gap-2 mb-2 text-[10px] uppercase font-medium text-muted-foreground tracking-wider">
              <Terminal className="h-3 w-3" /> {post.language || 'code'}
            </div>
            <pre className="text-sm font-mono text-foreground/80">
              <code>{post.code_snippet}</code>
            </pre>
          </div>
        )}

        <div className="flex items-center gap-5 pt-4 text-muted-foreground">
          <button className="flex items-center gap-1.5 hover:text-foreground transition-colors text-xs font-medium group/btn">
            <Heart className="h-4 w-4 group-hover/btn:text-foreground transition-colors" />
            <span>{post.likes_count || 0}</span>
          </button>
          <button className="flex items-center gap-1.5 hover:text-foreground transition-colors text-xs font-medium group/btn">
            <MessageSquare className="h-4 w-4 group-hover/btn:text-foreground transition-colors" />
            <span>0</span>
          </button>
        </div>
      </div>
    </div>
  );
}
