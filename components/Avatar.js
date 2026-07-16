// A profile avatar sliced from the 3×3 team.png grid using background-position.
// No image processing needed — one asset, nine faces, crisp at any size.

const GRID = 3; // 3×3

// Stable hash so an unknown handle always maps to the same face.
export function avatarIndexFor(handle) {
  let h = 0;
  const s = handle || "grower";
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h % (GRID * GRID);
}

export default function Avatar({ profile, index, className = "h-11 w-11" }) {
  const idx =
    index != null
      ? index
      : profile?.photo != null
      ? profile.photo
      : avatarIndexFor(profile?.handle);

  const col = idx % GRID;
  const row = Math.floor(idx / GRID);
  // With background-size 300%, position 0/50/100% selects each column & row.
  const posX = GRID === 1 ? 0 : (col / (GRID - 1)) * 100;
  const posY = GRID === 1 ? 0 : (row / (GRID - 1)) * 100;

  return (
    <span
      role="img"
      aria-label={profile?.name ? `${profile.name}'s avatar` : "avatar"}
      className={`inline-block shrink-0 overflow-hidden rounded-full bg-soil-100 ring-1 ring-black/5 ${className}`}
      style={{
        backgroundImage: "url(/avatars/team.png)",
        backgroundSize: `${GRID * 100}% ${GRID * 100}%`,
        backgroundPosition: `${posX}% ${posY}%`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}
