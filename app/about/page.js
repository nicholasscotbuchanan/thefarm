import PageShell from "@/components/PageShell";

export const metadata = {
  title: "About",
  description: "Why we're building TheFarm — the social network where wellness takes root.",
};

export default function AboutPage() {
  return (
    <PageShell
      title="About TheFarm"
      subtitle="The social network where wellness takes root."
    >
      <p>
        TheFarm started with a simple frustration: the healthiest, most
        transparent brands were fighting to be heard on platforms designed to
        reward outrage. We thought the growers regenerating our soil and the
        makers turning their harvests into honest products deserved a better
        place to gather.
      </p>
      <p>
        So we built one. TheFarm is a Twitter-style feed re-rooted for
        regenerative agriculture and alternative health. No engagement-bait
        algorithm, no dark patterns — just a calm feed where provenance and proof
        travel further than hype.
      </p>

      <h2>What we believe</h2>
      <ul>
        <li>
          <strong>Transparency is a feature.</strong> Lab results, source maps,
          and honest process notes belong front and center.
        </li>
        <li>
          <strong>Slower is healthier.</strong> We optimize for trust, not
          time-on-site.
        </li>
        <li>
          <strong>Community over competition.</strong> Growers, formulators, and
          brands do better in the same field.
        </li>
      </ul>

      <h2 id="careers">Careers</h2>
      <p>
        We&apos;re a small, remote-first team of engineers, herbalists, and
        farmers. If you want to help grow a healthier internet, write to{" "}
        <a href="mailto:careers@thefarm.com">
          careers@thefarm.com
        </a>
        .
      </p>

      <h2 id="press">Press</h2>
      <p>
        For media inquiries, reach{" "}
        <a href="mailto:press@thefarm.com">press@thefarm.com</a>.
        Brand assets available on request.
      </p>
    </PageShell>
  );
}
