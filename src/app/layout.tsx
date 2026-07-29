import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "aidevs.uz",
  description: "Dasturchilar uchun ijtimoiy tarmoq va AI resurs platformasi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Force dark mode on html tag by default
  return (
    <html
      lang="uz"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      suppressHydrationWarning
    >
      <head>
      </head>
      <body className="min-h-full flex flex-col bg-background relative overflow-x-hidden" suppressHydrationWarning>
        {/* Premium Background Effects */}
        <div className="fixed inset-0 pointer-events-none z-[-1] flex items-center justify-center overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
          <div className="absolute top-[40%] right-[20%] w-[30%] h-[30%] rounded-full bg-cyan-500/10 blur-[100px]" />
        </div>
        <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none z-[-1] mask-image-radial" />
        
        <Navbar />
        <main className="flex-1 relative z-0">{children}</main>
      </body>
    </html>
  );
}
