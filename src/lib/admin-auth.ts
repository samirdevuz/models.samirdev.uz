import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.auth.getUser();
  const user = data.user;

  if (error || !user || user.app_metadata?.role !== "admin") {
    redirect("/admin/login");
  }

  return user;
}
