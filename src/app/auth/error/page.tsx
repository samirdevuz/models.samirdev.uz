import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Auth link error",
  robots: { index: false, follow: false },
};

export default function AuthErrorPage() {
  return (
    <main className="admin-auth-page">
      <div className="admin-auth-card">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" />
          <span>samirdev / admin</span>
        </Link>
        <p className="eyebrow">Link expired</p>
        <h1>Havola ishlamadi</h1>
        <p className="admin-auth-copy">
          Bu bir martalik havola eskirgan yoki avval ishlatilgan. Eng so‘nggi
          taklif emailidagi havolani oching.
        </p>
        <Link className="button button-secondary" href="/admin/login">
          Login sahifasiga qaytish
        </Link>
      </div>
    </main>
  );
}
