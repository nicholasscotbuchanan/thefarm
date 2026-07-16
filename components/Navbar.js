"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Logo from "./Logo";

export default function Navbar() {
  const { data: session, status } = useSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-30 border-b border-soil-100 bg-cream/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Logo />

        <nav className="hidden items-center gap-6 text-sm font-medium text-soil-700 md:flex">
          <Link href="/feed" className="hover:text-sprout-700">
            The Field
          </Link>
          <Link href="/#features" className="hover:text-sprout-700">
            Why TheFarm
          </Link>
          <Link href="/#brands" className="hover:text-sprout-700">
            For Brands
          </Link>
          <Link href="/legal/disclaimer" className="hover:text-sprout-700">
            Wellness Notice
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <div className="h-9 w-24 animate-pulse rounded-full bg-soil-100" />
          ) : user ? (
            <>
              <Link href="/feed" className="hidden text-sm font-medium text-soil-700 hover:text-sprout-700 sm:block">
                @{user.handle}
              </Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="btn-ghost">
                Sign out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn-ghost">
                Log in
              </Link>
              <Link href="/login?mode=join" className="btn-primary">
                Join free
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
