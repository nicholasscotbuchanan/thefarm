import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { waterPost } from "@/lib/data";

export const dynamic = "force-dynamic";

// "Watering" a post is TheFarm's version of a like 💧
export async function POST(_request, { params }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json(
      { error: "Sign in to water a post." },
      { status: 401 }
    );
  }

  try {
    const post = waterPost(params.id);
    return NextResponse.json({ post });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 404 });
  }
}
