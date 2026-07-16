import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Feed from "@/components/Feed";
import { listPosts, trendingTags } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "The Field",
  description: "The TheFarm feed — fresh posts from growers and wellness brands.",
};

export default function FeedPage() {
  const initialPosts = listPosts();
  const trending = trendingTags();

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Feed initialPosts={initialPosts} trending={trending} />
      </main>
      <Footer />
    </div>
  );
}
