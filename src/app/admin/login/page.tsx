import type { Metadata } from "next";
import Link from "next/link";
import { loginAction } from "@/app/admin/actions";
import { hasSupabaseEnv } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

const errorMessages: Record<string, string> = {
  "not-configured": "Supabase environment variables are not configured yet.",
  "invalid-credentials": "Email or password is incorrect.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const configured = hasSupabaseEnv();

  return (
    <main className="admin-auth-page">
      <div className="admin-auth-card">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" />
          <span>samirdev / admin</span>
        </Link>
        <p className="eyebrow">Private workspace</p>
        <h1>Archive control room</h1>
        <p className="admin-auth-copy">
          Review attribution, upload verified project files, and publish safe
          downloads.
        </p>

        {!configured ? (
          <div className="admin-alert">
            Connect the dedicated Supabase project to enable admin sign-in.
          </div>
        ) : null}

        {error && errorMessages[error] ? (
          <div className="admin-alert admin-alert-error">
            {errorMessages[error]}
          </div>
        ) : null}

        <form action={loginAction} className="admin-form">
          <label>
            <span>Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              required
              disabled={!configured}
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              minLength={12}
              required
              disabled={!configured}
            />
          </label>
          <button
            className="button button-primary"
            type="submit"
            disabled={!configured}
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  );
}
