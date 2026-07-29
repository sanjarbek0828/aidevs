"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { uz } from "date-fns/locale";
import { Heart, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostComments } from "./post-comments";

export function PostCard({ post, user }: { post: any; user: any }) {
  const [likes, setLikes] = useState(post.likes_count || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentsCount, setCommentsCount] = useState(post.comments_count || 0);
  const supabase = createClient();

  useEffect(() => {
    if (!user) return;
    const checkLike = async () => {
      const { data } = await supabase
        .from('post_likes')
        .select('*')
        .eq('post_id', post.id)
        .eq('user_id', user.id)
        .single();
      if (data) setIsLiked(true);
    };
    checkLike();
  }, [post.id, user]);

  const handleLike = async () => {
    if (!user) return; // redirect to login or show toast
    
    // Optimistic update
    setIsLiked(!isLiked);
    setLikes((prev: number) => isLiked ? prev - 1 : prev + 1);

    if (isLiked) {
      await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', post.id)
        .eq('user_id', user.id);
      
      // Update likes count on post
      await supabase.rpc('decrement_like', { row_id: post.id });
    } else {
      await supabase
        .from('post_likes')
        .insert({ post_id: post.id, user_id: user.id });
      
      // Update likes count on post
      await supabase.rpc('increment_like', { row_id: post.id });
      
      // Send notification
      if (post.author_id !== user.id) {
        await supabase.from('notifications').insert({
          user_id: post.author_id,
          actor_id: user.id,
          type: 'like',
          entity_id: post.id
        });
      }
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/feed/${post.id}`);
    // toast here
  };

  return (
    <Card className="mb-4 glass-card premium-border overflow-hidden">
      <CardHeader className="p-4 sm:p-6 pb-0 flex flex-row items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-border/50">
            <AvatarImage src={post.profiles?.avatar_url || ""} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {post.profiles?.full_name?.[0] || post.profiles?.username?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-[15px]">{post.profiles?.full_name || "Foydalanuvchi"}</span>
            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <span>@{post.profiles?.username || "user"}</span>
              <span>•</span>
              <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: uz })}</span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground rounded-full">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6 pt-3">
        <p className="whitespace-pre-wrap text-[15px] leading-relaxed text-foreground/90">{post.content}</p>
        
        {post.code_snippet && (
          <div className="mt-4 rounded-xl overflow-hidden border border-border/50 bg-[#0d1117]">
            <div className="flex items-center justify-between px-4 py-2 bg-muted/20 border-b border-border/50">
              <span className="text-xs font-mono text-muted-foreground">{post.language || "code"}</span>
            </div>
            <pre className="p-4 overflow-x-auto text-[13px] font-mono leading-relaxed text-gray-300">
              <code>{post.code_snippet}</code>
            </pre>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-2 sm:px-4 sm:pb-4 flex flex-col gap-3 border-t border-border/40">
        <div className="flex items-center gap-1 w-full pt-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex-1 sm:flex-none gap-2 rounded-full transition-colors ${isLiked ? 'text-red-500 hover:text-red-600 hover:bg-red-500/10' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
            <span>{likes > 0 ? likes : ''}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex-1 sm:flex-none gap-2 rounded-full transition-colors ${showComments ? 'text-primary bg-primary/10' : 'text-muted-foreground hover:text-foreground'}`}
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="h-4 w-4" />
            <span>{commentsCount > 0 ? commentsCount : ''}</span>
          </Button>
          
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex-1 sm:flex-none gap-2 text-muted-foreground hover:text-foreground rounded-full"
            onClick={copyLink}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
        
        {showComments && (
          <div className="w-full pt-2">
            <PostComments 
              postId={post.id} 
              user={user} 
              onCommentAdded={() => setCommentsCount(c => c + 1)} 
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
