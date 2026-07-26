"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { createServerSupabaseClient } from "@/lib/supabase/server";

const attributionStatuses = new Set([
  "pending",
  "original",
  "verified",
  "restricted",
]);

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

function optionalHttpsUrl(value: string) {
  if (!value) {
    return null;
  }

  const url = new URL(value);
  if (url.protocol !== "https:") {
    throw new Error("Source URL must use HTTPS.");
  }

  return url.toString();
}

export async function loginAction(formData: FormData) {
  if (!hasSupabaseEnv()) {
    redirect("/admin/login?error=not-configured");
  }

  const email = field(formData, "email");
  const password = field(formData, "password");

  if (!email || password.length < 12) {
    redirect("/admin/login?error=invalid-credentials");
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect("/admin/login?error=invalid-credentials");
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function signOutAction() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/admin/login");
}

export async function updateModelAction(formData: FormData) {
  await requireAdmin();

  const id = field(formData, "id");
  const slug = field(formData, "slug");
  const title = field(formData, "title");
  const description = field(formData, "description");
  const originalCreator = field(formData, "originalCreator");
  const originalSourceUrl = field(formData, "originalSourceUrl");
  const licenseCode = field(formData, "licenseCode");
  const attributionStatus = field(formData, "attributionStatus");
  const bbmodelPath = field(formData, "bbmodelPath");

  if (!id || !slug || title.length < 2 || !attributionStatuses.has(attributionStatus)) {
    redirect(`/admin/models/${slug}?error=invalid-fields`);
  }

  let safeSourceUrl: string | null;
  try {
    safeSourceUrl = optionalHttpsUrl(originalSourceUrl);
  } catch {
    redirect(`/admin/models/${slug}?error=invalid-source-url`);
  }

  const admin = createAdminSupabaseClient();
  const { data: previous } = await admin
    .from("models")
    .select("bbmodel_path")
    .eq("id", id)
    .maybeSingle();

  const { error } = await admin
    .from("models")
    .update({
      title,
      description,
      original_creator: originalCreator || null,
      original_source_url: safeSourceUrl,
      license_code: licenseCode || null,
      attribution_status: attributionStatus,
      redistribution_allowed: formData.get("redistributionAllowed") === "on",
      published: formData.get("published") === "on",
      bbmodel_path: bbmodelPath || null,
    })
    .eq("id", id);

  if (error) {
    redirect(`/admin/models/${slug}?error=save-failed`);
  }

  if (
    previous?.bbmodel_path &&
    bbmodelPath &&
    previous.bbmodel_path !== bbmodelPath
  ) {
    await admin.storage.from("model-files").remove([previous.bbmodel_path]);
  }

  revalidatePath("/");
  revalidatePath(`/models/${slug}`);
  revalidatePath("/admin");
  redirect(`/admin/models/${slug}?saved=1`);
}
