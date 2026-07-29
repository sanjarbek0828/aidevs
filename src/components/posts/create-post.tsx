"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Code, Send } from "lucide-react";

export function CreatePost({ user, onPostCreated }: { user: any; onPostCreated: () => void }) {
  const [content, setContent] = useState("");
  const [codeSnippet, setCodeSnippet] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() && !codeSnippet.trim()) return;
    
    setIsSubmitting(true);
    
    const { error } = await supabase
      .from('posts')
      .insert({
        author_id: user.id,
        content: content.trim(),
        code_snippet: codeSnippet.trim() || null,
        language: showCodeInput && codeSnippet.trim() ? "javascript" : null // default language for now
      });
      
    setIsSubmitting(false);
    
    if (!error) {
      setContent("");
      setCodeSnippet("");
      setShowCodeInput(false);
      onPostCreated();
    } else {
      console.error("Error creating post:", error);
    }
  };

  return (
    <Card className="mb-6 premium-border glass-card overflow-hidden">
      <CardContent className="p-4 sm:p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-accent flex-shrink-0 border border-border/50 overflow-hidden">
              {user?.user_metadata?.avatar_url ? (
                <img src={user.user_metadata.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold">
                  {user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </div>
            <div className="flex-1">
              <Textarea
                placeholder="Nima yangilik?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[80px] resize-none border-0 focus-visible:ring-0 bg-transparent px-0 text-base"
              />
              
              {showCodeInput && (
                <div className="mt-3 relative">
                  <Textarea
                    placeholder="Kodingizni shu yerga tashlang..."
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    className="min-h-[120px] font-mono text-sm bg-muted/50 border-border/50 rounded-lg p-4"
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm"
                    className="absolute top-2 right-2 h-6 px-2 text-xs"
                    onClick={() => {
                      setShowCodeInput(false);
                      setCodeSnippet("");
                    }}
                  >
                    Yopish
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-border/40">
            <div className="flex gap-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setShowCodeInput(!showCodeInput)}
              >
                <Code className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Kod qo'shish</span>
              </Button>
            </div>
            <Button 
              type="submit" 
              disabled={isSubmitting || (!content.trim() && !codeSnippet.trim())}
              className="rounded-full px-6"
            >
              {isSubmitting ? "Yuborilmoqda..." : "Ulashish"}
              {!isSubmitting && <Send className="h-4 w-4 ml-2" />}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
