import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { FeedClient } from "./feed-client";

export const metadata = {
  title: "Lenta | aidevs.uz",
  description: "O'zbekiston dasturchilarining so'nggi yangiliklari va postlari.",
};

export default async function FeedPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Initial posts fetch
  const { data: posts } = await supabase
    .from("posts")
    .select("*, profiles(*)")
    .order("created_at", { ascending: false })
    .limit(20);

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Lenta</h1>
        <p className="text-muted-foreground">Hamkasblaringiz bilan fikr almashing va kod ulashing.</p>
      </div>
      
      <FeedClient initialPosts={posts || []} user={user} />
    </div>
  );
}
