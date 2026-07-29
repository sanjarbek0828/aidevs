import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Library, Code2, Users, Briefcase } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;

  return (
    <div className="fixed top-0 inset-x-0 h-20 w-full z-50 flex items-center justify-center pointer-events-none mt-2 px-4">
      <header className="pointer-events-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-white/10 glass-card bg-background/30 px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.6)] transition-all">
        <div className="flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <div className="bg-primary/20 p-1.5 rounded-lg group-hover:bg-primary/30 transition-colors">
              <Sparkles className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-bold text-lg hidden sm:inline-block tracking-tight text-white/90">
              aidevs.uz
            </span>
          </Link>
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/ai-tools"
              className="px-3 py-2 rounded-full transition-all hover:bg-white/5 hover:text-white text-white/60 flex items-center gap-1.5 text-sm font-medium relative group"
            >
              <Library className="h-4 w-4" /> AI Vositalar
              <span className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/prompts"
              className="px-3 py-2 rounded-full transition-all hover:bg-white/5 hover:text-white text-white/60 flex items-center gap-1.5 text-sm font-medium relative group"
            >
              <Sparkles className="h-4 w-4" /> Prompts
              <span className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/debug"
              className="px-3 py-2 rounded-full transition-all hover:bg-white/5 hover:text-white text-white/60 flex items-center gap-1.5 text-sm font-medium relative group"
            >
              <Code2 className="h-4 w-4" /> Debug
              <span className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/community"
              className="px-3 py-2 rounded-full transition-all hover:bg-white/5 hover:text-white text-white/60 flex items-center gap-1.5 text-sm font-medium relative group"
            >
              <Users className="h-4 w-4" /> Jamiyat
              <span className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            <Link
              href="/jobs"
              className="px-3 py-2 rounded-full transition-all hover:bg-white/5 hover:text-white text-white/60 flex items-center gap-1.5 text-sm font-medium relative group"
            >
              <Briefcase className="h-4 w-4" /> Karyera
              <span className="absolute inset-x-2 -bottom-px h-px bg-gradient-to-r from-primary/0 via-primary/70 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-3">
          {user ? (
            <Link href="/profile">
              <Avatar className="h-9 w-9 border-2 border-white/10 hover:border-primary/50 transition-colors shadow-sm">
                <AvatarImage src={`https://github.com/${user.user_metadata?.full_name?.toLowerCase().replace(/\s/g, '') || 'devuz'}.png`} />
                <AvatarFallback className="bg-primary/20 text-primary">{user.user_metadata?.full_name?.substring(0, 2).toUpperCase() || 'US'}</AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <>
              <Link href="/login" className={cn(buttonVariants({ variant: "ghost" }), "text-sm rounded-full hover:bg-white/5")}>
                Kirish
              </Link>
              <Link href="/register" className={cn(buttonVariants({ variant: "premium" }), "text-sm rounded-full border border-primary/50 text-white shadow-md")}>
                Ro'yxatdan o'tish
              </Link>
            </>
          )}
        </div>
      </header>
    </div>
  );
}
