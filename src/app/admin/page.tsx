import type { Metadata } from "next";
import Link from "next/link";
import { signOutAction } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/admin-auth";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Admin dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!hasSupabaseEnv() || !process.env.SUPABASE_SECRET_KEY) {
    return (
      <main className="admin-page">
        <div className="site-container admin-empty">
          <p className="eyebrow">Setup required</p>
          <h1>Supabase is ready in code.</h1>
          <p>
            Create and connect the dedicated project to unlock this dashboard.
            The public archive continues to use its safe static fallback.
          </p>
          <Link className="button button-primary" href="/">
            Back to archive
          </Link>
        </div>
      </main>
    );
  }

  const user = await requireAdmin();
  const admin = createAdminSupabaseClient();
  const { data: models, error } = await admin
    .from("models")
    .select(
      "id,slug,title,category,attribution_status,redistribution_allowed,download_ready,published,download_count,display_order",
    )
    .order("display_order");

  if (error) {
    throw new Error("Could not load the admin model catalog.");
  }

  const readyCount = models?.filter((model) => model.download_ready).length ?? 0;
  const pendingCount =
    models?.filter((model) => model.attribution_status === "pending").length ?? 0;

  return (
    <main className="admin-page">
      <div className="site-container">
        <div className="admin-topbar">
          <div>
            <p className="eyebrow">Private workspace</p>
            <h1>Model control room</h1>
            <p>{user.email}</p>
          </div>
          <form action={signOutAction}>
            <button className="button button-secondary" type="submit">
              Sign out
            </button>
          </form>
        </div>

        <div className="admin-stats">
          <div>
            <strong>{models?.length ?? 0}</strong>
            <span>Total models</span>
          </div>
          <div>
            <strong>{readyCount}</strong>
            <span>Download ready</span>
          </div>
          <div>
            <strong>{pendingCount}</strong>
            <span>Awaiting review</span>
          </div>
        </div>

        <div className="admin-table-shell">
          <div className="admin-table-head">
            <span>Model</span>
            <span>Attribution</span>
            <span>Release</span>
            <span>Downloads</span>
            <span />
          </div>
          {models?.map((model) => (
            <div className="admin-table-row" key={model.id}>
              <span>
                <strong>{model.title}</strong>
                <small>{model.category}</small>
              </span>
              <span className={`admin-status status-${model.attribution_status}`}>
                {model.attribution_status}
              </span>
              <span>{model.download_ready ? "Ready" : "Locked"}</span>
              <span>{model.download_count}</span>
              <Link href={`/admin/models/${model.slug}`}>Review →</Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
