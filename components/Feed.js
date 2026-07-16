"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Composer from "./Composer";
import PostCard from "./PostCard";
import Avatar from "./Avatar";

export default function Feed({ initialPosts = [], trending = [] }) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const [posts, setPosts] = useState(initialPosts);

  function handlePosted(post) {
    setPosts((prev) => [post, ...prev]);
  }

  async function handleWater(id) {
    // Optimistic UI is handled inside PostCard; here we persist.
    const res = await fetch(`/api/posts/${id}/water`, { method: "POST" });
    if (!res.ok) throw new Error("Failed to water post.");
  }

  return (
    <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 lg:grid-cols-[1fr_320px]">
      {/* Main column */}
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-soil-900">The Field</h1>
          <p className="text-sm text-soil-600">
            Fresh from growers and brands across TheFarm.
          </p>
        </div>

        {status === "loading" ? (
          <div className="card h-32 animate-pulse" />
        ) : user ? (
          <Composer user={user} onPosted={handlePosted} />
        ) : (
          <div className="card flex flex-col items-center gap-4 p-5 sm:flex-row sm:justify-between">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/illustrations/among-nature.svg"
              alt="A person relaxing among trees and nature"
              className="h-24 w-auto shrink-0"
            />
            <p className="text-sm text-soil-700">
              You&apos;re browsing as a guest. Sign in to plant posts and water
              your favorites.
            </p>
            <Link href="/login?callbackUrl=/feed" className="btn-primary shrink-0">
              Sign in
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              canInteract={Boolean(user)}
              onWater={handleWater}
            />
          ))}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="hidden space-y-5 lg:block">
        <div className="card p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-soil-500">
            Growing now
          </h2>
          <ul className="mt-3 space-y-3">
            {trending.length === 0 && (
              <li className="text-sm text-soil-500">Nothing trending yet.</li>
            )}
            {trending.map((t) => (
              <li key={t.tag} className="flex items-center justify-between">
                <span className="font-medium text-sprout-700">#{t.tag}</span>
                <span className="text-xs text-soil-400">{t.count} posts</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-soil-500">
            Suggested brands
          </h2>
          <ul className="mt-3 space-y-3 text-sm">
            {[
              { h: "terrafirma", n: "Terra Firma Botanicals", photo: 1 },
              { h: "rootandrise", n: "Root & Rise Collective", photo: 2 },
              { h: "dr_wilder", n: "Dr. Ada Wilder, ND", photo: 5 },
            ].map((b) => (
              <li key={b.h} className="flex items-center justify-between gap-2">
                <span className="flex min-w-0 items-center gap-2">
                  <Avatar index={b.photo} profile={{ name: b.n, handle: b.h }} className="h-8 w-8" />
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-soil-900">{b.n}</span>
                    <span className="block text-xs text-soil-400">@{b.h}</span>
                  </span>
                </span>
                <button className="rounded-full border border-sprout-300 px-3 py-1 text-xs font-semibold text-sprout-700 hover:bg-sprout-50">
                  Follow
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="card bg-soil-900 p-5 text-cream">
          <h2 className="text-sm font-bold">Are you a brand?</h2>
          <p className="mt-2 text-sm text-soil-100">
            Get a verified profile, publish COAs, and connect your store over our
            OAuth API.
          </p>
          <Link href="/login?mode=join" className="btn-primary mt-4 w-full">
            Claim your brand
          </Link>
        </div>
      </aside>
    </div>
  );
}
