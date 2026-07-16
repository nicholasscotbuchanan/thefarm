import PageShell from "@/components/PageShell";

export const metadata = {
  title: "Cookie Policy",
  description: "How and why TheFarm uses cookies.",
};

export default function CookiesPage() {
  return (
    <PageShell
      title="Cookie Policy"
      subtitle="The small files that keep you signed in and the site running."
      updated="July 1, 2026"
    >
      <p>
        This Cookie Policy explains how TheFarm.com, Inc. uses cookies and
        similar technologies. For more on how we handle personal data, see our{" "}
        <a href="/legal/privacy">Privacy Policy</a>.
      </p>

      <h2>1. What are cookies?</h2>
      <p>
        Cookies are small text files stored on your device when you visit a
        website. They help the site remember your actions and preferences over
        time.
      </p>

      <h2>2. How we use cookies</h2>
      <ul>
        <li>
          <strong>Strictly necessary:</strong> authentication and session cookies
          keep you securely signed in. The Services cannot function without these.
        </li>
        <li>
          <strong>Preferences:</strong> remember choices such as your display
          settings.
        </li>
        <li>
          <strong>Analytics:</strong> help us understand aggregate usage so we can
          improve the Field. These are optional and only set with your consent
          where required.
        </li>
      </ul>

      <h2>3. Third-party cookies</h2>
      <p>
        If you sign in using a provider such as Google or GitHub, that provider
        may set its own cookies as part of the OAuth flow, governed by their
        respective policies.
      </p>

      <h2>4. Managing cookies</h2>
      <p>
        Most browsers let you refuse or delete cookies through their settings.
        Blocking strictly necessary cookies may prevent you from signing in or
        using core features. Where we use optional cookies, you can withdraw
        consent at any time.
      </p>

      <h2>5. Changes</h2>
      <p>
        We may update this Cookie Policy periodically. The date above reflects the
        latest revision.
      </p>

      <h2>6. Contact</h2>
      <p>
        Questions about cookies? Email{" "}
        <a href="mailto:privacy@thefarm.com">
          privacy@thefarm.com
        </a>
        .
      </p>
    </PageShell>
  );
}
