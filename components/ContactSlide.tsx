"use client";

import { Slide } from "@/lib/slides";

interface Props {
  slide: Slide;
}

const WHATSAPP_NUMBER = "85260434478";
const EMAIL = "ashok@ayvalabs.com";

const WHATSAPP_MESSAGE = encodeURIComponent(
  "Hi Ashok, I just went through the PawMe pitch deck and I'd love to connect to discuss the investment opportunity."
);

const EMAIL_SUBJECT = encodeURIComponent("PawMe Seed Investment - Let's Connect");
const EMAIL_BODY = encodeURIComponent(
  `Hi Ashok,

I just reviewed the PawMe pitch deck and I'm interested in learning more about the seed investment opportunity.

Could we set up a time to connect?

Best regards,`
);

export default function ContactSlide({ slide }: Props) {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;
  const emailUrl = `mailto:${EMAIL}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`;

  return (
    <div className="w-full h-full bg-gradient-to-br from-[#0a0a14] via-[#0f1020] to-[#0a0a14] flex flex-col">
      {/* Top logo bar */}
      <div className="flex items-center px-10 pt-8">
        <span className="text-white/30 tracking-widest uppercase text-sm font-bold">
          PawMe
        </span>
        <span className="ml-2 text-white/20 text-xs">· Seed 2026</span>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-10">
        {/* Paw icon */}
        <div className="relative">
          <div className="w-28 h-28 rounded-3xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/30 flex items-center justify-center shadow-2xl shadow-amber-500/20">
            <span className="text-6xl">🐾</span>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-amber-400/50 animate-ping" />
        </div>

        {/* Headline */}
        <div>
          <h2 className="text-5xl font-extrabold text-white tracking-tight mb-3">
            {slide.title}
          </h2>
          <p className="text-xl text-white/60 max-w-xl leading-relaxed">
            Let's give every pet a best friend — and build the future of pet tech together.
          </p>
        </div>

        {/* Stats strip */}
        <div className="flex gap-8 text-center">
          {[
            { value: "$68B", label: "Market by 2030" },
            { value: "$750K", label: "Seed Round" },
            { value: "1.3B", label: "Pets Globally" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-3xl font-bold text-amber-400">{s.value}</div>
              <div className="text-white/40 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-2">
          <a
            href={emailUrl}
            className="flex items-center gap-3 bg-white text-black font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:bg-amber-50 hover:scale-105 shadow-xl shadow-black/30 group"
          >
            <span className="text-2xl">✉️</span>
            <span>Connect via Email</span>
            <span className="text-black/30 text-sm group-hover:translate-x-1 transition-transform">→</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#25D366] text-white font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 hover:bg-[#20bf5a] hover:scale-105 shadow-xl shadow-[#25D366]/20 group"
          >
            <span className="text-2xl">💬</span>
            <span>WhatsApp Ashok</span>
            <span className="text-white/50 text-sm group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Contact info */}
        <div className="text-white/30 text-sm space-y-1">
          <div>ashok@ayvalabs.com &nbsp;·&nbsp; +852 6043 4478</div>
          <div className="text-white/20">pitch.ayvalabs.com</div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="h-1 mx-10 mb-8 rounded-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
    </div>
  );
}
