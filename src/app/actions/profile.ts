"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Foydalanuvchi topilmadi. Tizimga qayta kiring." };
  }

  const fullName = formData.get("full_name") as string;
  const username = formData.get("username") as string;
  const bio = formData.get("bio") as string;
  const location = formData.get("location") as string;
  const githubUrl = formData.get("github_url") as string;
  const twitterUrl = formData.get("twitter_url") as string;
  const websiteUrl = formData.get("website_url") as string;

  // Basic validation
  if (!username) {
    return { error: "Username kiritilishi shart." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      username,
      bio,
      location,
      github_url: githubUrl,
      twitter_url: twitterUrl,
      website_url: websiteUrl,
    })
    .eq("id", user.id);

  if (error) {
    console.error("Profile update error:", error);
    if (error.code === '23505') { // Unique violation
      return { error: "Bu username band. Boshqa tanlang." };
    }
    return { error: "Ma'lumotlarni saqlashda xatolik yuz berdi." };
  }

  revalidatePath(`/profile/${username}`);
  revalidatePath("/profile");
  
  return { success: true };
}

export async function updateAvatar(formData: FormData) {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "Foydalanuvchi topilmadi." };
  }

  const file = formData.get("avatar") as File;
  if (!file || file.size === 0) {
    return { error: "Rasm tanlanmagan." };
  }

  const fileExt = file.name.split('.').pop();
  const fileName = `${user.id}-${Math.random()}.${fileExt}`;
  const filePath = `avatars/${fileName}`;

  // Upload to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("profiles")
    .upload(filePath, file);

  if (uploadError) {
    console.error("Upload error:", uploadError);
    return { error: "Rasmni yuklashda xatolik yuz berdi." };
  }

  const { data: publicUrlData } = supabase.storage
    .from("profiles")
    .getPublicUrl(filePath);

  // Update profile
  const { error: updateError } = await supabase
    .from("profiles")
    .update({ avatar_url: publicUrlData.publicUrl })
    .eq("id", user.id);

  if (updateError) {
    return { error: "Profilni yangilashda xatolik." };
  }

  revalidatePath("/profile");
  return { success: true, avatarUrl: publicUrlData.publicUrl };
}
