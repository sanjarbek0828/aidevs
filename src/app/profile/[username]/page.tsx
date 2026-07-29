import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapPin, Link as LinkIcon, Trophy, Flame, Sparkles, Edit, Calendar } from "lucide-react";
import { Icons } from "@/components/shared/icons";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  // In a real app, you would fetch user data based on params.username
  const resolvedParams = await params;
  const username = resolvedParams.username || "devuz";
  
  return (
    <div className="container py-8 max-w-5xl mx-auto px-4 md:px-6 relative z-10 mt-10">
      {/* Cover Banner */}
      <div className="w-full h-48 md:h-64 rounded-3xl overflow-hidden relative mb-8 border border-white/10 group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-indigo-500/30 to-cyan-500/30 opacity-80 group-hover:scale-105 transition-transform duration-1000" />
        <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-dot-pattern opacity-30 mix-blend-overlay" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 -mt-24 md:-mt-32 relative z-20">
        
        {/* Left Sidebar - User Info */}
        <div className="flex flex-col space-y-6 glass-card p-6 rounded-3xl border-white/10 bg-black/40 backdrop-blur-2xl relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent pointer-events-none" />
          
          <div className="flex flex-col items-center md:items-start space-y-4 relative z-10">
            <Avatar className="h-32 w-32 border-4 border-black/50 shadow-2xl ring-2 ring-primary/30 bg-background">
              <AvatarImage src={`https://github.com/${username}.png`} alt={username} />
              <AvatarFallback className="text-4xl bg-primary/20 text-primary">{username.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center md:items-start space-y-1">
              <h1 className="text-2xl font-bold">Sanjarbek</h1>
              <p className="text-muted-foreground">@{username}</p>
            </div>
            <p className="text-center md:text-left text-sm">
              Full-stack dasturchi, AI texnologiyalariga qiziqadi. Open source contributor.
            </p>
            <div className="flex flex-col space-y-2 text-sm text-muted-foreground w-full">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Toshkent, O'zbekiston
              </div>
              <div className="flex items-center gap-2">
                <LinkIcon className="h-4 w-4" /> <Link href="#" className="hover:text-primary transition-colors">portfolio.uz</Link>
              </div>
              <div className="flex items-center gap-2">
                <Icons.gitHub className="h-4 w-4" /> <Link href="#" className="hover:text-primary transition-colors">github.com/{username}</Link>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> 2024-yil Fevralda qo'shildi
              </div>
            </div>
            
            <div className="flex w-full gap-3 pt-2">
              <Button className="w-full flex-1" variant="premium">Kuzatish</Button>
              <Link href="/profile/edit" className="w-auto">
                <Button variant="outline" size="icon" className="border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-md">
                  <Edit className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="font-semibold flex items-center gap-2">
              <Trophy className="h-4 w-4 text-amber-400" />
              Yutuqlar
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/30 hover:scale-105 hover:bg-amber-500/20 hover:shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all cursor-pointer py-1 px-3">
                AI Pioneer
              </Badge>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 hover:scale-105 hover:bg-primary/20 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all cursor-pointer py-1 px-3">
                Top Contributor
              </Badge>
              <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30 hover:scale-105 hover:bg-green-500/20 hover:shadow-[0_0_15px_rgba(34,197,94,0.3)] transition-all cursor-pointer py-1 px-3">
                100+ Prompts
              </Badge>
            </div>
          </div>
          
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="font-semibold flex items-center gap-2">
              <Flame className="h-4 w-4 text-orange-500" />
              Ko'nikmalar
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="hover:scale-105 transition-all cursor-pointer border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 py-1.5 px-3">React</Badge>
              <Badge variant="secondary" className="hover:scale-105 transition-all cursor-pointer border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 py-1.5 px-3">Next.js</Badge>
              <Badge variant="secondary" className="hover:scale-105 transition-all cursor-pointer border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 py-1.5 px-3">TypeScript</Badge>
              <Badge variant="secondary" className="hover:scale-105 transition-all cursor-pointer border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 py-1.5 px-3">Node.js</Badge>
              <Badge variant="secondary" className="hover:scale-105 transition-all cursor-pointer border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 py-1.5 px-3">Python</Badge>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="md:col-span-2">
          <Tabs defaultValue="activity" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="activity" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2">Faollik</TabsTrigger>
              <TabsTrigger value="prompts" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2">Promptlar (24)</TabsTrigger>
              <TabsTrigger value="blog" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2">Blog</TabsTrigger>
            </TabsList>
            
            <TabsContent value="activity" className="mt-6 space-y-4">
              <Card className="glass-card border-white/5 bg-white/[0.02] backdrop-blur-xl transition-all duration-500 hover:bg-white/[0.04] hover:shadow-[0_8px_40px_rgba(99,102,241,0.15)] hover:border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">So'nggi faollik</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-4 items-start pb-4 border-b border-border/50">
                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm">Yangi prompt qo'shdi: <span className="font-medium">Next.js API Route Generator</span></p>
                      <span className="text-xs text-muted-foreground">2 soat oldin</span>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start pb-4 border-b border-border/50">
                    <div className="bg-green-500/10 p-2 rounded-full text-green-500">
                      <Trophy className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm"><span className="font-medium">Top Contributor</span> yutug'ini qo'lga kiritdi!</p>
                      <span className="text-xs text-muted-foreground">1 kun oldin</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="prompts" className="mt-6">
              <p className="text-muted-foreground">Foydalanuvchi yaratgan promptlar shu yerda ko'rinadi.</p>
            </TabsContent>
            
            <TabsContent value="blog" className="mt-6">
              <p className="text-muted-foreground">Maqolalar va postlar shu yerda ko'rinadi.</p>
            </TabsContent>
          </Tabs>
        </div>

      </div>
    </div>
  );
}
