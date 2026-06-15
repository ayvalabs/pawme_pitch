"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { deckSlides } from "@/components/DeckSlides";

const TOTAL = deckSlides.length;

export default function PitchDeck() {
  const [i, setI] = useState(0);
  const [scale, setScale] = useState(1);
  const [started, setStarted] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [rotate, setRotate] = useState(false);
  const enter = useRef(0);
  const cur = useRef(0);
  const touch = useRef<number | null>(null);

  // Start session (geo + shareId attribution handled server-side)
  useEffect(() => {
    (async () => {
      try {
        const stored = sessionStorage.getItem("openpaw_session_id");
        const params = new URLSearchParams(window.location.search);
        const shareId = params.get("s") || params.get("to") || undefined;
        const res = await fetch("/api/track/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId: stored || undefined, referrer: document.referrer, shareId }),
        });
        const data = await res.json();
        if (data.sessionId) {
          sessionStorage.setItem("openpaw_session_id", data.sessionId);
          setSessionId(data.sessionId);
        }
      } catch {
        // tracking is best-effort; never block the deck
      }
    })();
  }, []);

  // Scale the fixed 1280×720 stage to fit the viewport + detect portrait phones
  useEffect(() => {
    const fit = () => {
      setScale(Math.min(window.innerWidth / 1280, window.innerHeight / 720));
      setRotate(window.innerWidth < window.innerHeight && window.innerWidth < 820);
    };
    fit();
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    return () => {
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
    };
  }, []);

  // fire-and-forget — tracking never blocks navigation
  const trackSlide = useCallback((slideId: number, secs: number) => {
    if (!sessionId) return;
    fetch("/api/track/slide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, slideId, timeSpentSeconds: secs }),
    }).catch(() => {});
  }, [sessionId]);

  const go = useCallback((d: number) => {
    setI((p) => Math.min(TOTAL - 1, Math.max(0, p + d)));
  }, []);

  // Log time on the slide you just left + completion on the last slide
  useEffect(() => {
    const now = Date.now();
    if (enter.current) trackSlide(cur.current + 1, Math.round((now - enter.current) / 1000));
    enter.current = now;
    cur.current = i;
    if (i === TOTAL - 1 && sessionId) {
      fetch("/api/track/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      }).catch(() => {});
    }
  }, [i, trackSlide, sessionId]);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", " ", "PageDown"].includes(e.key)) { e.preventDefault(); go(1); }
      else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(e.key)) { e.preventDefault(); go(-1); }
      else if (e.key === "Home") setI(0);
      else if (e.key === "End") setI(TOTAL - 1);
      else if (e.key === "f") document.documentElement.requestFullscreen?.();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  // Flush dwell time when the tab is hidden / closed
  useEffect(() => {
    const flush = () => {
      if (enter.current) {
        trackSlide(cur.current + 1, Math.round((Date.now() - enter.current) / 1000));
        enter.current = Date.now();
      }
    };
    const onVis = () => { if (document.visibilityState === "hidden") flush(); };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("beforeunload", flush);
    return () => {
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("beforeunload", flush);
    };
  }, [trackSlide]);

  const rotateOverlay = rotate ? (
    <div className="deckroot" style={{ position: "fixed", inset: 0, zIndex: 200, background: "#241A15", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 36px" }}>
      <div style={{ fontSize: 60, lineHeight: 1 }}>📱</div>
      <div style={{ color: "#F47B5A", fontSize: 30, marginTop: 8 }}>↻</div>
      <div style={{ fontFamily: "var(--head)", fontWeight: 700, color: "#fff", fontSize: 25, marginTop: 14 }}>Rotate your phone</div>
      <div style={{ color: "#C9B8AC", fontSize: 15, marginTop: 10, maxWidth: 300, lineHeight: 1.5 }}>
        This pitch deck is best viewed in <b style={{ color: "#fff" }}>landscape</b> — turn your device sideways.
      </div>
    </div>
  ) : null;

  if (!started) {
    return (
      <div className="deckroot deck" style={{ background: "#241A15" }}>
        {rotateOverlay}
        <div style={{ textAlign: "center" }}>
          <img src="/img/paw.png" alt="PawMe" style={{ width: 84, height: 84, margin: "0 auto 18px" }} />
          <div style={{ fontFamily: "var(--head)", fontWeight: 700, color: "#fff", fontSize: 44 }}>PawMe</div>
          <div style={{ color: "#C9B8AC", marginTop: 6, fontSize: 16 }}>Seed deck · 2026</div>
          <button
            onClick={() => {
              setStarted(true);
              enter.current = Date.now();
              document.documentElement.requestFullscreen?.().catch(() => {});
            }}
            style={{ marginTop: 28, background: "#F47B5A", color: "#fff", border: "none", borderRadius: 999, padding: "14px 34px", fontSize: 17, fontWeight: 700, cursor: "pointer", fontFamily: "var(--head)" }}
          >
            View pitch deck
          </button>
          <div style={{ color: "#8C7C70", marginTop: 18, fontSize: 13 }}>Arrow keys, click the sides, or swipe</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="deckroot deck"
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return;
        const d = touch.current - e.changedTouches[0].clientX;
        if (Math.abs(d) > 50) go(d > 0 ? 1 : -1);
        touch.current = null;
      }}
    >
      {rotateOverlay}
      <div className="progress" style={{ width: `${((i + 1) / TOTAL) * 100}%` }} />
      <div className="nav-zone left" onClick={() => go(-1)} />
      <div className="nav-zone right" onClick={() => go(1)} />
      <div className="stage" style={{ transform: `scale(${scale})` }}>{deckSlides[i]}</div>
      <div className="hud">
        <button onClick={() => go(-1)}>‹ Prev</button>
        <span><b>{i + 1}</b> / {TOTAL}</span>
        <button onClick={() => go(1)}>Next ›</button>
        <button onClick={() => document.documentElement.requestFullscreen?.()}>⤢ Full</button>
      </div>
    </div>
  );
}
