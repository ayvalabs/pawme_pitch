import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, referrer } = body;

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const userAgent = req.headers.get("user-agent") || "unknown";
    const sid = sessionId || uuidv4();

    let geoData: Record<string, string> = {};
    try {
      const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
      if (geoRes.ok) {
        const geo = await geoRes.json();
        geoData = {
          city: geo.city || "",
          region: geo.region || "",
          country: geo.country_name || "",
          countryCode: geo.country_code || "",
          org: geo.org || "",
        };
      }
    } catch {
      // geo lookup is best-effort
    }

    const sessionRef = db.collection("sessions").doc(sid);
    const existing = await sessionRef.get();

    if (!existing.exists) {
      await sessionRef.set({
        sessionId: sid,
        startedAt: new Date().toISOString(),
        ip,
        userAgent,
        referrer: referrer || "",
        geo: geoData,
        slideTimings: {},
        completed: false,
        lastSlide: 0,
      });
    }

    return NextResponse.json({ sessionId: sid });
  } catch (err) {
    console.error("session track error", err);
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
