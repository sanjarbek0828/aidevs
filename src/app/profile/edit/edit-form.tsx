"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save, ArrowLeft, Loader2, MapPin, Globe, User } from "lucide-react";
import { Icons } from "@/components/shared/icons";
import Link from "next/link";
import { useState, useRef } from "react";
import { updateProfile, updateAvatar } from "@/app/actions/profile";
import { useRouter } from "next/navigation";

export default function EditProfileForm({ profile }: { profile: any }) {
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);
    setSuccess(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await updateProfile(formData);
    
    setIsSaving(false);
    
    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess("Profilingiz muvaffaqiyatli saqlandi!");
      router.refresh();
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("avatar", file);

    const result = await updateAvatar(formData);
    setIsUploading(false);

    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess("Avatar muvaffaqiyatli yuklandi!");
      router.refresh();
    }
  };

  return (
    <div className="container max-w-2xl py-12 px-4 relative z-10 pt-24 mx-auto">
      
      <Link href={profile?.username ? `/profile/${profile.username}` : "/profile"} className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-6 text-sm font-medium">
        <ArrowLeft className="mr-2 h-4 w-4" /> Profilga qaytish
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Sozlamalar</h1>
        <p className="text-muted-foreground text-sm">Shaxsiy ma'lumotlaringizni tahrirlash va hisob sozlamalari.</p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-medium">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-medium">
          {success}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6 pb-24 md:pb-0">
        
        {/* Profile Image Section */}
        <div className="glass-card p-6 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <Avatar className="h-24 w-24 border-2 border-border/50 bg-background/50 rounded-full shadow-lg transition-transform group-hover:scale-105">
                <AvatarImage src={profile?.avatar_url || `https://github.com/${profile?.username || 'devuz'}.png`} className="object-cover" />
                <AvatarFallback className="text-2xl text-primary bg-primary/10 font-bold">
                  {profile?.full_name?.substring(0, 2).toUpperCase() || 'US'}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                {isUploading ? <Loader2 className="h-8 w-8 text-white animate-spin" /> : <Camera className="h-8 w-8 text-white" />}
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*"
                onChange={handleAvatarChange}
                disabled={isUploading}
              />
            </div>
            <div className="text-center sm:text-left space-y-2">
              <h3 className="text-lg font-semibold">Avatar rasm</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Ushbu rasm butun platforma bo'ylab profil va postlaringizda ko'rinadi.
              </p>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                className="mt-2 rounded-full font-medium"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
              >
                {isUploading ? "Yuklanmoqda..." : "Rasmni almashtirish"}
              </Button>
            </div>
          </div>
        </div>

        {/* Basic Info Section */}
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md space-y-6">
          <div className="space-y-1 mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Asosiy ma'lumotlar
            </h3>
            <p className="text-sm text-muted-foreground">Boshqalar sizni qanday ko'rishini sozlang.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-sm font-medium">To'liq ism</Label>
              <Input name="full_name" id="full_name" defaultValue={profile?.full_name || ""} className="bg-background/50 border-border/50 rounded-xl focus:bg-background transition-colors" placeholder="Falonchi Pistonchiyev" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="text-sm font-medium">Username</Label>
              <Input name="username" id="username" defaultValue={profile?.username || ""} className="bg-background/50 border-border/50 rounded-xl focus:bg-background transition-colors" required placeholder="username" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio" className="text-sm font-medium">Bio (Qisqacha ma'lumot)</Label>
            <Textarea 
              name="bio"
              id="bio" 
              defaultValue={profile?.bio || ""}
              className="bg-background/50 border-border/50 rounded-xl min-h-[120px] resize-none text-sm p-4 focus:bg-background transition-colors" 
              placeholder="O'zingiz haqingizda qisqacha ma'lumot qoldiring..."
            />
            <p className="text-xs text-muted-foreground text-right">Maksimal 160 belgi</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="text-sm font-medium">Manzil</Label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input name="location" id="location" defaultValue={profile?.location || ""} className="bg-background/50 border-border/50 rounded-xl pl-10 focus:bg-background transition-colors" placeholder="Toshkent, O'zbekiston" />
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-border/40 bg-card/30 backdrop-blur-md space-y-6">
          <div className="space-y-1 mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Ijtimoiy tarmoqlar
            </h3>
            <p className="text-sm text-muted-foreground">Boshqa tarmoqlardagi havolalarni qo'shing.</p>
          </div>
          
          <div className="space-y-4">
            <div className="relative flex items-center">
              <div className="absolute left-3.5 h-full flex items-center justify-center text-muted-foreground">
                <Icons.gitHub className="h-4.5 w-4.5" />
              </div>
              <Input name="github_url" defaultValue={profile?.github_url || ""} className="bg-background/50 border-border/50 rounded-xl pl-11 h-11 focus:bg-background transition-colors" placeholder="https://github.com/..." />
            </div>
            
            <div className="relative flex items-center">
              <div className="absolute left-3.5 h-full flex items-center justify-center text-muted-foreground">
                <Icons.twitter className="h-4.5 w-4.5" />
              </div>
              <Input name="twitter_url" defaultValue={profile?.twitter_url || ""} className="bg-background/50 border-border/50 rounded-xl pl-11 h-11 focus:bg-background transition-colors" placeholder="https://twitter.com/..." />
            </div>

            <div className="relative flex items-center">
              <div className="absolute left-3.5 h-full flex items-center justify-center text-muted-foreground">
                <Globe className="h-4.5 w-4.5" />
              </div>
              <Input name="website_url" defaultValue={profile?.website_url || ""} className="bg-background/50 border-border/50 rounded-xl pl-11 h-11 focus:bg-background transition-colors" placeholder="Shaxsiy veb-sayt (https://...)" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 pt-4">
          <Link href={profile?.username ? `/profile/${profile.username}` : "/profile"} className="w-full sm:w-auto">
            <Button type="button" variant="ghost" className="w-full rounded-xl">
              Bekor qilish
            </Button>
          </Link>
          <Button 
            type="submit" 
            variant="default" 
            disabled={isSaving}
            className="w-full sm:w-auto rounded-xl px-8 glow-shadow"
          >
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saqlanmoqda...
              </>
            ) : (
              "O'zgarishlarni saqlash"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
