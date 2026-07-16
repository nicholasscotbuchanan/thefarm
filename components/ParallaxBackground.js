"use client";

import { useEffect, useRef } from "react";

// A fixed, full-viewport textured layer that sits behind all content and
// drifts at a fraction of the scroll speed — so the background parallaxes
// against the page. Shifting background-position (rather than translating the
// element) keeps the repeating texture gap-free at any scroll depth.
const PARALLAX_FACTOR = 0.4; // 0 = static, 1 = moves with content

export default function ParallaxBackground() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect users who prefer reduced motion — keep the texture, drop the drift.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const offset = window.scrollY * PARALLAX_FACTOR;
      el.style.backgroundPositionY = `${offset}px`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        backgroundColor: "#f2efe4",
        backgroundImage: "url(/texture-field.svg)",
        backgroundSize: "220px 220px",
        backgroundRepeat: "repeat",
      }}
    />
  );
}
