"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { slides, TOTAL_SLIDES } from "@/lib/slides";
import SlideRenderer from "@/components/SlideRenderer";
import ContactSlide from "@/components/ContactSlide";

export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showEnterPrompt, setShowEnterPrompt] = useState(true);
  const [transitioning, setTransitioning] = useState(false);

  const slideStartTime = useRef<number>(Date.now());
  const containerRef = useRef<HTMLDivElement>(null);

  // Start session on mount
  useEffect(() => {
    const initSession = async () => {
      const stored = sessionStorage.getItem("pawme_session_id");
      const params = new URLSearchParams(window.location.search);
      const shareId = params.get("s") || params.get("to") || undefined;
      const res = await fetch("/api/track/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: stored || undefined,
          referrer: document.referrer,
          shareId,
        }),
      });
      const data = await res.json();
      if (data.sessionId) {
        sessionStorage.setItem("pawme_session_id", data.sessionId);
        setSessionId(data.sessionId);
      }
    };
    initSession();
  }, []);

  const trackSlide = useCallback(
    async (slideId: number, timeSpentSeconds: number) => {
      if (!sessionId) return;
      await fetch("/api/track/slide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, slideId, timeSpentSeconds }),
      });
    },
    [sessionId]
  );

  const goToSlide = useCallback(
    async (index: number) => {
      if (transitioning) return;
      const elapsed = (Date.now() - slideStartTime.current) / 1000;
      await trackSlide(currentSlide + 1, Math.round(elapsed));

      if (index >= TOTAL_SLIDES) {
        // mark complete
        if (sessionId) {
          await fetch("/api/track/complete", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ sessionId }),
          });
        }
        return;
      }

      setTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        slideStartTime.current = Date.now();
        setTransitioning(false);
      }, 300);
    },
    [currentSlide, transitioning, trackSlide, sessionId]
  );

  const next = useCallback(() => {
    if (currentSlide < TOTAL_SLIDES - 1) goToSlide(currentSlide + 1);
  }, [currentSlide, goToSlide]);

  const prev = useCallback(() => {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
  }, [currentSlide, goToSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "Escape") {
        setShowEnterPrompt(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  // Touch / swipe
  const touchStart = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStart.current = null;
  };

  const enterFullscreen = async () => {
    try {
      await containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } catch {
      setIsFullscreen(true);
    }
    setShowEnterPrompt(false);
    slideStartTime.current = Date.now();
  };

  useEffect(() => {
    const onFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", onFSChange);
    return () => document.removeEventListener("fullscreenchange", onFSChange);
  }, []);

  const slide = slides[currentSlide];
  const isLastSlide = currentSlide === TOTAL_SLIDES - 1;
  const progress = ((currentSlide + 1) / TOTAL_SLIDES) * 100;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#0a0a14] overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Enter fullscreen overlay */}
      {showEnterPrompt && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a14]">
          <div className="text-center px-8">
            <div className="mb-6 text-6xl">🐾</div>
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
              PawMe
            </h1>
            <p className="text-slate-400 text-lg mb-10">
              Seed Funding Deck 2026
            </p>
            <button
              onClick={enterFullscreen}
              className="bg-amber-500 hover:bg-amber-400 text-black font-semibold px-10 py-4 rounded-full text-lg transition-all duration-200 shadow-lg shadow-amber-500/30 hover:shadow-amber-400/40 hover:scale-105"
            >
              View Pitch Deck
            </button>
            <p className="text-slate-600 text-sm mt-6">
              Use arrow keys or click to navigate
            </p>
          </div>
        </div>
      )}

      {/* Slide content */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          transitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {isLastSlide ? (
          <ContactSlide slide={slide} />
        ) : (
          <SlideRenderer slide={slide} slideIndex={currentSlide} />
        )}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-40">
        <div
          className="h-full bg-amber-500 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goToSlide(i)}
            className={`transition-all duration-200 rounded-full ${
              i === currentSlide
                ? "w-6 h-2 bg-amber-500"
                : "w-2 h-2 bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>

      {/* Nav arrows */}
      {!showEnterPrompt && (
        <>
          <button
            onClick={prev}
            disabled={currentSlide === 0}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all disabled:opacity-0 text-white text-xl"
          >
            ‹
          </button>
          <button
            onClick={next}
            disabled={currentSlide === TOTAL_SLIDES - 1}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-40 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all disabled:opacity-0 text-white text-xl"
          >
            ›
          </button>
        </>
      )}

      {/* Slide number top-right */}
      {!showEnterPrompt && (
        <div className="absolute top-4 right-6 z-40 text-white/40 text-sm font-mono">
          {currentSlide + 1} / {TOTAL_SLIDES}
        </div>
      )}
    </div>
  );
}
