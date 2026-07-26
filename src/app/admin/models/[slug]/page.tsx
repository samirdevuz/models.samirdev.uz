import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminModelEditor } from "@/components/admin-model-editor";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Review model",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminModelPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ saved?: string; error?: string }>;
}) {
  await requireAdmin();
  const { slug } = await params;
  const status = await searchParams;
  const admin = createAdminSupabaseClient();
  const { data: model } = await admin
    .from("models")
    .select(
      "id,slug,title,description,original_creator,original_source_url,license_code,attribution_status,redistribution_allowed,published,bbmodel_path,download_ready",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (!model) {
    notFound();
  }

  return (
    <main className="admin-page">
      <div className="site-container admin-editor-shell">
        <div className="detail-breadcrumb">
          <Link href="/admin">Admin</Link>
          <span>/</span>
          <span>{model.slug}</span>
        </div>
        <div className="admin-editor-heading">
          <div>
            <p className="eyebrow">Attribution and release</p>
            <h1>{model.title}</h1>
          </div>
          <span className={model.download_ready ? "release-ready" : "release-locked"}>
            {model.download_ready ? "Download ready" : "Download locked"}
          </span>
        </div>

        {status.saved ? (
          <div className="admin-alert admin-alert-success">
            Model record saved.
          </div>
        ) : null}
        {status.error ? (
          <div className="admin-alert admin-alert-error">
            The record could not be saved. Check all release fields.
          </div>
        ) : null}

        <AdminModelEditor model={model} />
      </div>
    </main>
  );
}
