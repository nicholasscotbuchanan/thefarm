import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Avatar from "@/components/Avatar";

const features = [
  {
    icon: "🌱",
    title: "Grow in public",
    body: "Post your harvest, your process, your wins and your failed batches. TheFarm rewards the transparency your customers actually crave.",
  },
  {
    icon: "🔬",
    title: "Proof, not promises",
    body: "Attach Certificates of Analysis, source maps, and third-party tests right to your posts. Let the paperwork do the marketing.",
  },
  {
    icon: "🤝",
    title: "Farm-to-brand network",
    body: "Connect growers, formulators, and wellness brands in one feed. Source ingredients and find partners without the cold DMs.",
  },
  {
    icon: "💧",
    title: "A calmer feed",
    body: "No engagement-bait algorithm. Watering a post, replanting, and following are all you get. Slower by design.",
  },
];

const brandPerks = [
  "Verified brand profiles with sourcing badges",
  "OAuth-ready API for your storefront & CRM",
  "Publish COAs and lab results inline",
  "Newsletter capture built into your profile",
  "Community moderation tuned for wellness claims",
  "Analytics on what your community waters most",
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      {/* Hero */}
      <section className="field-texture">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2 md:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-sprout-200 bg-white px-3 py-1 text-xs font-semibold text-sprout-700">
              🌾 Now in open beta — planting season is here
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight text-soil-900 sm:text-5xl">
              Where wellness
              <span className="text-sprout-600"> takes root.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-soil-700">
              TheFarm is the social network for regenerative agriculture and
              the alternative health brands it feeds. Share your harvest, build
              a following, and sell with radical transparency.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/login?mode=join" className="btn-primary px-7 py-3 text-base">
                Plant your first post — free
              </Link>
              <Link href="/feed" className="btn-ghost px-7 py-3 text-base">
                Explore the Field
              </Link>
            </div>

            <p className="mt-4 text-xs text-soil-500">
              No credit card. Email or social sign-in. Leave any time — your
              soil, your rules.
            </p>

            <div className="mt-8 flex items-center gap-6 text-sm text-soil-600">
              <div>
                <div className="text-2xl font-extrabold text-soil-900">12k+</div>
                growers & brands
              </div>
              <div className="h-8 w-px bg-soil-200" />
              <div>
                <div className="text-2xl font-extrabold text-soil-900">98%</div>
                publish lab results
              </div>
              <div className="h-8 w-px bg-soil-200" />
              <div>
                <div className="text-2xl font-extrabold text-soil-900">0</div>
                creepy algorithms
              </div>
            </div>
          </div>

          {/* Hero photo with a floating product card */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/photos/hero-harvest.jpg"
                alt="A farmer harvesting fresh squash by hand in a sunlit field"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
            <div className="card absolute -bottom-5 left-0 w-64 p-4 sm:-left-5">
              <div className="flex items-center gap-2">
                <Avatar index={1} profile={{ name: "Terra Firma" }} className="h-9 w-9" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1 text-sm font-semibold text-soil-900">
                    Terra Firma
                    <span title="Verified brand" className="text-sprout-600">✔</span>
                  </div>
                  <div className="text-xs text-soil-500">@terrafirma · now</div>
                </div>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-soil-700">
                New batch 🌑 Reishi + tulsi tincture is back. COA attached —
                scan and see for yourself.
              </p>
              <div className="mt-2 flex gap-4 text-[11px] text-soil-500">
                <span>💧 128</span>
                <span>🌱 24</span>
                <span>💬 9</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-4 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-soil-900">
            Social media that respects the soil
          </h2>
          <p className="mt-4 text-soil-700">
            We stripped out the outrage machine and rebuilt a feed around the
            things that actually grow a wellness brand: trust, provenance, and
            community.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="card p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-sprout-100 text-2xl">
                {f.icon}
              </div>
              <h3 className="mt-4 text-lg font-bold text-soil-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-soil-600">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works — illustrated (unDraw) */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-soil-900">
              From seed to sale, in the open
            </h2>
            <p className="mt-4 text-soil-700">
              Three simple steps to build a following that trusts you.
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              {
                img: "gardening",
                alt: "Person planting in a garden",
                step: "1",
                title: "Plant your story",
                body: "Share what you grow and how — process notes, harvest photos, and the honest messy middle.",
              },
              {
                img: "eco-conscious",
                alt: "Person recycling and caring for the planet",
                step: "2",
                title: "Prove your practices",
                body: "Attach COAs, source maps, and third-party tests so your claims carry receipts.",
              },
              {
                img: "healthy-lifestyle",
                alt: "Person living a healthy, active lifestyle",
                step: "3",
                title: "Grow your community",
                body: "Watered posts and replants spread by trust, not by an outrage algorithm.",
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className="flex h-44 items-end justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/illustrations/${s.img}.svg`}
                    alt={s.alt}
                    className="h-40 w-auto max-w-[220px]"
                  />
                </div>
                <div className="mt-6 grid h-8 w-8 place-items-center rounded-full bg-sprout-600 text-sm font-bold text-white">
                  {s.step}
                </div>
                <h3 className="mt-3 text-lg font-bold text-soil-900">{s.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-soil-600">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For brands */}
      <section id="brands" className="bg-soil-900 text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 md:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-sprout-400/40 bg-sprout-400/10 px-3 py-1 text-xs font-semibold text-sprout-300">
              For alternative health brands
            </span>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight">
              Your most honest storefront
            </h2>
            <p className="mt-4 max-w-lg leading-relaxed text-soil-100">
              TheFarm gives independent wellness brands a home built for
              trust. Integrate your store over our OAuth API, publish your lab
              results, and turn transparency into your biggest growth channel.
            </p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {brandPerks.map((perk) => (
                <li key={perk} className="flex items-start gap-2 text-sm text-soil-100">
                  <span className="mt-0.5 text-sprout-400">✔</span>
                  {perk}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/login?mode=join" className="btn-primary px-7 py-3 text-base">
                Claim your brand
              </Link>
              <Link href="/contact" className="btn-ghost border-soil-600 bg-transparent px-7 py-3 text-base text-cream hover:bg-soil-800">
                Talk to our team
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-soil-700 bg-soil-800 p-6">
            <div className="text-xs font-semibold uppercase tracking-wider text-sprout-300">
              Developer preview
            </div>
            <p className="mt-2 text-sm text-soil-100">
              Connect any storefront with a few lines. OAuth 2.0, scoped tokens,
              webhooks for new orders and reviews.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl bg-black/40 p-4 text-xs leading-relaxed text-sprout-200">
{`POST https://thefarm.com/oauth/token
{
  "grant_type": "authorization_code",
  "client_id": "your_brand_id",
  "code": "…",
  "redirect_uri": "https://yourstore.com/callback"
}

→ { "access_token": "…", "scope": "posts:write orders:read" }`}
            </pre>
            <p className="mt-3 text-xs text-soil-300">
              Same OAuth foundation powers this app&apos;s own Google &amp;
              GitHub sign-in.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="field-texture">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/illustrations/country-side.svg"
            alt="A peaceful countryside farm landscape"
            className="mx-auto mb-10 w-full max-w-lg"
          />
          <h2 className="text-3xl font-extrabold tracking-tight text-soil-900 sm:text-4xl">
            Ready to put down roots?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-soil-700">
            Join the growers and brands building the most transparent corner of
            the wellness world. Your first post is thirty seconds away.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/login?mode=join" className="btn-primary px-8 py-3 text-base">
              Join TheFarm free
            </Link>
            <Link href="/feed" className="btn-ghost px-8 py-3 text-base">
              Browse the Field first
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
