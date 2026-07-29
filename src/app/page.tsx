"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, Terminal, Code2, Users, ArrowRight, Rocket, Briefcase, MessageSquare, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Fake code typing effect for the Hero terminal
const TYPEWRITER_CODE = `// Initialize aidevs.uz
import { createDevCommunity } from '@aidevs/core';

const uzbekistanDevs = createDevCommunity({
  mission: "Empower local developers",
  tools: ["AI", "Code Review", "Networking"],
  features: {
    bentoGrid: true,
    realTimeChat: true,
    premiumUI: "enabled"
  }
});

await uzbekistanDevs.launch();
console.log("Welcome to the future of coding! 🚀");
`;

// Glowing Card Component for Bento Grid
function GlowCard({ children, className, glowColor = "rgba(99, 102, 241, 0.15)" }: { children: React.ReactNode, className?: string, glowColor?: string }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn("relative overflow-hidden glass-card rounded-3xl border border-white/10 bg-white/[0.02] p-8 transition-colors", className)}
    >
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}, transparent 40%)`
        }}
      />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
}

export default function Home() {
  const [codeText, setCodeText] = useState("");
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -100]);
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setCodeText(TYPEWRITER_CODE.slice(0, i));
      i++;
      if (i > TYPEWRITER_CODE.length) clearInterval(interval);
    }, 25);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col overflow-hidden relative selection:bg-primary/30 selection:text-primary-foreground">
      {/* Hyper-Modern Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1]">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[70%] bg-primary/20 rounded-[100%] blur-[140px]"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute top-[30%] right-[-20%] w-[50%] h-[80%] bg-indigo-500/15 rounded-full blur-[150px]"
        />
      </div>

      <div className="container px-4 md:px-6 relative z-10 pt-24 md:pt-32 pb-16">
        {/* HERO SECTION */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 relative">
            
            {/* Floating 3D-like icons */}
            <motion.div style={{ y: y1 }} className="absolute -top-12 -left-12 opacity-50 blur-[2px] hidden md:block">
              <Code2 className="h-24 w-24 text-primary/30" />
            </motion.div>
            <motion.div style={{ y: y2 }} className="absolute top-48 right-0 opacity-40 blur-[1px] hidden md:block">
              <Sparkles className="h-16 w-16 text-indigo-400/30" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center rounded-full bg-white/[0.03] border border-white/[0.08] px-4 py-1.5 text-sm font-medium backdrop-blur-md shadow-sm group hover:bg-white/[0.06] transition-colors"
            >
              <Sparkles className="mr-2 h-4 w-4 text-primary group-hover:animate-pulse" />
              <span className="text-muted-foreground">
                O'zbekistonning eng yirik AI hamjamiyati
              </span>
              <ChevronRight className="ml-2 h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-7xl max-w-3xl drop-shadow-2xl relative"
            >
              Kodingizni 
              <span className="relative ml-4 inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-indigo-400 to-cyan-400 blur-2xl opacity-40"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-300 to-cyan-400 animate-gradient-x">
                  Sun'iy Intellekt
                </span>
              </span> 
              <br/>bilan Tezlashtiring
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              Eng so'nggi texnologiyalar, tayyor promptlar, tezkor xatolarni izlash va kuchli dasturchilar hamjamiyati bitta platformada.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4"
            >
              <Link href="/register" className={cn(buttonVariants({ size: "lg", variant: "premium" }), "w-full sm:w-auto text-base h-14 px-8 shadow-[0_0_40px_rgba(99,102,241,0.4)] hover:shadow-[0_0_60px_rgba(99,102,241,0.6)] transition-all relative overflow-hidden group")}>
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                Hoziroq Boshlash <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/ai-tools" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full sm:w-auto text-base h-14 px-8 border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all")}>
                <Rocket className="mr-2 h-5 w-5 text-muted-foreground" /> AI Vositalar
              </Link>
            </motion.div>
          </div>

          {/* Hero Terminal with Floating Animation */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ y: useTransform(scrollY, [0, 500], [0, -50]) }}
            className="flex-1 w-full max-w-2xl lg:max-w-none relative perspective-1000"
          >
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="rounded-2xl border border-white/20 bg-[#0a0a0f]/90 backdrop-blur-3xl shadow-2xl overflow-hidden relative z-10"
            >
              <div className="flex items-center px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                </div>
                <div className="mx-auto flex items-center text-xs font-mono text-muted-foreground">
                  <Terminal className="h-3 w-3 mr-2 text-primary" /> core.ts
                </div>
              </div>
              <div className="p-6 overflow-x-auto min-h-[300px] text-sm md:text-base">
                <pre className="font-mono leading-loose">
                  <code className="text-gray-300">
                    <span className="text-indigo-400">import</span> {'{ createDevCommunity }'} <span className="text-indigo-400">from</span> <span className="text-emerald-400">'@aidevs/core'</span>;
                    <br/><br/>
                    <span className="text-indigo-400">const</span> uzbekistanDevs <span className="text-indigo-400">=</span> <span className="text-blue-400">createDevCommunity</span>({'{'}<br/>
                    &nbsp;&nbsp;mission: <span className="text-emerald-400">"Empower local developers"</span>,<br/>
                    &nbsp;&nbsp;tools: [<span className="text-emerald-400">"AI"</span>, <span className="text-emerald-400">"Code Review"</span>, <span className="text-emerald-400">"Networking"</span>],<br/>
                    &nbsp;&nbsp;features: {'{'}<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;bentoGrid: <span className="text-amber-400">true</span>,<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;realTimeChat: <span className="text-amber-400">true</span>,<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;premiumUI: <span className="text-emerald-400">"enabled"</span><br/>
                    &nbsp;&nbsp;{'}'}<br/>
                    {'}'});<br/><br/>
                    <span className="text-indigo-400">await</span> uzbekistanDevs.<span className="text-blue-400">launch</span>();<br/>
                    <span className="text-sky-400">console</span>.<span className="text-blue-400">log</span>(<span className="text-emerald-400">"Welcome to the future of coding! 🚀"</span>);
                    <motion.span 
                      animate={{ opacity: [1, 0] }} 
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-2 h-4 bg-primary ml-1 align-middle"
                    />
                  </code>
                </pre>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* LOGOS MARQUEE */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="mt-24 mb-16 border-y border-white/5 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent py-10 flex flex-col items-center overflow-hidden"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-[0.2em] mb-8">Zamonaviy Texnologiyalar Integratsiyasi</p>
          <div className="flex w-full overflow-hidden mask-image-linear-x">
            <div className="flex animate-marquee whitespace-nowrap gap-20 opacity-70 hover:opacity-100 transition-opacity duration-500">
              {[...Array(3)].map((_, idx) => (
                <div key={idx} className="flex gap-20 min-w-full justify-around items-center">
                  <div className="flex items-center gap-2 text-2xl font-bold font-sans"><span className="text-primary">Next</span>.js</div>
                  <div className="flex items-center gap-2 text-2xl font-bold font-sans text-[#61DAFB]">React</div>
                  <div className="flex items-center gap-2 text-2xl font-bold font-sans text-[#3ECF8E]">Supabase</div>
                  <div className="flex items-center gap-2 text-2xl font-bold font-sans text-[#38B2AC]">Tailwind</div>
                  <div className="flex items-center gap-2 text-2xl font-bold font-sans text-[#3776AB]">Python</div>
                  <div className="flex items-center gap-2 text-2xl font-bold font-sans text-white">GitHub</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* HYPER-MODERN BENTO GRID */}
        <div className="py-24 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="text-center mb-16 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
            >
              Barcha Kerakli Vositalar Bir Joyda
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground max-w-2xl mx-auto text-lg md:text-xl"
            >
              Loyihalaringizni tezkor rivojlantirish uchun biz eng zamonaviy instrumentlarni taqdim etamiz.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[320px] max-w-6xl mx-auto">
            {/* Large Card 1 */}
            <GlowCard className="md:col-span-2 group hover:border-primary/50" glowColor="rgba(99, 102, 241, 0.15)">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/30 to-indigo-500/10 flex items-center justify-center mb-6 border border-primary/20 group-hover:scale-110 transition-transform duration-500">
                    <Terminal className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-3 group-hover:text-primary transition-colors">AI Prompt Kutubxonasi</h3>
                  <p className="text-muted-foreground max-w-md text-lg">Kodingizni avtomatlashtirish, test yozish va xatolarni topish uchun tayyor va sinalgan promplarni ishlating.</p>
                </div>
                <div className="w-full h-32 mt-6 rounded-2xl bg-black/80 border border-white/10 shadow-inner flex items-center p-5 relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
                  <code className="text-sm md:text-base text-emerald-400 font-mono">
                    <span className="text-muted-foreground">{"// Tayyor prompt"}</span><br/>
                    "Ushbu React komponentini Server Component'ga o'g'iring va TypeScript type'larini yozib bering..."
                  </code>
                </div>
              </div>
            </GlowCard>

            {/* Small Card 1 */}
            <GlowCard className="group hover:border-amber-500/50" glowColor="rgba(245, 158, 11, 0.15)">
              <div className="flex flex-col h-full">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500/30 to-orange-500/10 flex items-center justify-center mb-6 border border-amber-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Users className="h-7 w-7 text-amber-500" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-amber-500 transition-colors">Faol Hamjamiyat</h3>
                <p className="text-muted-foreground">Minglab o'zbek dasturchilari bilan real vaqtda muloqot va muhokamalar.</p>
                <div className="mt-auto flex -space-x-4 items-center">
                  <div className="w-12 h-12 rounded-full border-2 border-background bg-gradient-to-br from-blue-400 to-blue-600 shadow-lg"></div>
                  <div className="w-12 h-12 rounded-full border-2 border-background bg-gradient-to-br from-green-400 to-green-600 shadow-lg"></div>
                  <div className="w-12 h-12 rounded-full border-2 border-background bg-gradient-to-br from-purple-400 to-purple-600 shadow-lg"></div>
                  <div className="w-12 h-12 rounded-full border-2 border-background bg-white/5 backdrop-blur-md flex items-center justify-center text-sm font-bold shadow-lg">+1K</div>
                </div>
              </div>
            </GlowCard>

            {/* Small Card 2 */}
            <GlowCard className="group hover:border-cyan-500/50" glowColor="rgba(6, 182, 212, 0.15)">
              <div className="flex flex-col h-full relative">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-500/10 flex items-center justify-center mb-6 border border-cyan-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Code2 className="h-7 w-7 text-cyan-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">Kod Debug Markazi</h3>
                <p className="text-muted-foreground">Xatolik kodingizni yuklang va jamiyat yordamida tezkor yechim toping.</p>
                <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Code2 className="h-48 w-48 text-cyan-400" />
                </div>
              </div>
            </GlowCard>

            {/* Large Card 2 */}
            <GlowCard className="md:col-span-2 group hover:border-indigo-500/50 flex flex-col md:flex-row items-center gap-8" glowColor="rgba(99, 102, 241, 0.15)">
              <div className="flex-1">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-purple-500/10 flex items-center justify-center mb-6 border border-indigo-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Briefcase className="h-7 w-7 text-indigo-400" />
                </div>
                <h3 className="text-3xl font-bold mb-3 group-hover:text-indigo-400 transition-colors">Karyera va Vakansiyalar</h3>
                <p className="text-muted-foreground mb-8 text-lg">Tech sohasidagi eng zo'r ish o'rinlari, remote vakansiyalar va frilans loyihalar. Profilingiz orqali to'g'ridan-to'g'ri topshiring.</p>
                <Link href="/jobs" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 font-bold transition-colors group/link text-lg">
                  Vakansiyalarni ko'rish <ArrowRight className="ml-2 h-5 w-5 group-hover/link:translate-x-2 transition-transform" />
                </Link>
              </div>
              <div className="w-full md:w-1/2 h-full rounded-2xl bg-gradient-to-br from-indigo-500/10 to-transparent border border-indigo-500/20 p-5 flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="w-full h-14 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex items-center px-4 gap-4 shadow-lg transform -rotate-1 hover:rotate-0 transition-transform">
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/30 border border-indigo-500/50 flex items-center justify-center text-indigo-200 text-xs font-bold">FE</div>
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 w-1/2 bg-white/30 rounded-full"></div>
                    <div className="h-2 w-1/4 bg-white/10 rounded-full"></div>
                  </div>
                </div>
                <div className="w-full h-14 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 flex items-center px-4 gap-4 shadow-lg transform rotate-2 hover:rotate-0 transition-transform">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/30 border border-purple-500/50 flex items-center justify-center text-purple-200 text-xs font-bold">AI</div>
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 w-2/3 bg-white/30 rounded-full"></div>
                    <div className="h-2 w-1/3 bg-white/10 rounded-full"></div>
                  </div>
                </div>
              </div>
            </GlowCard>
          </div>
        </div>

        {/* FEED SECTION PREVIEW */}
        <div className="py-24 relative">
          <div className="flex flex-col items-center mb-16 relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-center"
            >
              Lentada Nimalar Bo'lyapti?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-center max-w-2xl text-lg"
            >
              Hamjamiyatimiz a'zolari o'z yutuqlari va muammolari bilan bo'lishmoqda.
            </motion.p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 relative">
            <div className="absolute -inset-x-20 top-1/2 -translate-y-1/2 h-[300px] bg-primary/10 rounded-[100%] blur-[120px] pointer-events-none" />
            
            <GlowCard className="p-6 md:p-8 hover:border-primary/40 shadow-2xl" glowColor="rgba(99, 102, 241, 0.1)">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/40 to-indigo-600 flex items-center justify-center text-white font-bold border-2 border-primary/30 shadow-lg text-xl">
                    S
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-lg cursor-pointer hover:underline hover:text-primary transition-colors">
                      @Sanjarbek_Dev
                    </h4>
                    <p className="text-sm text-muted-foreground">30 daqiqa oldin</p>
                  </div>
                </div>
              </div>
              <p className="text-foreground/90 leading-relaxed mb-6 text-lg">
                Framer Motion yordamida saytning bosh sahifasiga dahshatli effektlar qo'shdim! Next.js va Tailwind kombinatsiyasida chindan ham mo'jizalar yaratsa bo'ladi. ✨
              </p>
              <div className="flex items-center gap-8 pt-6 border-t border-white/10 text-muted-foreground">
                <button className="flex items-center gap-2 hover:text-primary transition-colors group/btn">
                  <div className="p-2.5 rounded-full group-hover/btn:bg-primary/20 transition-colors bg-white/5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                  </div>
                  <span className="font-bold">245</span>
                </button>
                <button className="flex items-center gap-2 hover:text-blue-400 transition-colors group/btn">
                  <div className="p-2.5 rounded-full group-hover/btn:bg-blue-400/20 transition-colors bg-white/5">
                    <MessageSquare className="h-5 w-5" />
                  </div>
                  <span className="font-bold">42</span>
                </button>
              </div>
            </GlowCard>
            
            <div className="flex justify-center mt-10">
              <Link href="/community" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full px-10 py-7 text-lg font-bold border-white/20 bg-white/5 hover:bg-white/10 shadow-lg hover:shadow-primary/30 transition-all")}>
                Barcha postlarni ko'rish <ArrowRight className="ml-3 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="mt-20 mb-8 relative rounded-[3rem] overflow-hidden border border-white/20 glass-card bg-[#050508] p-12 md:p-24 text-center flex flex-col items-center group shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-indigo-500/20 to-cyan-500/30 opacity-60 group-hover:scale-110 transition-transform duration-[2000ms]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-8 text-white drop-shadow-2xl">
              Tayyormisiz?
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
              O'zbekistonning eng yirik dasturchilar tarmog'iga qo'shiling. Bilim oling, ulashing va karyerangizni yangi cho'qqilarga olib chiqing.
            </p>
            <Link href="/register" className={cn(buttonVariants({ size: "lg", variant: "premium" }), "rounded-full text-xl h-20 px-16 shadow-[0_0_80px_rgba(99,102,241,0.6)] hover:shadow-[0_0_120px_rgba(99,102,241,0.8)] transition-all scale-100 hover:scale-105 border border-white/20")}>
              Bepul Ro'yxatdan O'tish
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
