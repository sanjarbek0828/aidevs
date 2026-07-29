"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Briefcase, MapPin, DollarSign, Clock, Building, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Data
const JOBS = [
  {
    id: 1,
    title: "Senior Frontend Engineer (React/Next.js)",
    company: "Uzinfocom",
    location: "Toshkent, O'zbekiston (Gibrid)",
    salary: "$2,000 - $3,500",
    type: "To'liq stavka",
    postedAt: "2 kun oldin",
    tags: ["React", "Next.js", "TypeScript", "Tailwind"],
    description: "Bizning jamoaga katta miqyosdagi davlat va xususiy loyihalar uchun frontend arxitekturasini ishlab chiqish hamda rivojlantirish uchun yetakchi frontend muhandis kerak. Siz yangi texnologiyalarni (Next.js 14, React Server Components) qo'llagan holda yuqori unumdorlikka ega ilovalar yaratasiz.",
    requirements: [
      "Kamida 4 yillik frontend dasturlash tajribasi",
      "React va Next.js (App Router) da chuqur bilim",
      "TypeScript va zamonaviy JavaScript (ES6+)",
      "UI/UX dizayn tizimlari (Tailwind CSS, Shadcn UI) bilan ishlash ko'nikmasi",
      "Katta jamoa bilan ishlab, code review jarayonlarida faol qatnashish"
    ]
  },
  {
    id: 2,
    title: "AI Prompt Engineer / Data Analyst",
    company: "DataTech LLC",
    location: "Masofadan (Remote)",
    salary: "Kelishuv asosida",
    type: "Frilans / Shartnoma",
    postedAt: "5 soat oldin",
    tags: ["ChatGPT", "Python", "Data Analysis", "LLM"],
    description: "Kompaniyamizning sun'iy intellekt mahsulotlari uchun katta til modellari (LLM) bilan ishlash, ularni nozik sozlash (fine-tuning) va samarali promptlar yaratish vazifasi yuklatiladi. Siz turli qiyinlikdagi muammolarni hal qilish uchun AI vositalarini integratsiya qilasiz.",
    requirements: [
      "AI modellar (GPT-4, Claude 3, Llama) bilan kuchli amaliy tajriba",
      "Python, Pandas va ma'lumotlar tahlili ko'nikmalari",
      "Analitik fikrlash va muammolarga ijodiy yondashuv",
      "Ingliz tilida erkin o'qish va yozish"
    ]
  },
  {
    id: 3,
    title: "Backend Developer (Node.js/Supabase)",
    company: "Startup Uz",
    location: "Toshkent, O'zbekiston",
    salary: "$1,500 - $2,500",
    type: "To'liq stavka",
    postedAt: "1 hafta oldin",
    tags: ["Node.js", "Supabase", "PostgreSQL", "API"],
    description: "Yangi startap loyihamiz uchun ishonchli, xavfsiz va tezkor backend arxitekturasini qurish uchun tajribali backend dasturchi qidiryapmiz. Biz asosan zamonaviy BaaS (Supabase) va Node.js texnologiyalaridan foydalanamiz.",
    requirements: [
      "Node.js va Express/Nest.js da kamida 3 yillik tajriba",
      "PostgreSQL ma'lumotlar bazasini loyihalash va optimallashtirish",
      "Supabase (Auth, Storage, Edge Functions) haqida chuqur tushuncha",
      "RESTful API va GraphQL tajribasi"
    ]
  }
];

export default function JobsPage() {
  const [selectedJob, setSelectedJob] = useState(JOBS[0]);

  return (
    <div className="container py-8 max-w-7xl mx-auto px-4 md:px-6 relative z-10">
      <div className="flex flex-col space-y-6 mt-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Karyera va Ish o'rinlari</h1>
            <p className="text-muted-foreground mt-2 text-lg max-w-2xl">
              Dasturchilar va AI mutaxassislari uchun premium vakansiyalar. Platformamiz orqali orzuingizdagi ishni toping.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Vakansiya qidirish..."
                className="pl-9 bg-background/50 backdrop-blur-sm border-white/10"
              />
            </div>
            <Button variant="premium" className="shadow-lg shadow-primary/20">
              E'lon berish
            </Button>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <Badge variant="premium" className="cursor-pointer px-4 py-1.5 text-sm shadow-md shadow-primary/20">Barchasi</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-white/5 px-4 py-1.5 text-sm border-white/10 backdrop-blur-md transition-colors">To'liq stavka</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-white/5 px-4 py-1.5 text-sm border-white/10 backdrop-blur-md transition-colors">Masofadan (Remote)</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-white/5 px-4 py-1.5 text-sm border-white/10 backdrop-blur-md transition-colors">Frilans</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-white/5 px-4 py-1.5 text-sm border-white/10 backdrop-blur-md transition-colors">Stajirovka</Badge>
        </div>

        {/* Split Pane Layout for Modern Jobs View */}
        <div className="flex flex-col lg:flex-row gap-6 mt-4 h-auto lg:h-[700px]">
          
          {/* Left Pane - Job List */}
          <div className="w-full lg:w-5/12 flex flex-col gap-4 overflow-y-auto pr-1 lg:pr-3 scrollbar-hide pb-10 lg:pb-0">
            {JOBS.map((job) => (
              <Card 
                key={job.id} 
                onClick={() => setSelectedJob(job)}
                className={cn(
                  "cursor-pointer transition-all duration-300 relative overflow-hidden group",
                  selectedJob.id === job.id 
                    ? "border-primary/50 bg-primary/[0.03] shadow-[0_8px_30px_rgba(99,102,241,0.15)]" 
                    : "border-white/5 bg-black/20 hover:bg-white/[0.02] hover:border-white/20"
                )}
              >
                {selectedJob.id === job.id && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-xl"></div>
                )}
                
                <CardHeader className="pb-4 relative z-10 p-5">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <CardTitle className={cn(
                        "text-lg transition-colors",
                        selectedJob.id === job.id ? "text-primary" : "group-hover:text-foreground/90"
                      )}>
                        {job.title}
                      </CardTitle>
                      <div className="flex flex-col gap-2 mt-3 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5 font-medium text-foreground/90">
                          <Building className="h-4 w-4 text-primary/70" />
                          {job.company}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1.5 font-medium text-emerald-400">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardFooter className="pt-0 p-5 border-none flex flex-wrap gap-2 text-xs relative z-10 bg-transparent dark:bg-transparent">
                  {job.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-white/5 border border-white/10 px-2 py-1 rounded-md text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                  {job.tags.length > 3 && (
                    <span className="bg-white/5 border border-white/10 px-2 py-1 rounded-md text-muted-foreground">
                      +{job.tags.length - 3}
                    </span>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Right Pane - Job Details (Desktop Only / Conditional on Mobile) */}
          <div className="hidden lg:flex w-full lg:w-7/12 flex-col glass-card rounded-3xl border border-white/10 bg-black/40 backdrop-blur-2xl overflow-hidden shadow-2xl relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="flex-1 overflow-y-auto p-8 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-white mb-3">{selectedJob.title}</h2>
                  <div className="flex items-center gap-4 text-muted-foreground text-sm font-medium">
                    <span className="flex items-center gap-1.5 text-foreground">
                      <Building className="h-4 w-4 text-primary" />
                      {selectedJob.company}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" />
                      {selectedJob.location}
                    </span>
                  </div>
                </div>
                <Button variant="premium" size="lg" className="shadow-lg shadow-primary/20 px-8">
                  Topshirish <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-3 mb-8 pb-8 border-b border-white/10">
                <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-xl border border-emerald-500/20">
                  <DollarSign className="h-5 w-5" />
                  <span className="font-semibold">{selectedJob.salary}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 text-foreground px-4 py-2 rounded-xl border border-white/10">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{selectedJob.type}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 text-foreground px-4 py-2 rounded-xl border border-white/10">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{selectedJob.postedAt}</span>
                </div>
              </div>

              <div className="space-y-8">
                <section>
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-white">
                    <Zap className="h-5 w-5 text-amber-500" />
                    Vakansiya haqida
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-base">
                    {selectedJob.description}
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-bold flex items-center gap-2 mb-4 text-white">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Talablar
                  </h3>
                  <ul className="space-y-3">
                    {selectedJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-3 text-muted-foreground leading-relaxed">
                        <span className="bg-primary/20 text-primary p-1 rounded-full mt-0.5">
                          <CheckCircle2 className="h-3 w-3" />
                        </span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold mb-4 text-white">Texnologiyalar</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="px-3 py-1.5 text-sm bg-white/5 hover:bg-white/10 transition-colors border-white/10">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
