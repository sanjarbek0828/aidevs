"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Hash, Send, User, Loader2, MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const CHANNELS = [
  { id: 1, name: "umumiy", unread: 0 },
  { id: 2, name: "frontend", unread: 0 },
  { id: 3, name: "backend", unread: 0 },
  { id: 4, name: "prompt-engineering", unread: 0 },
  { id: 5, name: "ai-etika", unread: 0 },
];

export default function CommunityPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [activeChannel, setActiveChannel] = useState("umumiy");
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();
  const router = useRouter();

  // Auto scroll to bottom
  const scrollToBottom = () => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (!user) {
        router.push("/login");
        return;
      }

      // Auto-heal missing profile
      const { data: existingProfile } = await supabase.from('profiles').select('id').eq('id', user.id).single();
      if (!existingProfile) {
        await supabase.from('profiles').insert({
          id: user.id,
          username: user.user_metadata?.username || `user_${Math.floor(Math.random()*10000)}`,
          full_name: user.user_metadata?.full_name || 'Developer',
          avatar_url: user.user_metadata?.avatar_url || ''
        });
      }

      // Fetch messages
      const { data } = await supabase
        .from("messages")
        .select("*, profiles(*)")
        .eq("channel", activeChannel)
        .order("created_at", { ascending: true })
        .limit(100);

      if (data) setMessages(data);
      setLoading(false);
      setTimeout(scrollToBottom, 100);
    }
    
    // Subscribe to real-time changes synchronously to avoid remount race condition
    const subscription = supabase
      .channel(`public:messages:channel=eq.${activeChannel}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `channel=eq.${activeChannel}`
        },
        async (payload) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', payload.new.author_id)
            .single();
            
          const newMessageWithProfile = {
            ...payload.new,
            profiles: profileData
          };
          
          setMessages(prev => [...prev, newMessageWithProfile]);
          setTimeout(scrollToBottom, 100);
        }
      )
      .subscribe();

    loadInitialData();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [activeChannel, supabase, router]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newMessage.trim() || !user || sending) return;

    setSending(true);
    const content = newMessage.trim();
    setNewMessage(""); 

    // Optimistic UI update could be added here, but for simplicity we rely on fast insert + realtime

    const { error } = await supabase
      .from("messages")
      .insert({
        content,
        channel: activeChannel,
        author_id: user.id
      });

    if (error) {
      console.error("Error sending message:", error, error.message, error.details, error.hint, error.code);
      setNewMessage(content); // Restore
    }
    
    setSending(false);
  };

  return (
    <div className="flex flex-col h-[100dvh] pt-14 md:pt-16 pb-16 md:pb-0 bg-background w-full relative z-10">
      
      {/* Mobile Channel Bar (Horizontal scroll) */}
      <div className="md:hidden flex overflow-x-auto p-2 gap-2 border-b border-border scrollbar-hide shrink-0">
        {CHANNELS.map(channel => (
          <button 
            key={channel.id} 
            onClick={() => setActiveChannel(channel.name)}
            className={cn(
              "px-4 py-1.5 whitespace-nowrap text-xs font-medium rounded-full transition-colors flex items-center gap-1.5",
              activeChannel === channel.name 
                ? "bg-foreground text-background" 
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            <Hash className="h-3 w-3 opacity-50" />
            {channel.name}
          </button>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Desktop Sidebar */}
        <div className="hidden md:flex w-64 flex-col border-r border-border bg-card shrink-0">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold text-sm tracking-tight flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              Kanallar
            </h2>
          </div>
          <ScrollArea className="flex-1 p-3">
            <div className="space-y-0.5">
              {CHANNELS.map(channel => (
                <button 
                  key={channel.id} 
                  onClick={() => setActiveChannel(channel.name)}
                  className={cn(
                    "w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md transition-colors",
                    activeChannel === channel.name 
                      ? "bg-accent text-foreground font-medium" 
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  <Hash className="h-4 w-4 opacity-40" />
                  {channel.name}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-background relative overflow-hidden">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-border flex justify-between items-center bg-background shrink-0">
            <div className="flex items-center gap-2">
              <Hash className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold text-base">{activeChannel}</h2>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Real-time
            </div>
          </div>
          
          {/* Messages Area */}
          <ScrollArea className="flex-1 px-4 py-4" ref={scrollRef}>
            <div className="space-y-6 pb-2 max-w-4xl mx-auto">
              {loading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center flex flex-col items-center justify-center py-32 text-muted-foreground">
                  <MessageSquare className="h-10 w-10 opacity-20 mb-4" />
                  <p className="text-sm">Hali xabarlar yo'q. Birinchi bo'lib yozing!</p>
                </div>
              ) : (
                messages.map((msg, i) => {
                  const date = new Date(msg.created_at);
                  const timeString = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
                  
                  const prevMsg = i > 0 ? messages[i-1] : null;
                  const isConsecutive = prevMsg && 
                                        prevMsg.author_id === msg.author_id && 
                                        (date.getTime() - new Date(prevMsg.created_at).getTime() < 5 * 60000);

                  return (
                    <div key={msg.id} className={cn("flex gap-4 group", isConsecutive ? "mt-1" : "mt-6")}>
                      <div className="w-9 shrink-0 flex justify-center">
                        {!isConsecutive ? (
                          <Avatar className="h-9 w-9 rounded-full border border-border">
                            <AvatarImage src={msg.profiles?.avatar_url || `https://github.com/${msg.profiles?.username || 'dev'}.png`} />
                            <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                              {msg.profiles?.full_name?.charAt(0) || msg.profiles?.username?.charAt(0) || 'U'}
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <span className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                            {timeString}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        {!isConsecutive && (
                          <div className="flex items-baseline gap-2 mb-1">
                            <span className="font-semibold text-sm text-foreground">
                              {msg.profiles?.full_name || `@${msg.profiles?.username}`}
                            </span>
                            <span className="text-xs text-muted-foreground">{timeString}</span>
                          </div>
                        )}
                        
                        <div className="text-sm text-foreground leading-relaxed whitespace-pre-wrap break-words">
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>
          
          {/* Input Area */}
          <div className="p-4 border-t border-border bg-background shrink-0">
            <div className="max-w-4xl mx-auto">
              <form className="relative flex flex-col bg-card border border-border rounded-xl focus-within:border-ring transition-colors shadow-sm overflow-hidden" onSubmit={handleSendMessage}>
                <textarea 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`#${activeChannel} kanaliga xabar yozish...`}
                  className="w-full bg-transparent border-none focus:outline-none resize-none min-h-[52px] max-h-48 px-4 py-3.5 text-sm placeholder:text-muted-foreground/70"
                  rows={1}
                  onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="flex justify-between items-center px-2 pb-2 pt-1">
                  <div className="text-[10px] text-muted-foreground px-2 hidden sm:block">
                    <span className="font-semibold">Enter</span> bilan yuboring, <span className="font-semibold">Shift + Enter</span> bilan yangi qator
                  </div>
                  <Button size="icon" type="submit" className="h-8 w-8 rounded-lg ml-auto" disabled={sending || !newMessage.trim()}>
                    {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
