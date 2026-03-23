"use client";

import { Slide } from "@/lib/slides";

interface Props {
  slide: Slide;
  slideIndex: number;
}

const slideThemes = [
  // 0: Cover
  {
    bg: "bg-gradient-to-br from-[#0a0a14] via-[#0f1629] to-[#0a0a14]",
    accent: "text-amber-400",
    titleSize: "text-7xl",
    center: true,
  },
  // 1: Problem
  {
    bg: "bg-gradient-to-br from-[#1a0a0a] via-[#200d0d] to-[#0a0a14]",
    accent: "text-red-400",
    titleSize: "text-5xl",
    center: false,
  },
  // 2: Solution
  {
    bg: "bg-gradient-to-br from-[#0a1420] via-[#0d1f2d] to-[#0a0a14]",
    accent: "text-cyan-400",
    titleSize: "text-5xl",
    center: true,
  },
  // 3: Front View
  {
    bg: "bg-gradient-to-br from-[#0a1420] via-[#0d1f2d] to-[#0a0a14]",
    accent: "text-cyan-400",
    titleSize: "text-5xl",
    center: true,
  },
  // 4: Mobility
  {
    bg: "bg-gradient-to-br from-[#0a1420] via-[#0d2020] to-[#0a0a14]",
    accent: "text-teal-400",
    titleSize: "text-5xl",
    center: false,
  },
  // 5: Docking
  {
    bg: "bg-gradient-to-br from-[#0a1420] via-[#0d2020] to-[#0a0a14]",
    accent: "text-teal-400",
    titleSize: "text-5xl",
    center: true,
  },
  // 6: Market
  {
    bg: "bg-gradient-to-br from-[#0a0a1a] via-[#0d0d2a] to-[#0a0a14]",
    accent: "text-violet-400",
    titleSize: "text-5xl",
    center: true,
  },
  // 7: Traction
  {
    bg: "bg-gradient-to-br from-[#0a140a] via-[#0d200d] to-[#0a0a14]",
    accent: "text-emerald-400",
    titleSize: "text-5xl",
    center: false,
  },
  // 8: How it works
  {
    bg: "bg-gradient-to-br from-[#0a1420] via-[#0d1f2d] to-[#0a0a14]",
    accent: "text-sky-400",
    titleSize: "text-5xl",
    center: false,
  },
  // 9: Business Model
  {
    bg: "bg-gradient-to-br from-[#14100a] via-[#201508] to-[#0a0a14]",
    accent: "text-amber-400",
    titleSize: "text-5xl",
    center: false,
  },
  // 10: Ask
  {
    bg: "bg-gradient-to-br from-[#0a0a14] via-[#14102a] to-[#0a0a14]",
    accent: "text-amber-400",
    titleSize: "text-6xl",
    center: true,
  },
];

function parseContent(content: string) {
  const lines = content.split("\n");
  return lines;
}

const slideVisuals: Record<number, React.ReactNode> = {
  0: (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative">
        <div className="w-40 h-40 rounded-3xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center shadow-2xl shadow-amber-500/20">
          <span className="text-7xl">🐾</span>
        </div>
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-amber-400/40 animate-ping" />
        <div className="absolute -bottom-2 -left-2 w-5 h-5 rounded-full bg-amber-400/30 animate-pulse" />
      </div>
    </div>
  ),
  1: (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-52 h-52">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-900/40 to-red-950/20 border border-red-800/30 flex items-center justify-center">
          <span className="text-8xl">😢</span>
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {["🐕", "🐈", "🐇"].map((e, i) => (
            <span key={i} className="text-2xl opacity-60">{e}</span>
          ))}
        </div>
      </div>
    </div>
  ),
  2: (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative">
        <div className="w-44 h-44 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-600/10 border-2 border-cyan-400/40 flex items-center justify-center shadow-2xl shadow-cyan-500/20">
          <span className="text-7xl">🤖</span>
        </div>
        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-cyan-400 animate-pulse" />
        <div className="absolute bottom-4 left-0 text-2xl animate-bounce">🐾</div>
      </div>
    </div>
  ),
  3: (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-48 h-56 rounded-3xl bg-gradient-to-b from-slate-700/60 to-slate-900/60 border border-slate-600/40 flex flex-col items-center justify-center gap-4 shadow-xl">
        <div className="flex gap-6">
          <div className="w-14 h-14 rounded-full bg-cyan-400/20 border-2 border-cyan-400/60 flex items-center justify-center text-2xl">👁️</div>
          <div className="w-14 h-14 rounded-full bg-cyan-400/20 border-2 border-cyan-400/60 flex items-center justify-center text-2xl">👁️</div>
        </div>
        <div className="w-8 h-2 rounded-full bg-amber-400/60 animate-pulse" />
        <div className="text-slate-400 text-xs font-mono">AI v2.0</div>
      </div>
    </div>
  ),
  4: (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative">
        <div className="w-36 h-36 rounded-2xl bg-gradient-to-b from-slate-700/50 to-slate-900/50 border border-teal-400/30 flex items-center justify-center shadow-xl">
          <span className="text-6xl">🤖</span>
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
          {["↙️","⬇️","↘️"].map((d,i) => (
            <span key={i} className="text-lg animate-bounce" style={{ animationDelay: `${i*0.15}s` }}>{d}</span>
          ))}
        </div>
        <div className="absolute -top-2 -right-8 bg-teal-400/20 border border-teal-400/40 rounded-lg px-2 py-1 text-teal-300 text-xs">360°</div>
      </div>
    </div>
  ),
  5: (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-center gap-3">
        <div className="w-28 h-28 rounded-2xl bg-gradient-to-b from-slate-700/50 to-slate-900/50 border border-teal-400/30 flex items-center justify-center shadow-xl">
          <span className="text-5xl">🤖</span>
        </div>
        <div className="flex items-center gap-1 text-teal-400">
          <span className="text-2xl">⬇️</span>
        </div>
        <div className="w-36 h-10 rounded-xl bg-gradient-to-r from-teal-900/50 to-teal-800/30 border border-teal-400/40 flex items-center justify-center text-teal-300 text-sm font-medium">
          ⚡ Docking Station
        </div>
      </div>
    </div>
  ),
  6: (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col items-end gap-2 w-48">
        {[
          { label: "2024", val: 40, color: "bg-violet-500/60" },
          { label: "2026", val: 58, color: "bg-violet-400/70" },
          { label: "2028", val: 75, color: "bg-violet-300/80" },
          { label: "2030", val: 100, color: "bg-violet-300" },
        ].map((b) => (
          <div key={b.label} className="flex items-center gap-2 w-full">
            <span className="text-white/40 text-xs w-10 text-right">{b.label}</span>
            <div className={`h-7 rounded-r-lg ${b.color} flex items-center px-2 transition-all duration-700`} style={{ width: `${b.val}%` }}>
              <span className="text-white text-xs font-semibold whitespace-nowrap">{b.label === "2030" ? "$68B" : ""}</span>
            </div>
          </div>
        ))}
        <div className="text-violet-400/60 text-xs mt-1 self-end">15% CAGR</div>
      </div>
    </div>
  ),
  7: (
    <div className="flex items-center justify-center w-full h-full">
      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: "🏭", label: "Prototype", sub: "Functional units built" },
          { icon: "🐶", label: "Pet Tested", sub: "Real-world validation" },
          { icon: "📐", label: "3D Printed", sub: "Production-ready design" },
          { icon: "✅", label: "Tested", sub: "Size-optimized" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1 bg-emerald-900/20 border border-emerald-700/30 rounded-xl p-3 w-28">
            <span className="text-3xl">{item.icon}</span>
            <span className="text-emerald-300 text-xs font-semibold">{item.label}</span>
            <span className="text-emerald-500/70 text-xs text-center leading-tight">{item.sub}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  8: (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col gap-3">
        {[
          { n: "01", icon: "🎯", label: "Follows & Plays", color: "border-sky-400/40 bg-sky-900/20" },
          { n: "02", icon: "🏥", label: "AI Health Monitor", color: "border-sky-300/40 bg-sky-800/20" },
          { n: "03", icon: "📱", label: "Instant App Alerts", color: "border-sky-200/40 bg-sky-700/20" },
        ].map((s) => (
          <div key={s.n} className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${s.color}`}>
            <span className="text-sky-500/60 font-mono text-sm">{s.n}</span>
            <span className="text-2xl">{s.icon}</span>
            <span className="text-sky-200 text-sm font-medium">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  ),
  9: (
    <div className="flex items-center justify-center w-full h-full">
      <div className="flex flex-col gap-4 items-center">
        <div className="flex gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-400">$299</div>
            <div className="text-white/50 text-xs mt-1">Entry Unit</div>
          </div>
          <div className="w-px bg-white/10" />
          <div className="text-center">
            <div className="text-4xl font-bold text-amber-300">$399</div>
            <div className="text-white/50 text-xs mt-1">Pro Unit</div>
          </div>
        </div>
        <div className="bg-amber-500/20 border border-amber-400/40 rounded-xl px-6 py-3 text-center">
          <div className="text-amber-300 font-bold text-lg">+ $9.99/mo</div>
          <div className="text-amber-500/70 text-xs">AI Subscription</div>
        </div>
      </div>
    </div>
  ),
  10: (
    <div className="flex items-center justify-center w-full h-full">
      <div className="text-center">
        <div className="text-7xl font-bold text-amber-400 mb-2">$750K</div>
        <div className="text-white/50 text-lg">Seed Round</div>
        <div className="mt-6 flex gap-4 justify-center">
          {["🏭 Production", "📦 First 1,000 Units", "🚀 Launch"].map((item) => (
            <div key={item} className="bg-amber-500/10 border border-amber-400/30 rounded-lg px-3 py-2 text-amber-300 text-xs text-center">
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export default function SlideRenderer({ slide, slideIndex }: Props) {
  const theme = slideThemes[slideIndex] || slideThemes[0];
  const lines = parseContent(slide.content);
  const visual = slideVisuals[slideIndex];

  const isCover = slideIndex === 0;
  const hasVisual = !!visual;

  return (
    <div className={`w-full h-full ${theme.bg} flex flex-col`}>
      {/* Top logo bar */}
      <div className="flex items-center px-10 pt-8 pb-0">
        <span className="text-xl font-bold text-white/30 tracking-widest uppercase text-sm">
          PawMe
        </span>
        <span className="ml-2 text-white/20 text-xs">· Seed 2026</span>
      </div>

      {isCover ? (
        // Cover slide layout
        <div className="flex-1 flex flex-col items-center justify-center text-center px-12 gap-8">
          {visual && (
            <div className="w-40 h-40">{visual}</div>
          )}
          <div>
            <h1 className={`${theme.titleSize} font-extrabold text-white tracking-tight leading-none mb-4`}>
              {slide.title}
            </h1>
            <div className="space-y-2">
              {lines.map((line, i) => (
                <p
                  key={i}
                  className={`${
                    i === 0
                      ? "text-2xl text-white/90 font-light"
                      : "text-lg text-white/50"
                  }`}
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        </div>
      ) : (
        // Standard slide layout
        <div className={`flex-1 flex ${hasVisual ? "flex-row" : "flex-col justify-center"} items-center px-16 gap-12`}>
          <div className={`flex flex-col justify-center ${hasVisual ? "flex-1" : "w-full max-w-3xl"}`}>
            <h2
              className={`${theme.titleSize} font-extrabold text-white tracking-tight leading-tight mb-8`}
            >
              <span className={`${theme.accent}`}>{slide.title}</span>
            </h2>
            <div className="space-y-3">
              {lines.map((line, i) => {
                const isBullet = line.startsWith("•") || line.startsWith("-");
                const isNumbered = /^\d+\./.test(line);
                if (!line.trim()) return <div key={i} className="h-3" />;
                return (
                  <p
                    key={i}
                    className={`text-white/80 leading-relaxed ${
                      isBullet || isNumbered
                        ? "text-xl pl-4 before:content-[''] flex items-start gap-2"
                        : i === 0
                        ? "text-2xl font-semibold text-white"
                        : "text-xl"
                    }`}
                  >
                    {line}
                  </p>
                );
              })}
            </div>
          </div>
          {hasVisual && (
            <div className="w-72 h-72 flex items-center justify-center shrink-0">
              {visual}
            </div>
          )}
        </div>
      )}

      {/* Bottom accent line */}
      <div className={`h-1 mx-10 mb-8 rounded-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20 ${theme.accent}`} />
    </div>
  );
}
