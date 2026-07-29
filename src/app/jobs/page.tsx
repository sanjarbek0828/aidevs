"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Briefcase, MapPin, DollarSign, Clock, Building, CheckCircle2, ChevronRight, Zap, Plus, X, Loader2, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";
import { Textarea } from "@/components/ui/textarea";

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isMobileDetailOpen, setIsMobileDetailOpen] = useState(false);
  
  const supabase = createClient();

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      const { data } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setJobs(data);
        if (data.length > 0) setSelectedJob(data[0]);
      }
      setLoading(false);
    }
    
    // Realtime subscription for jobs (synchronous setup)
    const subscription = supabase
      .channel('public:jobs:channel')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'jobs' },
        (payload) => {
          setJobs(prev => [payload.new, ...prev]);
        }
      )
      .subscribe();

    loadData();

    return () => {
      supabase.removeChannel(subscription);
    }
  }, [supabase]);

  const handleCreateJob = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    
    const newJob = {
      title: formData.get("title") as string,
      company: formData.get("company") as string,
      location: formData.get("location") as string,
      type: formData.get("type") as string,
      salary: formData.get("salary") as string,
      description: formData.get("description") as string,
      requirements: (formData.get("requirements") as string).split('\n').filter(r => r.trim() !== ''),
      tags: (formData.get("tags") as string).split(',').map(t => t.trim()).filter(t => t !== ''),
      posted_by: user.id
    };

    const { data, error } = await supabase
      .from("jobs")
      .insert([newJob])
      .select()
      .single();

    if (!error && data) {
      setSelectedJob(data);
      setShowCreateModal(false);
    }
    
    setIsSubmitting(false);
  };

  const getRelativeTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return "hozirgina";
      if (diffMins < 60) return `${diffMins} daqiqa oldin`;
      if (diffHours < 24) return `${diffHours} soat oldin`;
      if (diffDays === 1) return "kecha";
      if (diffDays < 30) return `${diffDays} kun oldin`;
      
      return date.toLocaleDateString('uz-UZ');
    } catch (e) {
      return dateString;
    }
  };

  const JobDetailContent = ({ job, isMobile = false }: { job: any, isMobile?: boolean }) => {
    if (!job) return null;
    
    return (
      <div className="flex-1 overflow-y-auto p-6 md:p-10 bg-background text-foreground">
        {isMobile && (
          <button 
            onClick={() => setIsMobileDetailOpen(false)}
            className="flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <ArrowLeft className="h-4 w-4" /> Orqaga
          </button>
        )}
        
        <div className="flex flex-col md:flex-row md:justify-between items-start mb-8 gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4">{job.title}</h2>
            <div className="flex flex-wrap items-center gap-5 text-sm font-medium">
              <span className="flex items-center gap-1.5 text-foreground">
                <Building className="h-4 w-4 text-muted-foreground" />
                {job.company}
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {job.location}
              </span>
            </div>
          </div>
          <Button variant="default" className="w-full md:w-auto font-medium">
            Topshirish
          </Button>
        </div>

        <div className="flex flex-wrap gap-4 mb-10 pb-10 border-b border-border">
          {job.salary && (
            <div className="flex items-center gap-2 text-foreground text-sm font-medium">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span>{job.salary}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-foreground text-sm font-medium">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span>{job.type}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Clock className="h-4 w-4" />
            <span>{getRelativeTime(job.created_at)}</span>
          </div>
        </div>

        <div className="space-y-10">
          <section>
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Vakansiya haqida
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base whitespace-pre-wrap">
              {job.description}
            </p>
          </section>

          {job.requirements && job.requirements.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Talablar
              </h3>
              <ul className="space-y-3">
                {job.requirements.map((req: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed text-sm md:text-base">
                    <span className="text-foreground mt-0.5 shrink-0">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    {req}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {job.tags && job.tags.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-4 text-foreground">Texnologiyalar</h3>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="px-3 py-1 text-xs font-medium bg-accent text-foreground">
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="container py-8 max-w-7xl mx-auto px-4 md:px-6 relative z-10 pt-24">
      
      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-background border border-border rounded-xl w-full max-w-2xl shadow-xl overflow-hidden">
            <div className="flex justify-between items-center p-4 md:p-6 border-b border-border bg-card">
              <h2 className="text-xl font-semibold tracking-tight">Yangi vakansiya</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 rounded-md hover:bg-accent transition-colors text-muted-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <form onSubmit={handleCreateJob} className="p-4 md:p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Lavozim (Title)</label>
                  <Input name="title" required placeholder="Senior React Developer" className="bg-card border-border rounded-lg" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Kompaniya nomi</label>
                  <Input name="company" required placeholder="Kompaniya nomi" className="bg-card border-border rounded-lg" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Manzil</label>
                  <Input name="location" required placeholder="Toshkent yoki Remote" className="bg-card border-border rounded-lg" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Ish turi</label>
                  <select name="type" required className="w-full h-9 px-3 rounded-lg bg-card border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring">
                    <option value="To'liq stavka">To'liq stavka</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Remote">Remote</option>
                    <option value="Frilans">Frilans</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-foreground">Maosh</label>
                  <Input name="salary" placeholder="$1,000 - $2,000" className="bg-card border-border rounded-lg" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Texnologiyalar (vergul bilan)</label>
                <Input name="tags" placeholder="React, Node.js" className="bg-card border-border rounded-lg" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Batafsil ma'lumot</label>
                <Textarea name="description" required rows={4} className="bg-card border-border rounded-lg resize-none" />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-foreground">Talablar (har biri yangi qatorda)</label>
                <Textarea name="requirements" required rows={4} className="bg-card border-border rounded-lg resize-none" />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)} className="rounded-lg">Bekor</Button>
                <Button type="submit" variant="default" disabled={isSubmitting} className="rounded-lg">
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Plus className="mr-2 h-4 w-4" />} E'lon qilish
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MOBILE JOB DETAIL FULL-SCREEN MODAL */}
      {isMobileDetailOpen && selectedJob && (
        <div className="md:hidden fixed inset-0 z-50 bg-background flex flex-col">
          <JobDetailContent job={selectedJob} isMobile={true} />
        </div>
      )}

      <div className="flex flex-col space-y-8 mt-4 md:mt-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Karyera</h1>
            <p className="text-muted-foreground mt-2 text-sm">
              Sohadagi eng yangi ish o'rinlari va loyihalar
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Vakansiya qidirish..."
                className="pl-9 bg-background border-border rounded-lg h-9"
              />
            </div>
            {user && (
              <Button onClick={() => setShowCreateModal(true)} variant="default" className="h-9 text-sm rounded-lg">
                E'lon berish
              </Button>
            )}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Badge variant="default" className="cursor-pointer px-3 py-1 rounded-full text-xs">Barchasi</Badge>
          <Badge variant="outline" className="cursor-pointer bg-background border-border text-foreground px-3 py-1 rounded-full text-xs hover:bg-accent">To'liq stavka</Badge>
          <Badge variant="outline" className="cursor-pointer bg-background border-border text-foreground px-3 py-1 rounded-full text-xs hover:bg-accent">Remote</Badge>
          <Badge variant="outline" className="cursor-pointer bg-background border-border text-foreground px-3 py-1 rounded-full text-xs hover:bg-accent">Frilans</Badge>
        </div>

        {/* Split Pane Layout */}
        <div className="flex flex-col lg:flex-row gap-6 mt-2 h-auto lg:h-[700px]">
          
          {/* Left Pane - Job List */}
          <div className="w-full lg:w-[400px] flex flex-col gap-3 overflow-y-auto pr-1 lg:pr-2 scrollbar-hide pb-20 lg:pb-0">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-5 w-5 text-muted-foreground animate-spin" />
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-20 text-muted-foreground bg-background rounded-xl border border-border text-sm">
                Hozircha bo'sh ish o'rinlari yo'q
              </div>
            ) : jobs.map((job) => (
              <div 
                key={job.id} 
                onClick={() => {
                  setSelectedJob(job);
                  if (window.innerWidth < 1024) {
                    setIsMobileDetailOpen(true);
                  }
                }}
                className={cn(
                  "cursor-pointer transition-colors p-4 rounded-xl border",
                  selectedJob?.id === job.id 
                    ? "border-foreground bg-accent/50" 
                    : "border-border bg-background hover:bg-accent/30"
                )}
              >
                <div className="flex justify-between items-start gap-4 mb-3">
                  <div>
                    <h3 className={cn(
                      "font-semibold text-base transition-colors line-clamp-1",
                      selectedJob?.id === job.id ? "text-foreground" : "text-foreground"
                    )}>
                      {job.title}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-1.5 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{job.company}</span>
                      <span>·</span>
                      <span>{job.location}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {job.tags && Array.isArray(job.tags) && job.tags.slice(0, 3).map((tag: string) => (
                    <span key={tag} className="bg-accent text-foreground px-2 py-0.5 rounded text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                  {job.tags && Array.isArray(job.tags) && job.tags.length > 3 && (
                    <span className="text-muted-foreground px-1 py-0.5 text-xs font-medium">
                      +{job.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right Pane - Job Details (Desktop Only) */}
          <div className="hidden lg:flex w-full lg:flex-1 flex-col rounded-xl border border-border bg-background overflow-hidden">
            {selectedJob ? (
              <JobDetailContent job={selectedJob} />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground text-sm">
                <Briefcase className="h-10 w-10 opacity-20 mb-4" />
                Vakansiyani tanlang
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
