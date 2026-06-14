import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

function slug(s: string) {
  return (
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 24) ||
    "link"
  );
}

export async function POST(req: NextRequest) {
  try {
    const { label, key } = (await req.json()) as { label?: string; key?: string };
    if (process.env.ADMIN_KEY && key !== process.env.ADMIN_KEY) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const id = `${slug(label || "link")}-${crypto.randomUUID().slice(0, 4)}`;
    await db.collection("links").doc(id).set({
      id,
      label: label || "",
      createdAt: new Date().toISOString(),
      opens: 0,
    });
    return NextResponse.json({ id });
  } catch (err) {
    console.error("share create error", err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
