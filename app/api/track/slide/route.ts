import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, slideId, timeSpentSeconds } = body;

    if (!sessionId || slideId === undefined) {
      return NextResponse.json({ error: "missing fields" }, { status: 400 });
    }

    const sessionRef = db.collection("sessions").doc(sessionId);

    await sessionRef.update({
      [`slideTimings.slide_${slideId}`]: timeSpentSeconds,
      lastSlide: slideId,
      lastActiveAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("slide track error", err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
