import { createClient } from "@/lib/supabase/server";
import { NavClient } from "./nav-client";

export async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return <NavClient user={user} />;
}
