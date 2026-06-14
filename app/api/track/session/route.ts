import { NextRequest, NextResponse } from "next/server";
import admin, { db } from "@/lib/firebase-admin";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, referrer, shareId } = body as {
      sessionId?: string;
      referrer?: string;
      shareId?: string;
    };

    const h = req.headers;
    const ip =
      h.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      h.get("x-real-ip") ||
      "unknown";
    const userAgent = h.get("user-agent") || "unknown";
    const sid = sessionId || uuidv4();

    // Geo: prefer Vercel edge headers (free + reliable), fall back to ipapi.co.
    let geoData: Record<string, string> = {};
    const vCountry = h.get("x-vercel-ip-country");
    if (vCountry) {
      geoData = {
        city: decodeURIComponent(h.get("x-vercel-ip-city") || ""),
        region: h.get("x-vercel-ip-country-region") || "",
        country: vCountry,
        countryCode: vCountry,
        latitude: h.get("x-vercel-ip-latitude") || "",
        longitude: h.get("x-vercel-ip-longitude") || "",
        org: "",
      };
    } else {
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
        // best-effort
      }
    }

    // Resolve the share link this visitor came from, and count the open.
    let shareLabel = "";
    if (shareId) {
      try {
        const linkRef = db.collection("links").doc(String(shareId));
        const linkSnap = await linkRef.get();
        if (linkSnap.exists) {
          shareLabel = (linkSnap.data()?.label as string) || "";
          await linkRef.update({
            opens: admin.firestore.FieldValue.increment(1),
            lastOpenedAt: new Date().toISOString(),
          });
        }
      } catch {
        // ignore
      }
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
        shareId: shareId || "",
        shareLabel,
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
