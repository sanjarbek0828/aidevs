"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2 } from "lucide-react";
import { Icons } from "@/components/shared/icons";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    // Check if Supabase keys are configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      setError("Supabase ulanishi sozlanmagan! Loyiha papkasida .env.local faylini yarating.");
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (error) {
        setError(error.message);
        return;
      }

      // If a session exists, user is logged in automatically (email confirmation disabled)
      if (data.session) {
        router.push("/");
        router.refresh();
      } else {
        // Email confirmation is required
        setSuccess(true);
      }
    } catch (err: any) {
      setError(err.message || "Xatolik yuz berdi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8 flex items-center space-x-2"
      >
        <Sparkles className="h-6 w-6 text-primary" />
        <span className="font-bold">aidevs.uz</span>
      </Link>
      
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Card className="border-border bg-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Ro'yxatdan o'tish</CardTitle>
            <CardDescription className="text-center">
              Yangi akkaunt yaratish uchun ma'lumotlarni kiriting
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {error && (
              <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md border border-destructive/20">
                {error}
              </div>
            )}

            {success ? (
              <div className="bg-green-500/15 text-green-500 text-sm p-4 rounded-md border border-green-500/20 text-center">
                Ro'yxatdan o'tdingiz! Iltimos, hisobingizni tasdiqlash uchun email pochtangizni tekshiring.
              </div>
            ) : (
              <form onSubmit={handleRegister} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Ism familiya</Label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="m@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Parol</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Yaratish
                </Button>
              </form>
            )}
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Yoki
                </span>
              </div>
            </div>
            
            <Button variant="outline" type="button" className="w-full bg-transparent">
              <Icons.gitHub className="mr-2 h-4 w-4" />
              GitHub orqali
            </Button>
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-center gap-2">
            <div className="text-sm text-muted-foreground">
              Akkauntingiz bormi?{" "}
              <Link
                href="/login"
                className="text-primary hover:underline underline-offset-4"
              >
                Kirish
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
