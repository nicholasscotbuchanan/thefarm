import { Suspense } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import LoginForm from "@/components/LoginForm";
import { oauthEnabled } from "@/lib/auth";

export const metadata = {
  title: "Log in or Join",
  description: "Sign in to TheFarm with email, Google, or GitHub.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen field-texture">
      <div className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-12">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/illustrations/gardening.svg"
          alt="A gardener planting seedlings"
          className="mx-auto mb-6 h-36 w-auto"
        />

        <div className="card p-8">
          <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-soil-50" />}>
            <LoginForm oauthEnabled={oauthEnabled} />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-soil-500">
          By continuing you agree to our{" "}
          <Link href="/legal/terms" className="link">Terms of Service</Link> and{" "}
          <Link href="/legal/privacy" className="link">Privacy Policy</Link>, and
          acknowledge our{" "}
          <Link href="/legal/disclaimer" className="link">Wellness Disclaimer</Link>.
        </p>

        <p className="mt-4 text-center text-sm text-soil-600">
          <Link href="/" className="link">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}
