"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Copy, MessageSquare, ThumbsUp, Plus, X, Loader2, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Textarea } from "@/components/ui/textarea";

export default function PromptsPage() {
  const [prompts, setPrompts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const supabase = createClient();

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const { data } = await supabase
        .from("prompts")
        .select("*, profiles(*)")
        .order("created_at", { ascending: false });

      if (data) {
        setPrompts(data);
      }
      setLoading(false);
    }
    loadData();
  }, [supabase]);

  const handleCreatePrompt = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    const newPrompt = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      category: formData.get("category") as string,
      author_id: user.id
    };

    const { data, error } = await supabase
      .from("prompts")
      .insert([newPrompt])
      .select("*, profiles(*)")
      .single();

    if (!error && data) {
      setPrompts([data, ...prompts]);
      setShowCreateModal(false);
    }
    
    setIsSubmitting(false);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto px-4 md:px-6 relative z-10 pt-24">
      
      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-background border border-border rounded-xl w-full max-w-2xl shadow-xl overflow-hidden">
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-border bg-card">
              <h2 className="text-xl font-semibold tracking-tight">
                Yangi prompt
              </h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 rounded-md hover:bg-accent transition-colors text-muted-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreatePrompt} className="p-4 md:p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Sarlavha</label>
                  <Input name="title" required placeholder="Masalan: React Component yaratish" className="bg-card border-border rounded-lg" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Kategoriya</label>
                  <select name="category" required className="w-full h-9 px-3 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="Database">Database</option>
                    <option value="Code Review">Code Review</option>
                    <option value="Boshqa">Boshqa</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Prompt matni</label>
                <Textarea name="content" required rows={6} placeholder="AI'ga beriladigan aniq buyruq..." className="bg-card border-border rounded-lg text-sm resize-none" />
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
            <h1 className="text-3xl font-bold tracking-tight">Prompt Kutubxonasi</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Sinalgan va tayyor AI promptlar ro'yxati
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Qidirish..."
                className="pl-9 bg-background border-border rounded-lg h-9 text-sm"
              />
            </div>
            {user && (
              <Button onClick={() => setShowCreateModal(true)} variant="default" className="h-9 text-sm rounded-lg">
                Yangi Prompt
              </Button>
            )}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide relative z-10">
          <Badge variant="default" className="cursor-pointer px-3 py-1 rounded-full text-xs">Barchasi</Badge>
          <Badge variant="outline" className="cursor-pointer bg-background border-border text-foreground px-3 py-1 rounded-full text-xs hover:bg-accent">Frontend</Badge>
          <Badge variant="outline" className="cursor-pointer bg-background border-border text-foreground px-3 py-1 rounded-full text-xs hover:bg-accent">Backend</Badge>
          <Badge variant="outline" className="cursor-pointer bg-background border-border text-foreground px-3 py-1 rounded-full text-xs hover:bg-accent">Database</Badge>
          <Badge variant="outline" className="cursor-pointer bg-background border-border text-foreground px-3 py-1 rounded-full text-xs hover:bg-accent">Code Review</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {loading ? (
            <div className="col-span-full flex justify-center py-20">
              <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
            </div>
          ) : prompts.length === 0 ? (
            <div className="col-span-full text-center py-20 text-muted-foreground bg-background rounded-xl border border-border text-sm">
              Hozircha promptlar yo'q.
            </div>
          ) : prompts.map((prompt) => (
            <div key={prompt.id} className="flex flex-col h-full group border border-border bg-background hover:border-border/80 transition-colors rounded-xl overflow-hidden shadow-sm">
              <div className="p-5 pb-4">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="secondary" className="text-[10px] px-2 py-0.5 bg-accent border-none text-foreground font-medium">{prompt.category}</Badge>
                  <Link href={`/profile/${prompt.profiles?.username || 'devuz'}`}>
                    <span className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">
                      @{prompt.profiles?.username || 'developer'}
                    </span>
                  </Link>
                </div>
                <h3 className="text-lg font-semibold leading-tight text-foreground">{prompt.title}</h3>
              </div>
              <div className="flex-1 px-5 pt-0 pb-4">
                <div className="bg-card p-4 rounded-lg border border-border relative group/code hover:border-ring/30 transition-colors h-[130px] overflow-hidden">
                  <p className="text-xs font-mono text-muted-foreground leading-relaxed whitespace-pre-wrap">
                    {prompt.content}
                  </p>
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card to-transparent pointer-events-none" />
                  <Button 
                    onClick={() => handleCopy(prompt.content, prompt.id)}
                    size="icon" 
                    variant="outline" 
                    className="absolute top-2 right-2 h-7 w-7 opacity-0 group-hover/code:opacity-100 transition-opacity duration-200 bg-background border-border text-foreground"
                  >
                    {copiedId === prompt.id ? <span className="text-emerald-500 text-xs font-bold">✓</span> : <Copy className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
              <div className="px-5 py-4 flex justify-between items-center border-t border-border bg-card/30">
                <div className="flex gap-4 text-muted-foreground text-xs font-medium">
                  <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{prompt.votes_count || 0}</span>
                  </button>
                  <button className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <span>0</span>
                  </button>
                </div>
                <Button 
                  onClick={() => handleCopy(prompt.content, prompt.id)}
                  size="sm" 
                  variant="outline" 
                  className="h-8 bg-background hover:bg-accent border-border text-xs rounded-md"
                >
                  {copiedId === prompt.id ? "Nusxa olindi" : "Nusxa olish"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
