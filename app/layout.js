import "./globals.css";
import Providers from "./providers";
import ParallaxBackground from "@/components/ParallaxBackground";

export const metadata = {
  metadataBase: new URL("https://thefarm.com"),
  title: {
    default: "TheFarm.com — Where Wellness Takes Root",
    template: "%s · TheFarm.com",
  },
  description:
    "TheFarm is the social network for regenerative agriculture and alternative health brands. Share your harvest, grow your community, and sell with transparency.",
  keywords: [
    "regenerative agriculture",
    "alternative health",
    "wellness brands",
    "adaptogens",
    "herbalism",
    "clean sourcing",
    "social network",
  ],
  openGraph: {
    title: "TheFarm.com — Where Wellness Takes Root",
    description:
      "The social network for regenerative agriculture & alternative health brands.",
    type: "website",
    siteName: "TheFarm.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "TheFarm.com — Where Wellness Takes Root",
    description:
      "The social network for regenerative agriculture & alternative health brands.",
  },
};

export const viewport = {
  themeColor: "#457d27",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ParallaxBackground />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
