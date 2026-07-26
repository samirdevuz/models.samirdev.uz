import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { bootstrapAdminAction } from "@/app/admin/bootstrap/actions";
import {
  bootstrapAdminEmail,
  bootstrapAdminUserId,
  isValidBootstrapToken,
} from "@/lib/admin-bootstrap";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Secure admin setup",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

const errorMessages: Record<string, string> = {
  "short-password": "Parol kamida 12 ta belgidan iborat bo‘lishi kerak.",
  "password-mismatch": "Kiritilgan parollar bir xil emas.",
  "save-failed": "Parolni saqlab bo‘lmadi. Qayta urinib ko‘ring.",
};

export default async function AdminBootstrapPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ token }, { error }] = await Promise.all([params, searchParams]);

  if (!isValidBootstrapToken(token)) {
    notFound();
  }

  const admin = createAdminSupabaseClient();
  const { data, error: userError } =
    await admin.auth.admin.getUserById(bootstrapAdminUserId);
  const user = data.user;

  if (
    userError ||
    !user ||
    user.email?.toLowerCase() !== bootstrapAdminEmail ||
    user.app_metadata?.role !== "admin"
  ) {
    notFound();
  }

  if (user.app_metadata?.bootstrap_complete === true) {
    redirect("/admin/login");
  }

  const bootstrapWithToken = bootstrapAdminAction.bind(null, token);

  return (
    <main className="admin-auth-page">
      <div className="admin-auth-card">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" />
          <span>samirdev / admin</span>
        </Link>
        <p className="eyebrow">One-time secure setup</p>
        <h1>Admin parolini yarating</h1>
        <p className="admin-auth-copy">
          Bu bir martalik sahifa email talab qilmaydi. Parol saqlangach havola
          avtomatik o‘chadi va admin panel ochiladi.
        </p>

        {error && errorMessages[error] ? (
          <div className="admin-alert admin-alert-error">
            {errorMessages[error]}
          </div>
        ) : null}

        <form action={bootstrapWithToken} className="admin-form">
          <label>
            <span>Yangi parol</span>
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              minLength={12}
              required
              autoFocus
            />
          </label>
          <label>
            <span>Parolni takrorlang</span>
            <input
              type="password"
              name="confirmation"
              autoComplete="new-password"
              minLength={12}
              required
            />
          </label>
          <button className="button button-primary" type="submit">
            Parolni saqlash va kirish
          </button>
        </form>
      </div>
    </main>
  );
}
