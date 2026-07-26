"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  bootstrapAdminEmail,
  bootstrapAdminUserId,
  isValidBootstrapToken,
} from "@/lib/admin-bootstrap";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

function bootstrapPath(token: string, error: string) {
  return `/admin/bootstrap/${encodeURIComponent(token)}?error=${error}`;
}

export async function bootstrapAdminAction(
  token: string,
  formData: FormData,
) {
  if (!isValidBootstrapToken(token)) {
    redirect("/admin/login?error=bootstrap-expired");
  }

  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");

  if (password.length < 12) {
    redirect(bootstrapPath(token, "short-password"));
  }

  if (password !== confirmation) {
    redirect(bootstrapPath(token, "password-mismatch"));
  }

  const admin = createAdminSupabaseClient();
  const { data, error: readError } =
    await admin.auth.admin.getUserById(bootstrapAdminUserId);
  const user = data.user;

  if (
    readError ||
    !user ||
    user.email?.toLowerCase() !== bootstrapAdminEmail ||
    user.app_metadata?.role !== "admin" ||
    user.app_metadata?.bootstrap_complete === true
  ) {
    redirect("/admin/login?error=bootstrap-expired");
  }

  const { error: updateError } = await admin.auth.admin.updateUserById(
    bootstrapAdminUserId,
    {
      password,
      app_metadata: {
        ...user.app_metadata,
        role: "admin",
        bootstrap_complete: true,
      },
    },
  );

  if (updateError) {
    redirect(bootstrapPath(token, "save-failed"));
  }

  const supabase = await createServerSupabaseClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: bootstrapAdminEmail,
    password,
  });

  if (signInError) {
    redirect("/admin/login?error=password-created");
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}
