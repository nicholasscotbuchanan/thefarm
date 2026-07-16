"use client";

import { useRef, useState } from "react";
import Avatar from "./Avatar";

const MAX = 480;
const MAX_ITEMS = 4;
const IMAGE_MAX = 5 * 1024 * 1024; // 5 MB
const VIDEO_MAX = 25 * 1024 * 1024; // 25 MB

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read that file."));
    reader.readAsDataURL(file);
  });
}

export default function Composer({ user, onPosted }) {
  const [body, setBody] = useState("");
  const [media, setMedia] = useState([]); // { type, url, name }
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const remaining = MAX - body.length;
  const over = remaining < 0;
  const hasVideo = media.some((m) => m.type === "video");
  const canAddMore = !hasVideo && media.length < MAX_ITEMS;

  async function handleFiles(e) {
    setError("");
    const files = Array.from(e.target.files || []);
    // Reset the input so selecting the same file again re-triggers change.
    if (fileRef.current) fileRef.current.value = "";
    if (files.length === 0) return;

    try {
      const next = [...media];
      for (const file of files) {
        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");
        if (!isVideo && !isImage) {
          throw new Error("Only images and video are supported.");
        }
        if (isVideo) {
          if (next.length > 0) {
            throw new Error("Post a single video, or up to 4 images — not both.");
          }
          if (file.size > VIDEO_MAX) {
            throw new Error("That video is over 25 MB. Try a shorter clip.");
          }
          const url = await readAsDataURL(file);
          next.push({ type: "video", url, name: file.name });
          break; // one video max
        } else {
          if (next.some((m) => m.type === "video")) {
            throw new Error("Post a single video, or up to 4 images — not both.");
          }
          if (next.length >= MAX_ITEMS) {
            throw new Error(`You can attach up to ${MAX_ITEMS} images.`);
          }
          if (file.size > IMAGE_MAX) {
            throw new Error(`"${file.name}" is over 5 MB.`);
          }
          const url = await readAsDataURL(file);
          next.push({ type: "image", url, name: file.name });
        }
      }
      setMedia(next);
    } catch (err) {
      setError(err.message);
    }
  }

  function removeMedia(i) {
    setMedia((m) => m.filter((_, idx) => idx !== i));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const trimmed = body.trim();
    if ((!trimmed && media.length === 0) || over) return;

    setPosting(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: trimmed,
          media: media.map((m) => ({ type: m.type, url: m.url, alt: m.name })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setBody("");
      setMedia([]);
      onPosted?.(data.post);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setPosting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-5">
      <div className="flex gap-3">
        <Avatar profile={user} className="h-11 w-11" />
        <div className="flex-1">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            placeholder={`What's growing, @${user?.handle || "grower"}?`}
            className="w-full resize-none rounded-xl border border-soil-200 bg-white px-4 py-3 text-[15px] text-soil-900 outline-none focus:border-sprout-400 focus:ring-2 focus:ring-sprout-200"
          />

          {/* Media previews */}
          {media.length > 0 && (
            <div
              className={`mt-3 grid gap-2 ${
                hasVideo ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-4"
              }`}
            >
              {media.map((m, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-xl border border-soil-100 bg-soil-50"
                >
                  {m.type === "video" ? (
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <video src={m.url} controls className="max-h-64 w-full" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.url} alt={m.name} className="h-28 w-full object-cover" />
                  )}
                  <button
                    type="button"
                    onClick={() => removeMedia(i)}
                    aria-label="Remove attachment"
                    className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-sm text-white hover:bg-black/80"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={!canAddMore}
                title={
                  hasVideo
                    ? "Remove the video to add images"
                    : "Add photos or a video"
                }
                className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-sm font-medium text-sprout-700 hover:bg-sprout-50 disabled:opacity-40"
              >
                <span aria-hidden>🖼️</span>
                <span className="hidden sm:inline">Photo / video</span>
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFiles}
                className="hidden"
              />
              <span title="Attach COA" className="cursor-default px-1 opacity-40">🔬</span>
              <span title="Tag ingredients" className="cursor-default px-1 opacity-40">🏷️</span>
            </div>

            <div className="flex items-center gap-3">
              <span className={`text-xs tabular-nums ${over ? "text-red-600" : "text-soil-400"}`}>
                {remaining}
              </span>
              <button
                type="submit"
                disabled={posting || (!body.trim() && media.length === 0) || over}
                className="btn-primary px-5 py-2 disabled:opacity-50"
              >
                {posting ? "Planting…" : "Plant post"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
