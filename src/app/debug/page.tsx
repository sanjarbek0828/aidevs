  import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Bug, CheckCircle2, MessageSquare, ArrowBigUp } from "lucide-react";

// Mock Data
const ISSUES = [
  {
    id: 1,
    title: "Next.js 14 App Router da Supabase Auth cookie muammosi",
    description: "Middleware.ts orqali cookie o'rnatishda muammo bo'lyapti. user ma'lumotlari null qaytyapti. Iltimos yordam bering.",
    language: "TypeScript",
    status: "open",
    votes: 12,
    answers: 3,
    author: "@junior_dev",
  },
  {
    id: 2,
    title: "Tailwind CSS grid layout responsivligi ishlamayapti",
    description: "md:grid-cols-3 berganman lekin mobil qurilmada ham 3 ta column bo'lib qolyapti. Qayerda xato qildim?",
    language: "CSS",
    status: "solved",
    votes: 45,
    answers: 1,
    author: "@css_master",
  }
];

export default function DebugPage() {
  return (
    <div className="container py-8 max-w-5xl mx-auto px-4 md:px-6 relative z-10">
      <div className="flex flex-col space-y-8 mt-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Kod Debug Markazi</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Xatoliklaringizni yuklang va AI yordamida yoki hamjamiyat a'zolari bilan yechim toping.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Muammoni qidirish..."
                className="pl-9 bg-background/50 backdrop-blur-sm"
              />
            </div>
            <Button variant="premium">
              <Bug className="mr-2 h-4 w-4" />
              Yangi Muammo
            </Button>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide relative z-10">
          <Badge variant="premium" className="cursor-pointer px-4 py-1.5 text-sm">Barchasi</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary px-4 py-1.5 text-sm border-emerald-500/30 text-emerald-500">Hal qilingan</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary px-4 py-1.5 text-sm border-amber-500/30 text-amber-500">Ochiq</Badge>
        </div>

        <div className="flex flex-col gap-5 relative z-10">
          {ISSUES.map((issue) => (
            <Card key={issue.id} className="flex flex-col sm:flex-row group relative overflow-hidden transition-all duration-500 hover:shadow-[0_8px_30px_rgba(99,102,241,0.1)] border-white/5 bg-white/[0.01] hover:bg-white/[0.02]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="flex sm:flex-col items-center sm:justify-center p-4 sm:p-6 sm:w-28 border-b sm:border-b-0 sm:border-r border-border/50 bg-background/20 backdrop-blur-sm gap-4 sm:gap-3 relative z-10">
                <div className="flex flex-col items-center group/vote">
                  <ArrowBigUp className="h-7 w-7 text-muted-foreground group-hover/vote:text-primary transition-colors cursor-pointer" />
                  <span className="font-bold text-xl mt-1">{issue.votes}</span>
                </div>
                <div className="flex flex-col items-center text-muted-foreground">
                  <MessageSquare className="h-4 w-4 mb-1.5" />
                  <span className="text-xs font-medium">{issue.answers} javob</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col relative z-10">
                <CardHeader className="pb-2 pt-5 sm:pt-6">
                  <div className="flex justify-between items-start mb-2 gap-4">
                    <CardTitle className="text-xl leading-tight hover:text-primary cursor-pointer transition-colors">
                      {issue.title}
                    </CardTitle>
                    {issue.status === 'solved' ? (
                      <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 whitespace-nowrap">
                        <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" /> Hal qilingan
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20 whitespace-nowrap">
                        Ochiq
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="line-clamp-2 text-foreground/80 mt-2 text-base leading-relaxed">
                    {issue.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="pt-3 pb-5 sm:pb-6 mt-auto border-none flex justify-between items-center bg-transparent dark:bg-transparent">
                  <Badge variant="secondary" className="text-xs font-mono px-2.5 py-1">{issue.language}</Badge>
                  <span className="text-sm font-medium text-muted-foreground">Ochgan: <span className="text-foreground/80">{issue.author}</span></span>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
