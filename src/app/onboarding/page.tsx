"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function OnboardingPage() {
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({
          bio,
          location,
          github_url: githubUrl
        })
        .eq('id', user.id);

      if (!error) {
        router.push("/feed");
        router.refresh();
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 pt-20">
      <Card className="w-full max-w-lg premium-border glass-card">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">Xush kelibsiz!</CardTitle>
          <CardDescription>
            Tizimdan to'liq foydalanish uchun profilingizni to'ldiring.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSave}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bio">O'zingiz haqingizda (Bio)</Label>
              <Textarea 
                id="bio" 
                placeholder="Men Frontend dasturchiman..." 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="resize-none"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Manzil</Label>
              <Input 
                id="location" 
                placeholder="Toshkent, O'zbekiston" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github">GitHub URL (ixtiyoriy)</Label>
              <Input 
                id="github" 
                placeholder="https://github.com/username" 
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full"
              onClick={() => router.push("/feed")}
            >
              O'tkazib yuborish
            </Button>
            <Button 
              type="submit" 
              className="w-full"
              disabled={loading}
            >
              {loading ? "Saqlanmoqda..." : "Saqlash va davom etish"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
