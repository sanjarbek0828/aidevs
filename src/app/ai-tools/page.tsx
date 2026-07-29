"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink, Star, Plus, X, Loader2, Sparkles } from "lucide-react";
import { TrendChart } from "@/components/shared/trend-chart";
import { createClient } from "@/lib/supabase/client";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export default function AIToolsPage() {
  const [tools, setTools] = useState<any[]>([]);
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
        .from("ai_tools")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setTools(data);
      }
      setLoading(false);
    }
    loadData();
  }, [supabase]);

  const handleCreateTool = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    const newTool = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      url: formData.get("url") as string,
      category: formData.get("category") as string,
      submitted_by: user.id
    };

    const { data, error } = await supabase
      .from("ai_tools")
      .insert([newTool])
      .select()
      .single();

    if (!error && data) {
      const toolWithUIStats = { ...data, rating: 5.0, hasFreeTrial: true, tags: ["Yangi"] };
      setTools([toolWithUIStats, ...tools]);
      setShowCreateModal(false);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto px-4 md:px-6 relative z-10 pt-24">
      
      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-background border border-border rounded-xl w-full max-w-lg shadow-xl overflow-hidden">
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-border bg-card">
              <h2 className="text-xl font-semibold tracking-tight">
                Vosita qo'shish
              </h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 rounded-md hover:bg-accent transition-colors text-muted-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreateTool} className="p-4 md:p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Vosita nomi</label>
                <Input name="name" required placeholder="Masalan: Cursor" className="bg-card border-border rounded-lg" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Veb-sayt URL</label>
                <Input name="url" required type="url" placeholder="https://cursor.sh" className="bg-card border-border rounded-lg" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Kategoriya</label>
                <select name="category" required className="w-full h-9 px-3 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                  <option value="IDE">IDE</option>
                  <option value="IDE Extension">IDE Extension</option>
                  <option value="UI Design">UI Design</option>
                  <option value="LLM">LLM</option>
                  <option value="Code Review">Code Review</option>
                  <option value="Boshqa">Boshqa</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Qisqacha ta'rif</label>
                <Textarea name="description" required rows={3} placeholder="Ta'rif..." className="bg-card border-border rounded-lg resize-none" />
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
            <h1 className="text-3xl font-bold tracking-tight">AI Vositalar</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Eng yaxshi sun'iy intellekt vositalari kolleksiyasi
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
                Qo'shish
              </Button>
            )}
          </div>
        </div>
        
        <div className="w-full relative z-10 border border-border rounded-xl bg-background p-5 overflow-hidden">
          <h3 className="font-semibold text-sm mb-4 text-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-muted-foreground" /> 
            Trenddagi vositalar
          </h3>
          <TrendChart />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide relative z-10">
          <Badge variant="default" className="cursor-pointer px-3 py-1 rounded-full text-xs">Barchasi</Badge>
          <Badge variant="outline" className="cursor-pointer bg-background border-border text-foreground px-3 py-1 rounded-full text-xs hover:bg-accent">IDE</Badge>
          <Badge variant="outline" className="cursor-pointer bg-background border-border text-foreground px-3 py-1 rounded-full text-xs hover:bg-accent">LLM</Badge>
          <Badge variant="outline" className="cursor-pointer bg-background border-border text-foreground px-3 py-1 rounded-full text-xs hover:bg-accent">UI Design</Badge>
          <Badge variant="outline" className="cursor-pointer bg-background border-border text-foreground px-3 py-1 rounded-full text-xs hover:bg-accent">Code Review</Badge>
        </div>

        {/* Flat List (Linear style instead of heavy cards) */}
        <div className="flex flex-col border border-border rounded-xl overflow-hidden bg-background">
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
            </div>
          ) : tools.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground text-sm">
              Hozircha vositalar yo'q.
            </div>
          ) : tools.map((tool, index) => (
            <div 
              key={tool.id} 
              className={cn(
                "flex flex-col md:flex-row items-start md:items-center justify-between p-4 gap-4 transition-colors hover:bg-accent/30",
                index !== tools.length - 1 ? "border-b border-border" : ""
              )}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-base font-semibold text-foreground truncate">{tool.name}</h3>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs font-medium">
                    <Star className="h-3 w-3" />
                    <span>{tool.rating || "5.0"}</span>
                  </div>
                  <Badge variant="secondary" className="text-[10px] px-2 py-0 bg-accent text-foreground">
                    {tool.category}
                  </Badge>
                  {(tool.hasFreeTrial || tool.id % 2 === 0) && (
                    <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">
                      Free Trial
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {tool.description}
                </p>
              </div>
              
              <div className="shrink-0 flex items-center w-full md:w-auto">
                <Link href={tool.url || "#"} target="_blank" className="w-full md:w-auto">
                  <Button variant="outline" size="sm" className="w-full h-8 text-xs rounded bg-card hover:bg-accent border-border text-foreground">
                    Tashrif
                    <ExternalLink className="ml-1.5 h-3 w-3 text-muted-foreground" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
