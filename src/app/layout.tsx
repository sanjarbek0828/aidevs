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
  title: {
    default: "aidevs.uz | O'zbekiston Dasturchilari Ekotizimi",
    template: "%s | aidevs.uz"
  },
  description: "O'zbekiston dasturchilari uchun yagona ekotizim. Sun'iy intellekt vositalari, postlar, savol-javoblar va ish o'rinlari.",
  openGraph: {
    title: "aidevs.uz | O'zbekiston Dasturchilari",
    description: "Dasturlash, AI vositalari, tayyor promptlar, tezkor xatolarni izlash va kuchli jamoa.",
    url: "https://aidevs.uz",
    siteName: "aidevs.uz",
    locale: "uz_UZ",
    type: "website",
  },
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
