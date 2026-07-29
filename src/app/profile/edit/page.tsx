"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, ArrowLeft, Loader2, Link as LinkIcon, MapPin, Github, Twitter, Globe } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function EditProfilePage() {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => setIsSaving(false), 1500);
  };

  return (
    <div className="container max-w-3xl py-12 px-4 relative z-10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <Link href="/profile/devuz" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6 group bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-white/10">
        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" /> Profilga qaytish
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">Profilni tahrirlash</h1>
        <p className="text-muted-foreground text-lg">Shaxsiy ma'lumotlaringizni va ijtimoiy tarmoqlaringizni yangilang.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Profile Image Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-50" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-black/50 shadow-2xl ring-2 ring-primary/30 bg-background">
                <AvatarImage src="https://github.com/devuz.png" />
                <AvatarFallback className="text-2xl text-primary bg-primary/20">DV</AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
                <Camera className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-xl font-bold">Profil rasmi</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Tavsiya etiladigan o'lcham 500x500px. JPG, PNG yoki GIF formatlarida.
              </p>
              <Button type="button" variant="outline" size="sm" className="mt-2 border-white/20 bg-white/5 hover:bg-white/10">
                Rasmni yuklash
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Basic Info Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6"
        >
          <h3 className="text-xl font-bold border-b border-white/10 pb-4">Asosiy ma'lumotlar</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="name" className="text-muted-foreground">To'liq ism</Label>
              <Input id="name" defaultValue="Sanjarbek" className="bg-white/5 border-white/10 h-14 rounded-xl focus-visible:ring-primary/50 text-base" />
            </div>
            <div className="space-y-3">
              <Label htmlFor="username" className="text-muted-foreground">Username</Label>
              <Input id="username" defaultValue="devuz" className="bg-white/5 border-white/10 h-14 rounded-xl focus-visible:ring-primary/50 text-base" />
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="bio" className="text-muted-foreground">Bio</Label>
            <Textarea 
              id="bio" 
              defaultValue="Full-stack dasturchi, AI texnologiyalariga qiziqadi. Open source contributor."
              className="bg-white/5 border-white/10 rounded-xl min-h-[140px] resize-none focus-visible:ring-primary/50 text-base p-4" 
            />
            <p className="text-xs text-muted-foreground">O'zingiz haqingizda qisqacha ma'lumot qoldiring. (Maksimal 160 belgi)</p>
          </div>

          <div className="space-y-3">
            <Label htmlFor="location" className="text-muted-foreground">Manzil</Label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="location" defaultValue="Toshkent, O'zbekiston" className="bg-white/5 border-white/10 h-14 rounded-xl pl-12 focus-visible:ring-primary/50 text-base" />
            </div>
          </div>
        </motion.div>

        {/* Social Links Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl space-y-6"
        >
          <h3 className="text-xl font-bold border-b border-white/10 pb-4">Ijtimoiy tarmoqlar</h3>
          
          <div className="space-y-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 w-14 flex items-center justify-center bg-white/5 border-r border-white/10 rounded-l-xl text-muted-foreground">
                <Github className="h-6 w-6" />
              </div>
              <Input defaultValue="devuz" className="bg-white/5 border-white/10 h-14 rounded-xl pl-16 focus-visible:ring-primary/50 text-base" placeholder="GitHub username" />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 w-14 flex items-center justify-center bg-white/5 border-r border-white/10 rounded-l-xl text-muted-foreground">
                <Twitter className="h-6 w-6" />
              </div>
              <Input className="bg-white/5 border-white/10 h-14 rounded-xl pl-16 focus-visible:ring-primary/50 text-base" placeholder="Twitter/X username" />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 w-14 flex items-center justify-center bg-white/5 border-r border-white/10 rounded-l-xl text-muted-foreground">
                <Globe className="h-6 w-6" />
              </div>
              <Input defaultValue="portfolio.uz" className="bg-white/5 border-white/10 h-14 rounded-xl pl-16 focus-visible:ring-primary/50 text-base" placeholder="Shaxsiy veb-sayt (URL)" />
            </div>
          </div>
        </motion.div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 pb-20">
          <Button 
            type="submit" 
            size="lg" 
            variant="premium" 
            disabled={isSaving}
            className="w-full md:w-auto px-10 rounded-full h-16 text-lg shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] transition-all"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" /> Saqlanmoqda...
              </>
            ) : (
              <>
                <Save className="mr-3 h-6 w-6" /> O'zgarishlarni Saqlash
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
