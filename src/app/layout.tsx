import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { ThemeProvider } from "@/components/theme-provider";
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "aidevs.uz",
  description: "O'zbekiston dasturchilari uchun yagona ekotizim",
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
      className={`${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
      </head>
      <body className="min-h-full flex flex-col bg-background relative overflow-x-hidden font-sans" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* Strict Minimalist Background */}
          <div className="fixed inset-0 bg-background pointer-events-none z-[-1]" />
          
          <Navbar />
          <main className="flex-1 relative z-0">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
