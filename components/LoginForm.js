"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

/* ---- Brand icons (inline SVG so the buttons look real, no external assets) ---- */
function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path fill="#4285F4" d="M23.06 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h6.19c-.27 1.44-1.08 2.66-2.3 3.48v2.89h3.72c2.18-2 3.45-4.96 3.45-8.38z" />
      <path fill="#34A853" d="M12 24c3.11 0 5.72-1.03 7.62-2.79l-3.72-2.89c-1.03.69-2.35 1.1-3.9 1.1-3 0-5.54-2.02-6.45-4.75H1.7v2.98C3.59 21.44 7.5 24 12 24z" />
      <path fill="#FBBC05" d="M5.55 13.67c-.23-.69-.36-1.43-.36-2.19s.13-1.5.36-2.19V6.31H1.7A11.99 11.99 0 000 11.48c0 1.94.46 3.77 1.7 5.17l3.85-2.98z" />
      <path fill="#EA4335" d="M12 4.75c1.69 0 3.21.58 4.4 1.72l3.3-3.3C17.72 1.19 15.11 0 12 0 7.5 0 3.59 2.56 1.7 6.31l3.85 2.98C6.46 6.78 9 4.75 12 4.75z" />
    </svg>
  );
}
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M16.365 1.43c0 1.14-.42 2.22-1.17 3.03-.9.96-2.37 1.71-3.63 1.6-.15-1.14.42-2.34 1.14-3.09.81-.87 2.28-1.53 3.42-1.57.03.01.21.02.21.03zM20.5 17.06c-.63 1.44-.93 2.07-1.74 3.33-1.14 1.77-2.76 3.99-4.77 4.02-1.77.03-2.22-1.14-4.62-1.14-2.4 0-2.91 1.11-4.59 1.17-1.92.06-3.39-1.89-4.53-3.66C-.57 18.09.6 10.86 3.6 8.55c1.11-.87 2.55-1.35 3.87-1.35 1.35 0 2.19.9 3.63.9 1.41 0 2.28-.9 3.87-.9 1.35 0 2.79.72 3.81 1.98-3.36 1.83-2.82 6.63.72 7.88z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path fill="#1877F2" d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden>
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.53.11-3.19 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.89.12 3.19.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 22.3 24 17.8 24 12.5 24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}

// Display config per provider. `always: true` = the button is shown even when
// not configured (clicking it explains how to enable it). GitHub is a developer
// extra, so it only appears once its keys are present.
const PROVIDER_UI = [
  { id: "google", name: "Google", label: "Continue with Google", env: "GOOGLE_CLIENT_ID", Icon: GoogleIcon, always: true },
  { id: "apple", name: "Apple", label: "Continue with Apple", env: "APPLE_CLIENT_ID", Icon: AppleIcon, always: true },
  { id: "facebook", name: "Facebook", label: "Continue with Facebook", env: "FACEBOOK_CLIENT_ID", Icon: FacebookIcon, always: true },
  { id: "github", name: "GitHub", label: "Continue with GitHub", env: "GITHUB_CLIENT_ID", Icon: GitHubIcon, always: false },
];

export default function LoginForm({ oauthEnabled }) {
  const params = useSearchParams();
  const router = useRouter();
  const joinMode = params.get("mode") === "join";
  const callbackUrl = params.get("callbackUrl") || "/feed";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(null); // provider awaiting config
  const emailRef = useRef(null);

  const visibleProviders = PROVIDER_UI.filter(
    (p) => p.always || oauthEnabled?.[p.id]
  );

  function handleProviderClick(p) {
    if (oauthEnabled?.[p.id]) {
      signIn(p.id, { callbackUrl });
    } else {
      setModal(p);
    }
  }

  // Close the modal on Escape.
  useEffect(() => {
    if (!modal) return;
    const onKey = (e) => e.key === "Escape" && setModal(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal]);

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setError("");

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    const res = await signIn("email", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });
    setLoading(false);

    if (res?.error) {
      setError("We couldn't sign you in. Check your details and try again.");
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-soil-900">
        {joinMode ? "Join TheFarm" : "Welcome back"}
      </h1>
      <p className="mt-1 text-sm text-soil-600">
        {joinMode
          ? "Create your account and plant your first post."
          : "Sign in to get back to the Field."}
      </p>

      {/* Social sign-in — always shown; unconfigured ones explain themselves */}
      <div className="mt-6 space-y-3">
        {visibleProviders.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => handleProviderClick(p)}
            className="btn-ghost w-full py-2.5"
          >
            <p.Icon />
            {p.label}
          </button>
        ))}
      </div>

      <div className="my-6 flex items-center gap-3 text-xs text-soil-400">
        <span className="h-px flex-1 bg-soil-100" />
        or use your email
        <span className="h-px flex-1 bg-soil-100" />
      </div>

      {/* Email sign-in */}
      <form onSubmit={handleEmailSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-soil-800">
            Email
          </label>
          <input
            id="email"
            ref={emailRef}
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@farm.co"
            className="w-full rounded-xl border border-soil-200 bg-white px-4 py-2.5 text-sm text-soil-900 outline-none focus:border-sprout-400 focus:ring-2 focus:ring-sprout-200"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium text-soil-800">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete={joinMode ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full rounded-xl border border-soil-200 bg-white px-4 py-2.5 text-sm text-soil-900 outline-none focus:border-sprout-400 focus:ring-2 focus:ring-sprout-200"
            required
          />
        </div>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 disabled:opacity-60">
          {loading ? "Planting…" : joinMode ? "Create account" : "Log in"}
        </button>
      </form>

      <div className="mt-4 rounded-lg bg-sprout-50 px-3 py-2 text-xs text-sprout-800">
        <strong>Demo tip:</strong> any valid email + a 6-character password
        works. Try <code className="rounded bg-white px-1">grower@thefarm.com</code>{" "}
        / <code className="rounded bg-white px-1">harvest</code>.
      </div>

      {/* "Needs configuration" modal */}
      {modal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="provider-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-soil-900/50 backdrop-blur-sm"
            onClick={() => setModal(null)}
          />
          <div className="card relative z-10 w-full max-w-sm p-6">
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-soil-50 ring-1 ring-black/5">
                <modal.Icon />
              </span>
              <h2 id="provider-modal-title" className="text-lg font-bold text-soil-900">
                {modal.name} sign-in isn&apos;t set up yet
              </h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-soil-600">
              This deployment doesn&apos;t have {modal.name} credentials
              configured. To turn it on, add{" "}
              <code className="rounded bg-soil-50 px-1 text-soil-800">{modal.env}</code>{" "}
              and its secret to your environment (see{" "}
              <code className="rounded bg-soil-50 px-1 text-soil-800">.env.local.example</code>).
              The button then works automatically — no code changes.
            </p>
            <p className="mt-2 text-sm text-soil-600">
              For now, you can sign in with your email.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="btn-ghost"
              >
                Got it
              </button>
              <button
                type="button"
                onClick={() => {
                  setModal(null);
                  emailRef.current?.focus();
                }}
                className="btn-primary"
              >
                Use email instead
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
