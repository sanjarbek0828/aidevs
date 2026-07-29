"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Code2, Users, Briefcase, Database, Library } from "lucide-react";
import { FeedPreview } from "@/components/home/feed-preview";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden relative selection:bg-primary/30">
      
      {/* Background glow effects */}
      <div className="absolute top-0 -left-40 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] opacity-40 pointer-events-none" />

      {/* HERO SECTION - Premium, stunning, deep contrast */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 z-10">
        <div className="absolute inset-0 bg-dot-pattern opacity-50 pointer-events-none -z-10" />
        
        <div className="container max-w-5xl mx-auto text-center flex flex-col items-center">
          
          <div className="inline-flex items-center rounded-full border border-border/50 bg-background/50 backdrop-blur-xl px-4 py-1.5 text-sm font-medium text-muted-foreground mb-8 shadow-sm hover:border-primary/30 transition-colors cursor-default premium-border">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 shadow-[0_0_8px_rgba(245,158,11,0.8)] animate-pulse" />
            <span className="text-foreground/80">aidevs.uz — yangi avlod platformasi</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-8 max-w-5xl leading-[1.1]">
            O'zbekiston dasturchilari uchun <br className="hidden md:block"/> 
            <span className="text-gradient-primary drop-shadow-sm">yagona ekotizim.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-12 leading-relaxed font-medium">
            Zamonaviy AI vositalari, tayyor promptlar, tezkor xatolarni izlash va kuchli jamoa bilan kodingizni keyingi bosqichga olib chiqing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link href="/register" className={cn(buttonVariants({ size: "lg", variant: "premium" }), "rounded-full font-medium h-14 px-10 text-base")}>
              Hoziroq boshlash <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/ai-tools" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "rounded-full font-medium h-14 px-10 text-base border-border/50 bg-background/30 backdrop-blur-md hover:bg-accent/50")}>
              <Library className="mr-2 h-5 w-5" /> AI vositalar
            </Link>
          </div>
        </div>
      </section>
      
      {/* LOGOS / TECH STACK - Premium row */}
      <section className="border-y border-border/40 bg-background/40 backdrop-blur-md py-10 flex flex-col items-center overflow-hidden relative z-10">
        <p className="text-[12px] font-bold text-muted-foreground uppercase tracking-[0.3em] mb-10 opacity-70">Texnologiyalar</p>
        <div className="flex w-full overflow-hidden mask-image-linear-x max-w-5xl mx-auto">
          <div className="flex animate-marquee whitespace-nowrap gap-16 md:gap-24 opacity-50 hover:opacity-100 transition-opacity duration-700">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="flex gap-16 md:gap-24 min-w-full justify-around items-center">
                <div className="text-2xl font-bold tracking-tight text-foreground/90">Next.js</div>
                <div className="text-2xl font-bold tracking-tight text-foreground/80">React</div>
                <div className="text-2xl font-bold tracking-tight text-foreground/70">Supabase</div>
                <div className="text-2xl font-bold tracking-tight text-foreground/60">Tailwind</div>
                <div className="text-2xl font-bold tracking-tight text-foreground/50">TypeScript</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES - Glassy Glowing Cards */}
      <section className="py-32 px-4 container max-w-6xl mx-auto relative z-10">
        <div className="mb-20 text-center flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Barcha kerakli vositalar
          </h2>
          <p className="text-muted-foreground max-w-2xl text-lg md:text-xl">
            Loyihalaringizni tezkor rivojlantirish uchun biz eng zamonaviy instrumentlarni taqdim etamiz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-fr">
          
          <div className="glass-card p-8 rounded-3xl premium-border flex flex-col group hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-card/90 transition-all duration-500">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center mb-8 border border-amber-500/20 group-hover:scale-110 transition-transform duration-500">
              <Database className="h-6 w-6 text-amber-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">AI Promptlar</h3>
            <p className="text-muted-foreground text-base leading-relaxed mb-8 flex-1">Kodingizni avtomatlashtirish, test yozish va xatolarni topish uchun tayyor va sinalgan promptlarni ishlating.</p>
            <div className="pt-6 border-t border-border/50">
              <Link href="/prompts" className="text-sm font-semibold text-foreground hover:text-primary transition-colors flex items-center group-hover:translate-x-1 duration-300">
                Kutubxonani ko'rish <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl premium-border flex flex-col group hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-card/90 transition-all duration-500">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center mb-8 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500">
              <Code2 className="h-6 w-6 text-cyan-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Debug Markazi</h3>
            <p className="text-muted-foreground text-base leading-relaxed mb-8 flex-1">Xatolik kodingizni yuklang va jamiyat yordamida tezkor yechim toping.</p>
            <div className="pt-6 border-t border-border/50">
              <Link href="/debug" className="text-sm font-semibold text-foreground hover:text-primary transition-colors flex items-center group-hover:translate-x-1 duration-300">
                Xatoliklarni ko'rish <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="glass-card p-8 rounded-3xl premium-border flex flex-col group hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:bg-card/90 transition-all duration-500">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-8 border border-emerald-500/20 group-hover:scale-110 transition-transform duration-500">
              <Briefcase className="h-6 w-6 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold mb-4 tracking-tight">Vakansiyalar</h3>
            <p className="text-muted-foreground text-base leading-relaxed mb-8 flex-1">Tech sohasidagi eng zo'r ish o'rinlari, remote vakansiyalar va frilans loyihalar.</p>
            <div className="pt-6 border-t border-border/50">
              <Link href="/jobs" className="text-sm font-semibold text-foreground hover:text-primary transition-colors flex items-center group-hover:translate-x-1 duration-300">
                Ish topish <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* FEED SECTION PREVIEW */}
      <section className="py-32 bg-background/40 backdrop-blur-sm border-y border-border/40 px-4 relative z-10">
        <div className="container max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-bold tracking-tight mb-3">
                Jamiyat lentasi
              </h2>
              <p className="text-muted-foreground text-lg">So'nggi muhokamalar va yangiliklar.</p>
            </div>
            <Link href="/community" className={cn(buttonVariants({ variant: "outline" }), "rounded-full h-12 px-6 font-medium bg-background/50 backdrop-blur-md")}>
              Barcha postlar <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <FeedPreview />
        </div>
      </section>

      {/* CTA SECTION - Premium glow */}
      <section className="py-40 px-4 container max-w-4xl mx-auto text-center relative z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 rounded-full blur-[100px] pointer-events-none -z-10" />
        
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Tayyormisiz?
        </h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium">
          Hozir ro'yxatdan o'ting va O'zbekistonning eng katta dasturchilar ekotizimiga qo'shiling.
        </p>
        <Link href="/register" className={cn(buttonVariants({ size: "lg", variant: "premium" }), "rounded-full h-16 px-12 text-lg font-bold glow-shadow-lg")}>
          Tizimga kirish
        </Link>
      </section>

    </div>
  );
}
