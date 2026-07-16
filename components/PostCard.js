"use client";

import { useState } from "react";
import PostMedia from "./PostMedia";
import Avatar from "./Avatar";

function timeAgo(iso) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, now - then);
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d`;
  return new Date(iso).toLocaleDateString();
}

export default function PostCard({ post, canInteract, onWater }) {
  const author = post.authorProfile || {};
  const [watering, setWatering] = useState(false);
  const [watered, setWatered] = useState(false);

  async function handleWater() {
    if (!canInteract || watered || watering) return;
    setWatering(true);
    try {
      await onWater(post.id);
      setWatered(true);
    } finally {
      setWatering(false);
    }
  }

  return (
    <article className="card p-5">
      <div className="flex gap-3">
        <Avatar profile={author} className="h-11 w-11" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-1.5 text-sm">
            <span className="font-semibold text-soil-900">{author.name || post.author}</span>
            {author.verified && (
              <span title="Verified brand" className="text-sprout-600">✔</span>
            )}
            <span className="text-soil-400">@{post.author}</span>
            <span className="text-soil-300">·</span>
            <span className="text-soil-400">{timeAgo(post.createdAt)}</span>
          </div>

          {post.body && (
            <p className="mt-1.5 whitespace-pre-wrap break-words text-[15px] leading-relaxed text-soil-800">
              {post.body}
            </p>
          )}

          <PostMedia media={post.media} />

          {post.tags?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full bg-soil-50 px-2.5 py-0.5 text-xs font-medium text-sprout-700">
                  #{t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-3 flex items-center gap-6 text-sm text-soil-500">
            <button
              onClick={handleWater}
              disabled={!canInteract || watered}
              title={canInteract ? "Water this post" : "Sign in to water"}
              className={`inline-flex items-center gap-1.5 transition ${
                watered ? "text-sprout-600" : "hover:text-sprout-600"
              } disabled:cursor-not-allowed`}
            >
              <span>💧</span>
              <span>{post.water + (watered ? 1 : 0)}</span>
            </button>
            <span className="inline-flex items-center gap-1.5" title="Replant (share)">
              <span>🌱</span>
              <span>{post.replant}</span>
            </span>
            <span className="inline-flex items-center gap-1.5" title="Replies">
              <span>💬</span>
              <span>{post.replies}</span>
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
