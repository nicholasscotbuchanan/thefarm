"use client";

/* eslint-disable @next/next/no-img-element */

// Renders a post's attached media: a single video, or a 1–4 image grid
// laid out roughly like Twitter/X.
export default function PostMedia({ media }) {
  if (!media || media.length === 0) return null;

  const video = media.find((m) => m.type === "video");
  if (video) {
    return (
      <div className="mt-3 overflow-hidden rounded-2xl border border-soil-100 bg-black">
        <video
          src={video.url}
          poster={video.poster}
          controls
          playsInline
          preload="metadata"
          aria-label={video.alt || "Post video"}
          className="mx-auto max-h-[520px] w-full"
        />
      </div>
    );
  }

  const images = media.filter((m) => m.type === "image").slice(0, 4);
  const n = images.length;

  // Layout presets keyed by image count.
  const layout =
    n === 1
      ? "grid-cols-1"
      : n === 3
      ? "grid-cols-2"
      : "grid-cols-2";

  const cellClass = (i) => {
    if (n === 1) return "h-auto max-h-[520px]";
    if (n === 2) return "h-64";
    if (n === 3) return i === 0 ? "col-span-2 h-56" : "h-40";
    return "h-40"; // n === 4
  };

  return (
    <div
      className={`mt-3 grid gap-1 overflow-hidden rounded-2xl border border-soil-100 ${layout}`}
    >
      {images.map((img, i) => (
        <img
          key={i}
          src={img.url}
          alt={img.alt || "Post image"}
          loading="lazy"
          className={`w-full bg-soil-50 object-cover ${cellClass(i)}`}
        />
      ))}
    </div>
  );
}
