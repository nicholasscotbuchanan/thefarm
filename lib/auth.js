import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";

/**
 * OAuth provider registry.
 *
 * Each entry turns on automatically the moment its client id/secret env vars
 * are present — locally or on Vercel. The list is ordered the way it should
 * appear on the login screen: the mainstream consumer options first, with
 * GitHub last as a developer convenience.
 *
 * To add another provider (Microsoft, Twitter/X, Discord, LinkedIn, …):
 *   1. `import XProvider from "next-auth/providers/x"`
 *   2. add a row here with its env var names
 *   3. add a matching button entry in components/LoginForm.js
 */
const OAUTH_PROVIDERS = [
  {
    id: "google",
    Provider: GoogleProvider,
    idEnv: "GOOGLE_CLIENT_ID",
    secretEnv: "GOOGLE_CLIENT_SECRET",
  },
  {
    id: "apple",
    Provider: AppleProvider,
    idEnv: "APPLE_CLIENT_ID",
    secretEnv: "APPLE_CLIENT_SECRET",
  },
  {
    id: "facebook",
    Provider: FacebookProvider,
    idEnv: "FACEBOOK_CLIENT_ID",
    secretEnv: "FACEBOOK_CLIENT_SECRET",
  },
  {
    id: "github",
    Provider: GitHubProvider,
    idEnv: "GITHUB_CLIENT_ID",
    secretEnv: "GITHUB_CLIENT_SECRET",
  },
];

function providerEnabled(p) {
  return Boolean(process.env[p.idEnv] && process.env[p.secretEnv]);
}

/**
 * Build the list of enabled auth providers.
 *
 * - Email/password (Credentials) is ALWAYS on so the app is turnkey with zero
 *   configuration and works on Vercel out of the box.
 * - Every OAuth provider above switches on automatically when configured.
 */
function buildProviders() {
  const providers = [
    CredentialsProvider({
      id: "email",
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@farm.co" },
        password: { label: "Password", type: "password" },
      },
      // Demo-friendly authorize: any valid-looking email + a 6+ char password
      // signs you in. In a real deployment you'd verify the password hash
      // against your user store here.
      async authorize(credentials) {
        const email = (credentials?.email || "").trim().toLowerCase();
        const password = credentials?.password || "";
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        if (!emailOk || password.length < 6) return null;

        const handle = email.split("@")[0].replace(/[^a-z0-9_]/g, "");
        const name =
          handle
            .replace(/[._-]+/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())
            .trim() || "Grower";

        return {
          id: `email:${email}`,
          email,
          name,
          image: null,
          handle,
        };
      },
    }),
  ];

  for (const p of OAUTH_PROVIDERS) {
    if (providerEnabled(p)) {
      providers.push(
        p.Provider({
          clientId: process.env[p.idEnv],
          clientSecret: process.env[p.secretEnv],
        })
      );
    }
  }

  return providers;
}

// Which social buttons the login screen should render.
export const oauthEnabled = Object.fromEntries(
  OAUTH_PROVIDERS.map((p) => [p.id, providerEnabled(p)])
);

export const authOptions = {
  providers: buildProviders(),
  // Dev fallback so the app boots without any config. Set a real
  // NEXTAUTH_SECRET in production (see .env.local.example).
  secret:
    process.env.NEXTAUTH_SECRET ||
    "thefarm-dev-secret-do-not-use-in-production-0000",
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.handle =
          user.handle || (user.email ? user.email.split("@")[0] : "grower");
        token.picture = user.image || token.picture || null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.handle = token.handle || "grower";
        session.user.image = token.picture || session.user.image || null;
      }
      return session;
    },
  },
};
