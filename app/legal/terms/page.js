import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of TheFarm.",
};

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      subtitle="The agreement between you and TheFarm.com, Inc."
      updated="July 1, 2026"
    >
      <p>
        Welcome to TheFarm. These Terms of Service (&ldquo;Terms&rdquo;) govern
        your access to and use of the TheFarm website, apps, and APIs
        (collectively, the &ldquo;Services&rdquo;), operated by TheFarm.com, Inc. (&ldquo;TheFarm,&rdquo; &ldquo;we,&rdquo;
        &ldquo;us&rdquo;). By creating an account or using the Services, you agree
        to these Terms.
      </p>

      <h2>1. Eligibility</h2>
      <p>
        You must be at least 16 years old (or the age of digital consent in your
        jurisdiction) to use TheFarm. By using the Services you represent that
        you meet this requirement and that the information you provide is accurate.
      </p>

      <h2>2. Your account</h2>
      <p>
        You are responsible for safeguarding your login credentials and for all
        activity under your account. Notify us promptly of any unauthorized use.
        You may sign in using email or a supported third-party provider (such as
        Google or GitHub) via OAuth; your use of those providers is also subject
        to their terms.
      </p>

      <h2>3. Content you post</h2>
      <p>
        You retain ownership of the content you post (&ldquo;User Content&rdquo;).
        By posting, you grant TheFarm a worldwide, non-exclusive, royalty-free
        license to host, display, reproduce, and distribute your User Content for
        the purpose of operating and promoting the Services. You represent that
        you have the rights necessary to grant this license.
      </p>

      <h2>4. Acceptable use &amp; health claims</h2>
      <p>You agree not to use the Services to:</p>
      <ul>
        <li>Post unlawful, deceptive, harassing, or infringing content;</li>
        <li>
          Make health, medical, or disease-treatment claims that are false,
          misleading, or that violate applicable law (including FDA and FTC
          regulations governing dietary supplements and health products);
        </li>
        <li>Sell prohibited, recalled, or unsafe products;</li>
        <li>Impersonate others or misrepresent your affiliation with a brand;</li>
        <li>Scrape, overload, or interfere with the Services or our APIs.</li>
      </ul>
      <p>
        Brands are responsible for ensuring their claims and labeling comply with
        all applicable regulations. See our{" "}
        <a href="/legal/disclaimer">Wellness Disclaimer</a> for important health
        disclosures.
      </p>

      <h2>5. Moderation</h2>
      <p>
        We may review, remove, or restrict content or accounts that violate these
        Terms or that we reasonably believe pose a risk to the community, at our
        discretion and without prior notice.
      </p>

      <h2>6. Brand &amp; API integrations</h2>
      <p>
        If you connect an application or storefront to TheFarm via our OAuth
        API, you agree to use scoped access responsibly, to honor the permissions
        granted by users, and to comply with our developer documentation and rate
        limits. We may suspend API access that is abused.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        The Services, including our name, logo, and design, are owned by TheFarm
        and protected by intellectual-property laws. These Terms do not grant you
        any right to use our trademarks without our prior written permission.
      </p>

      <h2>8. Disclaimers</h2>
      <p>
        The Services are provided &ldquo;as is&rdquo; without warranties of any
        kind. TheFarm does not endorse or guarantee any User Content or product.
        Your use of health-related information is subject to our{" "}
        <a href="/legal/disclaimer">Wellness Disclaimer</a>.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, TheFarm will not be liable for
        any indirect, incidental, special, consequential, or punitive damages, or
        any loss of profits or revenues, arising from your use of the Services.
      </p>

      <h2>10. Termination</h2>
      <p>
        You may stop using the Services at any time. We may suspend or terminate
        your access if you breach these Terms or to protect the community.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update these Terms from time to time. If we make material changes,
        we will notify you through the Services. Continued use after changes take
        effect constitutes acceptance.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about these Terms? Email{" "}
        <a href="mailto:legal@thefarm.com">legal@thefarm.com</a>.
      </p>
    </PageShell>
  );
}
