/**
 * In-memory data store for TheFarm.
 *
 * This keeps the app 100% turnkey — no database to provision, no
 * migrations, no native modules. Seed content loads on first import.
 *
 * NOTE: Because this lives in memory, new posts persist only for the
 * life of the server process (and are per-serverless-instance on
 * Vercel). Swap `lib/data.js` for a real database (Postgres, Neon,
 * Supabase, Planetscale, etc.) when you're ready — the API routes in
 * app/api/posts already isolate every call behind this module.
 */

// Use a global so the store survives Next.js hot-reloads in dev.
const globalForStore = globalThis;

const SEED_USERS = [
  {
    handle: "terrafirma",
    name: "Terra Firma Botanicals",
    verified: true,
    avatar: "🌿",
    photo: 1,
    bio: "Small-batch adaptogenic tinctures. Regeneratively farmed in the Blue Ridge.",
  },
  {
    handle: "rootandrise",
    name: "Root & Rise Collective",
    verified: true,
    avatar: "🌱",
    photo: 2,
    bio: "Soil-first wellness. Mushroom coffee, mineral broths, honest sourcing.",
  },
  {
    handle: "meadowmineral",
    name: "Meadow Mineral Co.",
    verified: false,
    avatar: "🐝",
    photo: 0,
    bio: "Raw honey, bee pollen & propolis from pesticide-free pastures.",
  },
  {
    handle: "coldpressclara",
    name: "Clara — Cold Press Kitchen",
    verified: false,
    avatar: "🥕",
    photo: 3,
    bio: "Juicing, fermenting, and composting my way to a slower life.",
  },
  {
    handle: "dr_wilder",
    name: "Dr. Ada Wilder, ND",
    verified: true,
    avatar: "🌾",
    photo: 5,
    bio: "Naturopath. Herbalist. I read the studies so you don't have to.",
  },
];

function minutesAgo(n) {
  // Fixed reference time so seed timestamps are deterministic across
  // reloads. Real posts get a live timestamp when created.
  const base = 1_752_000_000_000; // static reference epoch (ms)
  return new Date(base - n * 60_000).toISOString();
}

const SEED_POSTS = [
  {
    id: "seed-1",
    author: "terrafirma",
    body: "New moon, new batch 🌑 Our reishi + tulsi evening tincture is back in stock. Dual-extracted, 60-day maceration, grown in living soil. No fillers, no fairy dust — just the mushroom and the plant.",
    createdAt: minutesAgo(14),
    water: 128,
    replant: 24,
    replies: 9,
    tags: ["adaptogens", "reishi"],
    media: [
      { type: "image", url: "/photos/greenhouse-seedlings.jpg", alt: "Seedlings growing in our nursery greenhouse" },
      { type: "image", url: "/photos/field-spring-harvest.jpg", alt: "The living-soil field where our herbs are grown" },
    ],
  },
  {
    id: "seed-2",
    author: "dr_wilder",
    body: "Reminder: 'natural' is a marketing word, not a safety guarantee. Ask your maker three things — where it's grown, how it's tested, and what the actual dose is. Good brands answer instantly. 🌾",
    createdAt: minutesAgo(41),
    water: 402,
    replant: 96,
    replies: 33,
    tags: ["transparency"],
  },
  {
    id: "seed-3",
    author: "rootandrise",
    body: "Spent the morning with the growers who supply our lion's mane. Watching someone inoculate hardwood logs by hand makes 'supply chain' feel like the wrong words entirely. This is a relationship, not a chain. 🍄",
    createdAt: minutesAgo(78),
    water: 217,
    replant: 51,
    replies: 12,
    tags: ["lionsmane", "sourcing"],
    media: [
      { type: "image", url: "/photos/farm-scene.jpg", alt: "Out in the field with our growing partners" },
      { type: "image", url: "/photos/tractor-harvest.webp", alt: "Bringing in the harvest" },
    ],
  },
  {
    id: "seed-4",
    author: "meadowmineral",
    body: "The bees had a good week. 🐝 Wildflower flow is on and the supers are heavy. Raw, unfiltered, single-apiary honey drops Friday. Limited — when it's gone it's gone until next bloom.",
    createdAt: minutesAgo(120),
    water: 88,
    replant: 15,
    replies: 6,
    tags: ["rawhoney"],
    media: [
      {
        type: "video",
        url: "/samples/field-clip.mp4",
        poster: "/samples/honey-harvest.svg",
        alt: "Wildflowers in bloom by the apiary",
      },
    ],
  },
  {
    id: "seed-5",
    author: "coldpressclara",
    body: "Day 6 of the ferment and the kitchen smells incredible. Beet + ginger kvass, wild-fermented, zero starter culture. If you've never let vegetables do their own thing on the counter for a week… you're missing the magic. 🥕",
    createdAt: minutesAgo(163),
    water: 141,
    replant: 19,
    replies: 21,
    tags: ["fermentation", "guthealth"],
    media: [
      { type: "image", url: "/photos/fresh-produce.jpg", alt: "Freshly harvested vegetables for fermenting" },
    ],
  },
  {
    id: "seed-6",
    author: "terrafirma",
    body: "We third-party test every lot for heavy metals, microbials, and potency, and we publish the COA with a QR code on the bottle. If a wellness brand won't show you the paperwork, that IS the paperwork. 🌿",
    createdAt: minutesAgo(205),
    water: 356,
    replant: 112,
    replies: 28,
    tags: ["testing", "transparency"],
    media: [
      { type: "image", url: "/photos/field-rows.webp", alt: "Rows of crops on a regenerative farm" },
    ],
  },
];

function init() {
  if (!globalForStore.__thefarmStore) {
    globalForStore.__thefarmStore = {
      users: new Map(SEED_USERS.map((u) => [u.handle, u])),
      posts: [...SEED_POSTS],
      nextId: 1,
    };
  }
  return globalForStore.__thefarmStore;
}

export function getUser(handle) {
  const store = init();
  return (
    store.users.get(handle) || {
      handle,
      name: handle.replace(/\b\w/g, (c) => c.toUpperCase()),
      verified: false,
      avatar: "🌱",
      bio: "",
    }
  );
}

export function listPosts() {
  const store = init();
  // Newest first.
  return [...store.posts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .map((p) => ({ ...p, authorProfile: getUser(p.author) }));
}

// Media limits. Data URLs are stored inline in the (in-memory) post, so we
// cap size to keep memory sane. base64 inflates bytes by ~37%, so these string
// caps correspond to roughly ~5 MB per image and ~25 MB per video of source.
export const MEDIA_LIMITS = {
  maxItems: 4,
  imageUrlChars: 7_000_000,
  videoUrlChars: 35_000_000,
};

function sanitizeMedia(media) {
  if (media == null) return [];
  if (!Array.isArray(media)) throw new Error("Media must be a list.");
  if (media.length > MEDIA_LIMITS.maxItems) {
    throw new Error(`You can attach up to ${MEDIA_LIMITS.maxItems} items.`);
  }

  const cleaned = media.map((m, i) => {
    if (!m || typeof m !== "object") throw new Error("Invalid media item.");
    const type = m.type === "video" ? "video" : m.type === "image" ? "image" : null;
    if (!type) throw new Error("Media type must be 'image' or 'video'.");

    const url = typeof m.url === "string" ? m.url.trim() : "";
    const okScheme =
      url.startsWith(`data:${type}/`) ||
      url.startsWith("/") ||
      url.startsWith("https://") ||
      url.startsWith("http://");
    if (!okScheme) throw new Error("Unsupported media source.");

    const cap = type === "video" ? MEDIA_LIMITS.videoUrlChars : MEDIA_LIMITS.imageUrlChars;
    if (url.length > cap) {
      throw new Error(
        type === "video"
          ? "That video is too large (max ~25 MB)."
          : "That image is too large (max ~5 MB)."
      );
    }

    const item = { type, url, alt: typeof m.alt === "string" ? m.alt.slice(0, 280) : "" };
    if (type === "video" && typeof m.poster === "string" && m.poster.length < 3_000_000) {
      item.poster = m.poster;
    }
    return item;
  });

  // A post is either up to 4 images, or a single video (Twitter-style rule).
  const hasVideo = cleaned.some((m) => m.type === "video");
  if (hasVideo && cleaned.length > 1) {
    throw new Error("A post can include one video, or up to 4 images — not both.");
  }
  return cleaned;
}

export function createPost({ authorHandle, authorName, body, media }) {
  const store = init();
  const clean = (body || "").trim();
  const safeMedia = sanitizeMedia(media);
  if (!clean && safeMedia.length === 0) {
    throw new Error("Add some text or media to post.");
  }
  if (clean.length > 480) throw new Error("Posts are limited to 480 characters.");

  const handle = (authorHandle || "grower").toLowerCase();
  if (!store.users.has(handle)) {
    store.users.set(handle, {
      handle,
      name: authorName || handle,
      verified: false,
      avatar: "🌻",
      bio: "New to TheFarm.",
    });
  }

  const post = {
    id: `p-${store.nextId++}`,
    author: handle,
    body: clean,
    createdAt: new Date().toISOString(),
    water: 0,
    replant: 0,
    replies: 0,
    tags: [],
    media: safeMedia,
  };
  store.posts.unshift(post);
  return { ...post, authorProfile: getUser(post.author) };
}

export function waterPost(id) {
  const store = init();
  const post = store.posts.find((p) => p.id === id);
  if (!post) throw new Error("Post not found.");
  post.water += 1;
  return { ...post, authorProfile: getUser(post.author) };
}

export function trendingTags() {
  const store = init();
  const counts = new Map();
  for (const p of store.posts) {
    for (const t of p.tags || []) {
      counts.set(t, (counts.get(t) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([tag, count]) => ({ tag, count }));
}
