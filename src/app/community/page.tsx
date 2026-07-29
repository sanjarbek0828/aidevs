"use client";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Hash, Send, User } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const CHANNELS = [
  { id: 1, name: "umumiy", unread: 0 },
  { id: 2, name: "frontend", unread: 5 },
  { id: 3, name: "backend", unread: 0 },
  { id: 4, name: "prompt-engineering", unread: 12 },
  { id: 5, name: "ai-etika", unread: 0 },
];

const MESSAGES = [
  { id: 1, user: "Azizbek", avatar: "A", time: "10:30", content: "Hammaga salom! Yangi Claude 3.5 Sonnet ni sinab ko'rdinglarmi?", online: true },
  { id: 2, user: "Madina", avatar: "M", time: "10:32", content: "Ha, frontend kod yozishda juda tez ishlarkan. Liking Artifacts funksiyasi zo'r!", online: false },
  { id: 3, user: "devuz", avatar: "D", time: "10:35", content: "Men asosan backend arxitekturasi uchun ishlatyapman, qoniqarli natija beryapti.", online: true },
];

export default function CommunityPage() {
  return (
    <div className="container py-8 max-w-screen-2xl mx-auto h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-6 px-4 md:px-6 relative z-10">
      {/* Sidebar - Channels */}
      <Card className="w-full md:w-72 flex flex-col h-auto md:h-full border-white/5 bg-background/40 backdrop-blur-md overflow-hidden relative z-10">
        <div className="p-5 border-b border-white/5 bg-white/[0.01]">
          <h2 className="font-bold text-lg flex items-center gap-2">
            Kanallar
          </h2>
        </div>
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-1.5">
            {CHANNELS.map(channel => (
              <button 
                key={channel.id} 
                className={`w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-xl transition-all duration-300 hover:bg-white/5 ${channel.name === "umumiy" ? "bg-white/10 font-medium text-primary shadow-sm" : "text-muted-foreground"}`}
              >
                <div className="flex items-center gap-2.5">
                  <Hash className="h-4 w-4 opacity-70" />
                  {channel.name}
                </div>
                {channel.unread > 0 && (
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Main Chat Area */}
      <Card className="flex-1 flex flex-col h-[600px] md:h-full border-white/5 bg-background/40 backdrop-blur-md overflow-hidden relative z-10">
        <div className="p-5 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Hash className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-bold text-xl">umumiy</h2>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground/80">
            <div className="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full">
              <User className="h-4 w-4" /> 125 a'zo
            </div>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-8">
            <div className="flex items-center justify-center my-6">
              <div className="h-px flex-1 bg-border/30"></div>
              <span className="text-xs font-medium text-muted-foreground px-4 py-1 bg-white/5 rounded-full">Bugun</span>
              <div className="h-px flex-1 bg-border/30"></div>
            </div>
            
            {MESSAGES.map(msg => (
              <div key={msg.id} className="flex gap-4 group">
                <div className="relative">
                  <Avatar className="h-10 w-10 mt-0.5 shadow-sm ring-1 ring-white/10 hover:ring-primary/50 transition-all cursor-pointer">
                    <AvatarFallback className="text-sm font-medium bg-gradient-to-br from-primary/20 to-primary/10 text-primary">{msg.avatar}</AvatarFallback>
                  </Avatar>
                  {msg.online && (
                    <span className="absolute bottom-1 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="font-semibold text-sm hover:underline cursor-pointer">{msg.user}</span>
                    <span className="text-xs font-medium text-muted-foreground/70">{msg.time}</span>
                  </div>
                  <div className="mt-1.5 text-sm text-foreground/90 leading-relaxed bg-white/5 px-4 py-2.5 rounded-2xl rounded-tl-sm inline-block max-w-[85%] relative border border-white/5 group-hover:border-white/10 transition-colors">
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        <div className="p-4 sm:p-5 border-t border-white/5 bg-white/[0.01]">
          <form className="relative flex items-end group bg-white/5 border border-white/10 rounded-2xl focus-within:ring-1 focus-within:ring-primary/50 focus-within:border-primary/50 transition-all" onSubmit={(e) => e.preventDefault()}>
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/0 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-50 transition-opacity duration-500 pointer-events-none"></div>
            <textarea 
              placeholder="#umumiy kanaliga xabar yozing (Markdown qo'llab-quvvatlanadi)..." 
              className="w-full bg-transparent border-none focus:outline-none resize-none min-h-[44px] max-h-32 px-4 py-3 text-base placeholder:text-muted-foreground/50 relative z-10 scrollbar-hide"
              rows={1}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement;
                target.style.height = 'auto';
                target.style.height = target.scrollHeight + 'px';
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  // Handle submit
                }
              }}
            />
            <div className="p-2 relative z-10 flex-shrink-0">
              <Button size="icon" type="submit" variant="premium" className="h-9 w-9 rounded-xl shadow-md">
                <Send className="h-4 w-4 ml-0.5" />
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
