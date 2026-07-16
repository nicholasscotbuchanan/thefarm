import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { listPosts, createPost } from "@/lib/data";

// In-memory store — never cache these responses.
export const dynamic = "force-dynamic";

export async function GET() {
  const posts = listPosts();
  return NextResponse.json({ posts });
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { error: "You need to be signed in to plant a post." },
      { status: 401 }
    );
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    const post = createPost({
      authorHandle: session.user.handle,
      authorName: session.user.name,
      body: payload?.body,
      media: payload?.media,
    });
    return NextResponse.json({ post }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
