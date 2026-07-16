import Link from "next/link";
import Logo from "./Logo";

const columns = [
  {
    title: "Platform",
    links: [
      { label: "The Field (Feed)", href: "/feed" },
      { label: "Why TheFarm", href: "/#features" },
      { label: "For Brands", href: "/#brands" },
      { label: "Join free", href: "/login?mode=join" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/about#careers" },
      { label: "Press", href: "/about#press" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/legal/terms" },
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Cookie Policy", href: "/legal/cookies" },
      { label: "Wellness Disclaimer", href: "/legal/disclaimer" },
    ],
  },
];

export default function Footer() {
  const year = 2026;
  return (
    <footer className="mt-16 border-t border-soil-100 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-soil-600">
              The social network where wellness takes root. Grown for
              regenerative farmers and the alternative health brands they
              supply.
            </p>
            <div className="mt-4 flex gap-3 text-lg" aria-hidden>
              <span title="Instagram">📷</span>
              <span title="YouTube">▶️</span>
              <span title="Newsletter">✉️</span>
              <span title="Podcast">🎙️</span>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-soil-500">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {col.links.map((link) => (
                  <li key={link.href + link.label}>
                    <Link href={link.href} className="text-soil-700 hover:text-sprout-700">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Health disclosure — critical for an alternative-health platform */}
        <div className="mt-10 rounded-xl border border-harvest-400/40 bg-harvest-400/10 p-4 text-xs leading-relaxed text-soil-700">
          <strong className="font-semibold text-soil-900">Health disclosure:</strong>{" "}
          Content on TheFarm is shared by independent brands and community
          members for informational purposes only. Statements about products
          have not been evaluated by the Food and Drug Administration. Nothing
          on this platform is intended to diagnose, treat, cure, or prevent any
          disease, and it is not a substitute for advice from a qualified
          healthcare provider. Always consult your physician before starting any
          supplement, herbal, or wellness regimen. See our{" "}
          <Link href="/legal/disclaimer" className="link">
            full Wellness Disclaimer
          </Link>
          .
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-soil-100 pt-6 text-xs text-soil-500 sm:flex-row sm:items-center">
          <p>© {year} TheFarm.com, Inc. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/legal/terms" className="hover:text-sprout-700">Terms</Link>
            <Link href="/legal/privacy" className="hover:text-sprout-700">Privacy</Link>
            <Link href="/legal/cookies" className="hover:text-sprout-700">Cookies</Link>
            <Link href="/legal/disclaimer" className="hover:text-sprout-700">Disclaimer</Link>
            <span>Made with 🌾 for growers everywhere</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
