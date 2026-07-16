import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Privacy Policy",
  description: "How TheFarm collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      subtitle="How we collect, use, and protect your information."
      updated="July 1, 2026"
    >
      <p>
        This Privacy Policy explains how TheFarm.com, Inc.
        (&ldquo;TheFarm&rdquo;) collects, uses, and shares information when you
        use our website, apps, and APIs (the &ldquo;Services&rdquo;). We&apos;ve
        tried to keep it readable — like everything we grow.
      </p>

      <h2>1. Information we collect</h2>
      <h3>Information you provide</h3>
      <ul>
        <li>
          <strong>Account data:</strong> your email address and, if you sign in
          with a third-party provider, the basic profile details that provider
          shares (name, avatar).
        </li>
        <li>
          <strong>Content:</strong> the posts, comments, and profile information
          you submit.
        </li>
        <li>
          <strong>Communications:</strong> messages you send to our support team.
        </li>
      </ul>
      <h3>Information collected automatically</h3>
      <ul>
        <li>
          <strong>Usage data:</strong> pages viewed, posts watered, and general
          interactions, used to operate and improve the Services.
        </li>
        <li>
          <strong>Device &amp; log data:</strong> IP address, browser type, and
          timestamps.
        </li>
        <li>
          <strong>Cookies:</strong> see our{" "}
          <a href="/legal/cookies">Cookie Policy</a> for details.
        </li>
      </ul>

      <h2>2. How we use information</h2>
      <ul>
        <li>To provide, maintain, and secure the Services;</li>
        <li>To authenticate you and keep your account safe;</li>
        <li>To personalize your feed and suggest brands to follow;</li>
        <li>To communicate with you about updates and support;</li>
        <li>To detect, prevent, and address abuse or violations of our Terms;</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2>3. Legal bases (EEA/UK users)</h2>
      <p>
        Where the GDPR applies, we process your data on the bases of performance
        of a contract (providing the Services), our legitimate interests
        (securing and improving the Services), your consent (for optional cookies
        and marketing), and legal obligation.
      </p>

      <h2>4. How we share information</h2>
      <p>We do not sell your personal information. We share it only:</p>
      <ul>
        <li>
          <strong>Publicly:</strong> content you post is visible to others by
          design.
        </li>
        <li>
          <strong>With service providers</strong> who host and support the
          Services under confidentiality obligations;
        </li>
        <li>
          <strong>With integrations you authorize</strong> via OAuth, limited to
          the scopes you approve;
        </li>
        <li>
          <strong>For legal reasons,</strong> if required by law or to protect
          rights and safety.
        </li>
      </ul>

      <h2>5. Data retention</h2>
      <p>
        We retain your information for as long as your account is active or as
        needed to provide the Services, resolve disputes, and comply with legal
        obligations. You can delete your account at any time (see below).
      </p>

      <h2>6. Your rights &amp; choices</h2>
      <p>
        Depending on where you live, you may have the right to access, correct,
        export, or delete your personal data, and to object to or restrict certain
        processing. California residents have rights under the CCPA/CPRA,
        including the right to know and delete, and the right not to be
        discriminated against for exercising them. To exercise any right, email{" "}
        <a href="mailto:privacy@thefarm.com">
          privacy@thefarm.com
        </a>
        .
      </p>

      <h2>7. Security</h2>
      <p>
        We use industry-standard measures to protect your information, including
        encrypted connections and hashed session tokens. No system is perfectly
        secure, so we cannot guarantee absolute security.
      </p>

      <h2>8. Children&apos;s privacy</h2>
      <p>
        TheFarm is not directed to children under 16, and we do not knowingly
        collect their personal information.
      </p>

      <h2>9. International transfers</h2>
      <p>
        We may process and store information in countries other than your own.
        Where required, we use appropriate safeguards for such transfers.
      </p>

      <h2>10. Changes to this policy</h2>
      <p>
        We may update this policy from time to time and will post the new version
        here with an updated date.
      </p>

      <h2>11. Contact us</h2>
      <p>
        Questions or requests? Email{" "}
        <a href="mailto:privacy@thefarm.com">
          privacy@thefarm.com
        </a>{" "}
        or write to TheFarm.com, Inc., Attn: Privacy, 100 Meadow Lane,
        Ithaca, NY 14850.
      </p>
    </PageShell>
  );
}
