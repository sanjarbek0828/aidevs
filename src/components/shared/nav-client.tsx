"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles, Library, Code2, Users, Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogOut, Settings, User as UserIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function NavClient({ user }: { user: any }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  const navLinks = [
    { href: "/ai-tools", label: "Tools", icon: Library },
    { href: "/prompts", label: "Prompts", icon: Sparkles },
    { href: "/debug", label: "Debug", icon: Code2 },
    { href: "/community", label: "Community", icon: Users },
    { href: "/jobs", label: "Jobs", icon: Briefcase },
  ];

  return (
    <>
      {/* Desktop Top Navbar */}
      <div className="fixed top-0 inset-x-0 h-16 w-full z-50 hidden md:flex items-center justify-center border-b border-border/40 bg-background/60 backdrop-blur-xl px-4 transition-all">
        <header className="flex w-full max-w-6xl items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center space-x-2 group text-foreground">
              <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm glow-shadow">
                A
              </div>
              <span className="font-semibold text-sm tracking-tight hidden lg:inline-block">aidevs</span>
            </Link>
            
            <nav className="flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "px-3 py-1.5 rounded-full transition-all text-sm font-medium relative",
                      isActive 
                        ? "text-foreground bg-accent/80 shadow-sm" 
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/40"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 hover:opacity-80 transition-opacity cursor-pointer outline-none">
                  <Avatar className="h-9 w-9 rounded-full border-2 border-border/50 ring-2 ring-transparent hover:ring-primary/20 transition-all shadow-sm">
                    <AvatarImage src={user.user_metadata?.avatar_url || `https://github.com/${user.user_metadata?.username || 'dev'}.png`} />
                    <AvatarFallback className="bg-muted text-muted-foreground text-xs font-semibold">
                      {user.user_metadata?.full_name?.substring(0, 2).toUpperCase() || 'US'}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl border-border/50 bg-background/80 backdrop-blur-xl mt-2 p-2 shadow-lg">
                  <div className="flex items-center justify-start gap-2 p-2 mb-1">
                    <div className="flex flex-col space-y-0.5 leading-none">
                      {user.user_metadata?.full_name && (
                        <p className="font-medium text-sm text-foreground">{user.user_metadata.full_name}</p>
                      )}
                      <p className="text-xs text-muted-foreground truncate max-w-[180px]">
                        @{user.user_metadata?.username || user.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer my-1">
                    <Link href={user.user_metadata?.username ? `/profile/${user.user_metadata.username}` : "/profile"} className="flex items-center w-full">
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer my-1">
                    <Link href="/profile/edit" className="flex items-center w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      Sozlamalar
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border/50" />
                  <DropdownMenuItem onClick={handleLogout} className="rounded-lg cursor-pointer text-red-500 hover:text-red-500 hover:bg-red-500/10 focus:text-red-500 focus:bg-red-500/10 my-1">
                    <LogOut className="mr-2 h-4 w-4" />
                    Chiqish
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2 ml-2">
                <Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "rounded-full")}>
                  Log in
                </Link>
                <Link href="/register" className={cn(buttonVariants({ variant: "default", size: "sm" }), "rounded-full glow-shadow")}>
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </header>
      </div>

      {/* Mobile Top Header (Minimal) */}
      <div className="md:hidden fixed top-0 inset-x-0 h-14 z-50 flex items-center justify-between px-4 bg-background/60 backdrop-blur-xl border-b border-border/40">
        <Link href="/" className="flex items-center space-x-2 text-foreground">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm shadow-sm glow-shadow">
            A
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <Link href="/profile/edit">
              <Avatar className="h-8 w-8 rounded-full border-2 border-border/50 shadow-sm">
                <AvatarImage src={user.user_metadata?.avatar_url || `https://github.com/${user.user_metadata?.username || 'dev'}.png`} />
                <AvatarFallback className="bg-muted text-muted-foreground text-xs font-semibold">
                  {user.user_metadata?.full_name?.substring(0, 2).toUpperCase() || 'US'}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">Log in</Link>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 inset-x-0 h-16 z-50 bg-background/80 backdrop-blur-xl border-t border-border/40 pb-safe">
        <nav className="flex items-center justify-around h-full px-2">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors relative",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <link.icon className={cn("h-5 w-5", isActive && "drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]")} />
                <span className="text-[10px] font-medium">{link.label}</span>
                {isActive && (
                  <span className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-[2px] bg-primary rounded-b-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
