import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Copy, Check, MessageSquare, ThumbsUp } from "lucide-react";

// Mock Data
const PROMPTS = [
  {
    id: 1,
    title: "React Component Generator",
    description: "Generate a fully accessible React component using Tailwind CSS and Radix UI primitives.",
    category: "Frontend",
    author: "@devuz",
    likes: 342,
    comments: 12,
    preview: "Sen expert frontend dasturchisan. Menga quyidagi talablarga mos React komponentini yozib ber...",
  },
  {
    id: 2,
    title: "SQL Query Optimizer",
    description: "Analyze and optimize complex PostgreSQL queries with EXPLAIN ANALYZE feedback.",
    category: "Database",
    author: "@dbmaster",
    likes: 189,
    comments: 4,
    preview: "Act as a Senior Database Administrator. Analyze the following PostgreSQL query and suggest...",
  },
  {
    id: 3,
    title: "Code Review Assistant",
    description: "Get a comprehensive code review focused on security, performance, and best practices.",
    category: "Code Review",
    author: "@securityninja",
    likes: 521,
    comments: 45,
    preview: "Review the following code snippet. Focus strictly on potential security vulnerabilities (OWASP)...",
  }
];

export default function PromptsPage() {
  return (
    <div className="container py-8 max-w-7xl mx-auto px-4 md:px-6 relative z-10">
      <div className="flex flex-col space-y-8 mt-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Prompt Kutubxonasi</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Eng yaxshi natijalarga erishish uchun tayyor va sinovdan o'tgan promptlar kolleksiyasi.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Prompt qidirish..."
                className="pl-9 bg-background/50 backdrop-blur-sm"
              />
            </div>
            <Button variant="premium">
              Yangi Prompt
            </Button>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide relative z-10">
          <Badge variant="premium" className="cursor-pointer px-4 py-1.5 text-sm">Barchasi</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary px-4 py-1.5 text-sm">Frontend</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary px-4 py-1.5 text-sm">Backend</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary px-4 py-1.5 text-sm">Database</Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-secondary px-4 py-1.5 text-sm">Code Review</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {PROMPTS.map((prompt) => (
            <Card key={prompt.id} className="flex flex-col h-full group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CardHeader className="relative z-10">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="secondary" className="font-medium text-xs px-2.5 py-1">{prompt.category}</Badge>
                  <span className="text-xs text-muted-foreground/80 font-medium">{prompt.author}</span>
                </div>
                <CardTitle className="text-xl leading-tight group-hover:text-primary transition-colors cursor-pointer">{prompt.title}</CardTitle>
                <CardDescription className="line-clamp-2 mt-3 text-foreground/80 leading-relaxed">
                  {prompt.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 relative z-10">
                <div className="bg-background/40 backdrop-blur-sm p-4 rounded-xl border border-white/5 relative group/code hover:border-primary/30 transition-colors shadow-inner">
                  <p className="text-sm font-mono text-muted-foreground line-clamp-3 leading-relaxed">
                    {prompt.preview}
                  </p>
                  <Button size="icon" variant="secondary" className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover/code:opacity-100 transition-all duration-300 hover:scale-105 shadow-md">
                    <Copy className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="pt-5 border-t border-border/50 flex justify-between relative z-10 bg-transparent dark:bg-transparent">
                <div className="flex gap-5 text-muted-foreground text-sm font-medium">
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-primary transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{prompt.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 cursor-pointer hover:text-primary transition-colors">
                    <MessageSquare className="h-4 w-4" />
                    <span>{prompt.comments}</span>
                  </div>
                </div>
                <Button size="sm" variant="secondary" className="shadow-sm">
                  Ishlatish
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
