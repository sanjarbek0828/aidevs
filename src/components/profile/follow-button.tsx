"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

export function FollowButton({ 
  targetUserId, 
  currentUser 
}: { 
  targetUserId: string, 
  currentUser: any 
}) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    if (!currentUser) {
      setLoading(false);
      return;
    }

    const checkFollow = async () => {
      const { data } = await supabase
        .from('follows')
        .select('*')
        .eq('follower_id', currentUser.id)
        .eq('following_id', targetUserId)
        .single();
        
      if (data) setIsFollowing(true);
      setLoading(false);
    };

    checkFollow();
  }, [currentUser, targetUserId]);

  const handleFollow = async () => {
    if (!currentUser) return; // Maybe redirect to login
    
    setLoading(true);
    if (isFollowing) {
      await supabase
        .from('follows')
        .delete()
        .eq('follower_id', currentUser.id)
        .eq('following_id', targetUserId);
      setIsFollowing(false);
    } else {
      await supabase
        .from('follows')
        .insert({
          follower_id: currentUser.id,
          following_id: targetUserId
        });
      setIsFollowing(true);
      
      // Notification
      await supabase.from('notifications').insert({
        user_id: targetUserId,
        actor_id: currentUser.id,
        type: 'follow',
        entity_id: currentUser.id
      });
    }
    setLoading(false);
  };

  if (!currentUser || currentUser.id === targetUserId) return null;

  return (
    <Button 
      onClick={handleFollow} 
      disabled={loading}
      variant={isFollowing ? "outline" : "default"}
      className="w-full mt-4 rounded-full"
    >
      {isFollowing ? "Kuzatishni to'xtatish" : "Obuna bo'lish"}
    </Button>
  );
}
