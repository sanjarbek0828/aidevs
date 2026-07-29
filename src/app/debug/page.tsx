"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bug, CheckCircle2, MessageSquare, ArrowBigUp, Plus, X, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function DebugPage() {
  const [issues, setIssues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const supabase = createClient();

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const { data } = await supabase
        .from("issues")
        .select("*, profiles(*)")
        .order("created_at", { ascending: false });

      if (data) {
        setIssues(data);
      }
      setLoading(false);
    }
    
    // Realtime subscription for issues (synchronous setup for proper cleanup)
    const subscription = supabase
      .channel('public-issues-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'issues' },
        async (payload) => {
          if (payload.eventType === 'INSERT') {
            const { data: profile } = await supabase.from('profiles').select('*').eq('id', payload.new.author_id).single();
            setIssues(prev => [{ ...payload.new, profiles: profile }, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setIssues(prev => prev.map(issue => issue.id === payload.new.id ? { ...issue, ...payload.new } : issue));
          } else if (payload.eventType === 'DELETE') {
            setIssues(prev => prev.filter(issue => issue.id !== payload.old.id));
          }
        }
      )
      .subscribe();

    loadData();

    return () => {
      supabase.removeChannel(subscription);
    }
  }, [supabase]);

  const handleCreateIssue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    const newIssue = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      language: formData.get("language") as string,
      author_id: user.id,
      status: "open",
      votes_count: 0,
      answers_count: 0
    };

    const { data, error } = await supabase
      .from("issues")
      .insert([newIssue])
      .select("*, profiles(*)")
      .single();

    if (!error && data) {
      setShowCreateModal(false);
    }
    
    setIsSubmitting(false);
  };

  const handleVote = async (issueId: string, currentVotes: number) => {
    if (!user) return; 
    
    // Optimistic update
    setIssues(prev => prev.map(issue => issue.id === issueId ? { ...issue, votes_count: currentVotes + 1 } : issue));

    await supabase
      .from("issues")
      .update({ votes_count: currentVotes + 1 })
      .eq("id", issueId);
  };

  return (
    <div className="container py-8 max-w-5xl mx-auto px-4 md:px-6 relative z-10 pt-24">
      
      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-background border border-border rounded-xl w-full max-w-2xl shadow-xl overflow-hidden">
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-border bg-card">
              <h2 className="text-xl font-semibold tracking-tight">
                Yangi muammo
              </h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 rounded-md hover:bg-accent transition-colors text-muted-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreateIssue} className="p-4 md:p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Muammo sarlavhasi</label>
                <Input name="title" required placeholder="Masalan: Next.js hydration error" className="bg-card border-border rounded-lg" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Texnologiya (Til/Framework)</label>
                <Input name="language" required placeholder="TypeScript, React" className="bg-card border-border rounded-lg" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Muammoning batafsil tavsifi</label>
                <Textarea name="description" required rows={6} placeholder="Xatolik tafsilotlari..." className="bg-card border-border rounded-lg resize-none" />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)} className="rounded-lg">Bekor qilish</Button>
                <Button type="submit" variant="default" disabled={isSubmitting} className="rounded-lg">
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />} Qo'shish
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="flex flex-col space-y-8 mt-4 md:mt-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Debug Markazi</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Xatoliklarni topish va jamiyat bilan yechim izlash
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Muammoni qidirish..."
                className="pl-9 bg-background border-border rounded-lg h-9 text-sm"
              />
            </div>
            {user && (
              <Button onClick={() => setShowCreateModal(true)} variant="default" className="h-9 text-sm rounded-lg">
                <Bug className="mr-2 h-4 w-4" />
                Yangi Muammo
              </Button>
            )}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Badge variant="default" className="cursor-pointer px-3 py-1 rounded-full text-xs">Barchasi</Badge>
          <Badge variant="outline" className="cursor-pointer bg-background border-border text-foreground px-3 py-1 rounded-full text-xs hover:bg-accent">Hal qilingan</Badge>
          <Badge variant="outline" className="cursor-pointer bg-background border-border text-foreground px-3 py-1 rounded-full text-xs hover:bg-accent">Ochiq</Badge>
        </div>

        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
            </div>
          ) : issues.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground bg-background rounded-xl border border-border text-sm">
              Hozircha muammolar mavjud emas.
            </div>
          ) : issues.map((issue) => (
            <div key={issue.id} className="flex flex-col sm:flex-row group overflow-hidden border border-border bg-background hover:border-border/80 transition-colors rounded-xl">
              
              <div className="flex sm:flex-col items-center sm:justify-center p-3 sm:p-5 sm:w-20 border-b sm:border-b-0 sm:border-r border-border bg-card/50 gap-4 sm:gap-3 shrink-0">
                <button 
                  onClick={() => handleVote(issue.id, issue.votes_count || 0)}
                  className="flex flex-col items-center group/vote hover:bg-accent p-2 rounded-lg transition-colors"
                >
                  <ArrowBigUp className={cn("h-6 w-6 transition-colors", issue.votes_count > 0 ? "text-foreground" : "text-muted-foreground group-hover/vote:text-foreground")} />
                  <span className={cn("font-medium text-sm mt-1", issue.votes_count > 0 ? "text-foreground" : "text-muted-foreground")}>
                    {issue.votes_count || 0}
                  </span>
                </button>
                <div className="flex flex-col items-center text-muted-foreground">
                  <MessageSquare className="h-4 w-4 mb-1 opacity-50" />
                  <span className="text-[10px] font-medium">{issue.answers_count || 0} javob</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col p-5">
                <div className="flex justify-between items-start mb-2 gap-4">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors cursor-pointer">
                    {issue.title}
                  </h3>
                  {issue.status === 'solved' ? (
                    <Badge variant="outline" className="bg-background text-foreground border-border whitespace-nowrap text-[10px] font-medium">
                      <CheckCircle2 className="mr-1 h-3 w-3" /> SOLVED
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-background text-muted-foreground border-border whitespace-nowrap text-[10px] font-medium">
                      OPEN
                    </Badge>
                  )}
                </div>
                
                <p className="line-clamp-2 text-muted-foreground mt-1 text-sm leading-relaxed whitespace-pre-wrap">
                  {issue.description}
                </p>
                
                <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                  <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-accent border-none text-foreground font-medium">
                    {issue.language}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    Muallif:
                    <Link href={`/profile/${issue.profiles?.username || 'dev'}`} className="text-foreground font-medium hover:underline transition-colors flex items-center">
                      {issue.profiles?.full_name || issue.profiles?.username || 'Foydalanuvchi'}
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
