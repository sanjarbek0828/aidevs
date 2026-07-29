import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, ExternalLink, Star } from "lucide-react";
import { TrendChart } from "@/components/shared/trend-chart";

// Mock Data
const AI_TOOLS = [
  {
    id: 1,
    name: "Cursor",
    description: "The AI Code Editor built to make you extraordinarily productive.",
    category: "IDE",
    rating: 4.9,
    hasFreeTrial: true,
    tags: ["Code Generation", "Debugging", "Chat"],
  },
  {
    id: 2,
    name: "GitHub Copilot",
    description: "Your AI pair programmer that suggests code and entire functions in real-time.",
    category: "IDE Extension",
    rating: 4.8,
    hasFreeTrial: true,
    tags: ["Autocomplete", "Context Aware"],
  },
  {
    id: 3,
    name: "v0 by Vercel",
    description: "Generative UI system that creates React components from text prompts.",
    category: "UI Design",
    rating: 4.7,
    hasFreeTrial: true,
    tags: ["React", "Tailwind", "shadcn"],
  },
  {
    id: 4,
    name: "Claude 3.5 Sonnet",
    description: "Anthropic's most intelligent and capable model for coding and reasoning.",
    category: "LLM",
    rating: 4.9,
    hasFreeTrial: false,
    tags: ["Reasoning", "Artifacts"],
  }
];

export default function AIToolsPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto px-4 md:px-6 relative z-10">
      <div className="flex flex-col space-y-8 mt-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">AI Vositalar Katalogi</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Dasturlash jarayonini tezlashtirish uchun eng yaxshi sun'iy intellekt vositalari reytingi.
            </p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Qidirish..."
              className="pl-9 bg-background/50 backdrop-blur-sm"
            />
          </div>
        </div>
        
        <div className="w-full relative z-10">
          <TrendChart />
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide relative z-10">
          <Badge variant="premium" className="cursor-pointer px-4 py-1.5 text-sm">Barchasi</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary px-4 py-1.5 text-sm">IDE</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary px-4 py-1.5 text-sm">LLM</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary px-4 py-1.5 text-sm">UI Design</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary px-4 py-1.5 text-sm">Code Review</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {AI_TOOLS.map((tool) => (
            <Card key={tool.id} className="flex flex-col h-full group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CardHeader className="relative z-10">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl group-hover:text-primary transition-colors cursor-pointer">{tool.name}</CardTitle>
                  <div className="flex items-center gap-1.5 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{tool.rating}</span>
                  </div>
                </div>
                <CardDescription className="line-clamp-2 mt-3 text-foreground/80 leading-relaxed">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 relative z-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="font-medium text-xs px-2.5 py-1">{tool.category}</Badge>
                  {tool.hasFreeTrial && (
                    <Badge variant="outline" className="border-emerald-500/30 text-emerald-500 bg-emerald-500/5 font-medium text-xs px-2.5 py-1">Free Trial</Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {tool.tags.map(tag => (
                    <span key={tag} className="text-xs px-2.5 py-1 bg-muted/50 border border-border/50 rounded-md text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-5 border-t border-border/50 relative z-10 bg-transparent dark:bg-transparent">
                <Button className="w-full shadow-sm" variant="secondary">
                  Batafsil ko'rish
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
