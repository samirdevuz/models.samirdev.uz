"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

type InviteState = "loading" | "ready" | "saving" | "error";

export default function InvitePage() {
  const router = useRouter();
  const [state, setState] = useState<InviteState>("loading");
  const [message, setMessage] = useState(
    "Taklif havolasi tekshirilmoqda…",
  );

  useEffect(() => {
    let active = true;

    async function acceptInvite() {
      const supabase = createBrowserSupabaseClient();
      const hash = new URLSearchParams(window.location.hash.slice(1));
      const hashError = hash.get("error_description");
      const accessToken = hash.get("access_token");
      const refreshToken = hash.get("refresh_token");

      if (hashError) {
        if (active) {
          setMessage(
            "Taklif havolasi eskirgan yoki avval ishlatilgan. Yangi taklif havolasidan foydalaning.",
          );
          setState("error");
        }
        return;
      }

      if (accessToken && refreshToken) {
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        if (error) {
          if (active) {
            setMessage("Taklif sessiyasini ochib bo‘lmadi. Yangi havola so‘rang.");
            setState("error");
          }
          return;
        }

        window.history.replaceState(null, "", "/auth/invite");
      }

      const { data, error } = await supabase.auth.getUser();
      const user = data.user;

      if (error || !user || user.app_metadata?.role !== "admin") {
        if (active) {
          setMessage(
            "Bu havola admin taklifiga tegishli emas yoki uning muddati tugagan.",
          );
          setState("error");
        }
        return;
      }

      if (active) {
        setMessage("");
        setState("ready");
      }
    }

    void acceptInvite();
    return () => {
      active = false;
    };
  }, []);

  async function setPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("saving");
    setMessage("");

    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirmation = String(form.get("confirmation") ?? "");

    if (password.length < 12) {
      setMessage("Parol kamida 12 ta belgidan iborat bo‘lishi kerak.");
      setState("ready");
      return;
    }

    if (password !== confirmation) {
      setMessage("Kiritilgan parollar bir xil emas.");
      setState("ready");
      return;
    }

    const supabase = createBrowserSupabaseClient();
    const { data, error } = await supabase.auth.updateUser({ password });

    if (error || data.user?.app_metadata?.role !== "admin") {
      setMessage("Parolni saqlab bo‘lmadi. Yangi taklif havolasini sinab ko‘ring.");
      setState("ready");
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <main className="admin-auth-page">
      <div className="admin-auth-card">
        <Link className="brand" href="/">
          <span className="brand-mark" aria-hidden="true" />
          <span>samirdev / admin</span>
        </Link>
        <p className="eyebrow">Admin invitation</p>
        <h1>Parol o‘rnating</h1>
        <p className="admin-auth-copy">
          Admin panelni himoyalash uchun kamida 12 belgili yangi parol yarating.
        </p>

        {state === "loading" ? (
          <div className="admin-alert">{message}</div>
        ) : null}

        {state === "error" ? (
          <>
            <div className="admin-alert admin-alert-error">{message}</div>
            <Link className="button button-secondary" href="/admin/login">
              Login sahifasiga qaytish
            </Link>
          </>
        ) : null}

        {state === "ready" || state === "saving" ? (
          <form className="admin-form" onSubmit={setPassword}>
            {message ? (
              <div className="admin-alert admin-alert-error">{message}</div>
            ) : null}
            <label>
              <span>Yangi parol</span>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                minLength={12}
                required
                disabled={state === "saving"}
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
                disabled={state === "saving"}
              />
            </label>
            <button
              className="button button-primary"
              type="submit"
              disabled={state === "saving"}
            >
              {state === "saving" ? "Saqlanmoqda…" : "Parolni saqlash"}
            </button>
          </form>
        ) : null}
      </div>
    </main>
  );
}
