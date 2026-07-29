"use client";

import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";
import { uz } from "date-fns/locale";
import { createClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function PostComments({ postId, user, onCommentAdded }: { postId: string, user: any, onCommentAdded: () => void }) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  const fetchComments = async () => {
    const { data } = await supabase
      .from('post_comments')
      .select('*, profiles(*)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });
    
    if (data) setComments(data);
  };

  useEffect(() => {
    fetchComments();

    const channel = supabase
      .channel(`comments-${postId}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'post_comments', filter: `post_id=eq.${postId}` },
        () => fetchComments()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;
    
    setIsSubmitting(true);
    const { data, error } = await supabase
      .from('post_comments')
      .insert({
        post_id: postId,
        author_id: user.id,
        content: newComment.trim()
      })
      .select()
      .single();
      
    if (!error) {
      setNewComment("");
      onCommentAdded();
      
      // Update comment count on post (optional depending on if it's trigger based)
      // Notifications
      const { data: postData } = await supabase.from('posts').select('author_id').eq('id', postId).single();
      if (postData && postData.author_id !== user.id) {
        await supabase.from('notifications').insert({
          user_id: postData.author_id,
          actor_id: user.id,
          type: 'comment',
          entity_id: postId
        });
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-4 mt-2">
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8 border border-border/50 shrink-0">
                <AvatarImage src={comment.profiles?.avatar_url || ""} />
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {comment.profiles?.full_name?.[0] || comment.profiles?.username?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col bg-muted/40 p-3 rounded-2xl rounded-tl-none border border-border/30 flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-[13px]">{comment.profiles?.full_name || "Foydalanuvchi"}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {formatDistanceToNow(new Date(comment.created_at), { addSuffix: true, locale: uz })}
                  </span>
                </div>
                <p className="text-[13px] text-foreground/90">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-center text-muted-foreground py-2">Hali izohlar yo'q. Birinchi bo'lib fikr bildiring!</p>
      )}

      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-3 items-end mt-2">
          <Avatar className="h-8 w-8 border border-border/50 shrink-0">
            <AvatarImage src={user.user_metadata?.avatar_url || ""} />
            <AvatarFallback className="bg-primary/10 text-primary text-xs">
              {user.user_metadata?.full_name?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 relative">
            <Textarea
              placeholder="Izoh yozing..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="min-h-[40px] h-[40px] py-2 px-4 resize-none rounded-full border-border/50 bg-background focus-visible:ring-primary/20 text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
          </div>
          <Button 
            type="submit" 
            size="sm" 
            disabled={!newComment.trim() || isSubmitting}
            className="rounded-full h-10 px-4"
          >
            {isSubmitting ? "..." : "Yuborish"}
          </Button>
        </form>
      ) : (
        <p className="text-xs text-center text-muted-foreground mt-2">
          Izoh yozish uchun tizimga kiring
        </p>
      )}
    </div>
  );
}
