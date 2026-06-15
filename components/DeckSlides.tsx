/* PawMe pitch — slides (coral theme). PawMe = product · OpenPaw = open platform. */
import React from "react";

export const deckTitles = [
  "Title", "Problem", "Why now", "Product", "Structure", "Relationship", "Traction",
  "Revenue model", "Market", "Go-to-market", "Open network + token",
  "Team", "Timeline", "Revenue projections", "The Ask", "Vision",
];

const Footer = () => (
  <div className="footer">
    <span className="brand"><img src="/img/paw.png" alt="" />PawMe</span>
  </div>
);

const Slide = ({ dark, n, children }: { dark?: boolean; n?: boolean | number; children: React.ReactNode }) => (
  <div className={"slide" + (dark ? " dark" : "")}>
    {children}
    {n ? <Footer /> : null}
  </div>
);

const Head = ({ kicker, title }: { kicker: string; title: string }) => (
  <div style={{ marginBottom: 22 }}>
    <div className="kicker">{kicker}</div>
    <div className="title">{title}</div>
  </div>
);

const Bars = ({ rows }: { rows: [string, number][] }) => (
  <div>
    {rows.map(([l, p]) => (
      <div className="bar-row" key={l}>
        <div className="bl"><span>{l}</span><b>{p}%</b></div>
        <div className="track"><div className="fill" style={{ width: p + "%" }} /></div>
      </div>
    ))}
  </div>
);

const C = "var(--coral)";

// 5-year revenue projection (Pawlee → Revenue Projections), $M, all four lines
const REV: { y: string; u: string; hw: number; app: number; food: number; ins: number }[] = [
  { y: "2026", u: "5k", hw: 0.995, app: 0.315, food: 0.360, ins: 0.480 },
  { y: "2027", u: "8.5k", hw: 1.691, app: 0.536, food: 0.612, ins: 0.816 },
  { y: "2028", u: "18k", hw: 3.582, app: 1.134, food: 1.296, ins: 1.728 },
  { y: "2029", u: "40k", hw: 7.960, app: 2.520, food: 2.880, ins: 3.840 },
  { y: "2030", u: "80k", hw: 15.920, app: 5.040, food: 5.760, ins: 7.680 },
];
const REV_MAX = 26.72;
const STREAMS: [string, string, string][] = [
  ["ins", "Insurance", "#7C9A92"],
  ["food", "Food", "#E8B06A"],
  ["app", "Subscription", "#C8553D"],
  ["hw", "Hardware", "#F47B5A"],
];

const Badge = ({ icon, label, href }: { icon: string; label: string; href: string }) => (
  <a href={href} target="_blank" rel="noreferrer"
    style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#241A15", color: "#fff", borderRadius: 10, padding: "8px 14px", textDecoration: "none", fontFamily: "var(--head)", fontWeight: 700, fontSize: 13 }}>
    <img src={`/img/logos/${icon}.svg`} alt="" style={{ height: 18, width: 18 }} /> {label}
  </a>
);

export const deckSlides: React.ReactNode[] = [
  /* 1 TITLE */
  <Slide dark key="1">
    <video src="/media/pawme-hero.mp4" poster="/media/pawme-hero-poster.jpg" autoPlay muted loop playsInline
      style={{ position: "absolute", left: -56, top: -48, width: 1280, height: 720, objectFit: "cover" }} />
    <div style={{ position: "absolute", left: -56, top: -48, width: 1280, height: 720, background: "linear-gradient(180deg, rgba(36,26,21,.10) 0%, rgba(36,26,21,.25) 46%, rgba(36,26,21,.99) 92%)" }} />
    <div className="toprule" style={{ zIndex: 3 }} />
    <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", height: "100%", justifyContent: "flex-end", alignItems: "center", paddingBottom: 44 }}>
      <div style={{ color: C, fontFamily: "var(--head)", fontWeight: 700, fontSize: 23, textAlign: "center" }}>
        The AI pet companion that watches over your pet&apos;s health.
      </div>
      <div style={{ color: "#E8DDD5", fontSize: 15, textAlign: "center", marginTop: 10 }}>
        A live, paid product today — built on an open platform anyone can extend (OpenPaw).
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 22, left: 0, right: 0, textAlign: "center", color: "#C9B8AC", fontSize: 11, zIndex: 2 }}>
      Confidential · Prepared for ARKN Ventures · June 2026
    </div>
  </Slide>,

  /* 2 PROBLEM */
  <Slide n key="2">
    <Head kicker="The problem" title="We spend $320B on pets — and fly blind on their health." />
    <div className="row" style={{ marginTop: 28 }}>
      {[["1B+", "pet dogs & cats worldwide"], ["$320B", "spent on them every year"], ["zero", "shared health record per pet"]].map(([s, l]) => (
        <div className="card grow center" key={l} style={{ padding: "32px 20px" }}>
          <div className="stat" style={{ fontSize: 50 }}>{s}</div>
          <div style={{ marginTop: 12, fontSize: 16, color: "var(--ink)" }}>{l}</div>
        </div>
      ))}
    </div>
    <div className="note" style={{ marginTop: 30 }}>
      By 2030 there will be <b>more pets than children under five</b> — yet there&apos;s still no shared health record for any of them. Owners guess; insurers and food brands price blind.
    </div>
  </Slide>,

  /* 3 WHY NOW */
  <Slide n key="3">
    <Head kicker="Why now" title="Edge AI finally makes a pet health record possible." />
    <div className="row" style={{ marginTop: 26 }}>
      {[["1", "Owners will pay", "Pets are family. Our app is live & paid and the device has 52 paid pre-orders — demand is proven."],
        ["2", "AI captures the signal", "On-device sensors + AI turn everyday behavior into real health indicators, cheaply and continuously."],
        ["3", "Everyone wants the data", "Insurers and food brands will pay for health signals — and reward owners who share them."]].map(([num, h, b]) => (
        <div className="card grow" key={num} style={{ minHeight: 236 }}>
          <div style={{ width: 46, height: 46, borderRadius: "50%", background: C, color: "#fff", fontFamily: "var(--head)", fontWeight: 700, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>{num}</div>
          <div style={{ fontFamily: "var(--head)", fontWeight: 700, fontSize: 19, marginTop: 14, color: "var(--ink)" }}>{h}</div>
          <div style={{ color: "var(--sub)", fontSize: 14, marginTop: 8 }}>{b}</div>
        </div>
      ))}
    </div>
  </Slide>,

  /* 4 PRODUCT */
  <Slide n key="4">
    <Head kicker="Product" title="PawMe — an AI vet in your pocket, live today." />
    <div className="row">
      <div className="grow">
        {[["Ask an AI vet", "Describe symptoms → instant triage in plain language."],
          ["Scan", "AI photo & vaccine scan turn a picture into insight."],
          ["Track", "Health record, activity, weight & reminders in one place."],
          ["Act", "Find nearby vets, shop, and follow next-step nudges."]].map(([h, b]) => (
          <div key={h} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: C, marginTop: 6, flex: "none" }} />
            <div><div style={{ fontFamily: "var(--head)", fontWeight: 700, fontSize: 17, color: "var(--ink)" }}>{h}</div>
              <div style={{ color: "var(--sub)", fontSize: 13 }}>{b}</div></div>
          </div>
        ))}
        <div style={{ fontStyle: "italic", fontSize: 13, color: "var(--deep)", marginTop: 6 }}>
          <b>+ PawMe robot</b> — $299 retail (~$67 to build) · the app&apos;s Pro tier is $5/mo.
        </div>
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", paddingTop: 6 }}>
        <img className="phone" src="/img/app-home.png" alt="PawMe home" />
        <img className="phone" src="/img/app-symptom.png" alt="Symptom check" />
      </div>
    </div>
    <div style={{ position: "absolute", right: 56, bottom: 58, display: "flex", gap: 10 }}>
      <Badge icon="appstore" label="App Store" href="https://apps.apple.com/app/pawpilot" />
      <Badge icon="googleplay" label="Google Play" href="https://play.google.com/store/apps" />
    </div>
  </Slide>,

  /* 5 STRUCTURE */
  <Slide n key="structure">
    <Head kicker="How it fits together" title="An open platform — and the product we sell on it." />
    <div className="row">
      <div className="card grow">
        <div style={{ fontFamily: "var(--head)", fontWeight: 700, color: C, fontSize: 17 }}>OpenPaw — the open platform</div>
        <div style={{ color: "var(--sub)", fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>
          Open-source robot designs + firmware. Anyone builds a variant; we merge good PRs. Earns trust, a builder community & cheap R&D. Stewarded by the OpenPaw Foundation.
        </div>
      </div>
      <div className="card grow coral">
        <div style={{ fontFamily: "var(--head)", fontWeight: 700, fontSize: 17 }}>PawMe — the commercial product</div>
        <div style={{ fontSize: 13, marginTop: 8, color: "#FBE7DF", lineHeight: 1.6 }}>
          The robot we sell + the app + shop + a pet-insurance brokerage + food deals. Built by Ayva Labs on top of OpenPaw. This is the revenue — the data is the moat.
        </div>
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 40, marginTop: 22 }}>
      {["android", "apple", "linux", "huggingface"].map((l) => (
        <img key={l} src={`/img/logos/${l}.svg`} alt={l} style={{ height: 30, opacity: 0.75 }} />
      ))}
    </div>
    <div className="card dark" style={{ marginTop: 18 }}>
      <span style={{ color: C, fontWeight: 700 }}>The proven playbook: </span>
      open platform, commercial product, same team — Android→Pixel, Linux→Red Hat, and Hugging Face. OpenPaw Foundation owns the open project; Ayva Labs builds &amp; sells PawMe.
    </div>
  </Slide>,

  /* RELATIONSHIP — Ayva / PawMe / OpenPaw */
  <Slide n key="relationship">
    <Head kicker="The relationship" title="One company, one product, one open platform." />
    <div style={{ display: "flex", justifyContent: "center", marginTop: 6 }}>
      <div className="card dark" style={{ width: 470, textAlign: "center" }}>
        <div style={{ fontFamily: "var(--head)", fontWeight: 700, color: "#fff", fontSize: 18 }}>Ayva Labs Limited</div>
        <div style={{ color: "#C9B8AC", fontSize: 12.5, marginTop: 4 }}>the company · Hong Kong · equity &amp; team</div>
      </div>
    </div>
    <div className="row" style={{ marginTop: 8 }}>
      <div className="grow" style={{ textAlign: "center", color: "var(--muted)", fontSize: 12, fontFamily: "var(--head)", fontWeight: 700 }}>↓ builds &amp; sells</div>
      <div className="grow" style={{ textAlign: "center", color: "var(--muted)", fontSize: 12, fontFamily: "var(--head)", fontWeight: 700 }}>↓ sponsors &amp; open-sources</div>
    </div>
    <div className="row" style={{ marginTop: 8 }}>
      <div className="card grow coral" style={{ minHeight: 140 }}>
        <div style={{ fontFamily: "var(--head)", fontWeight: 700, fontSize: 17 }}>PawMe — the product</div>
        <div style={{ fontSize: 13, marginTop: 8, color: "#FBE7DF", lineHeight: 1.6 }}>Robot · app · shop · insurance brokerage · food. The commercial revenue — and the proprietary data moat.</div>
      </div>
      <div className="card grow" style={{ minHeight: 140 }}>
        <div style={{ fontFamily: "var(--head)", fontWeight: 700, color: C, fontSize: 17 }}>OpenPaw — the open platform</div>
        <div style={{ color: "var(--sub)", fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>Open-source designs + firmware · the Foundation · maker community · optional $OPENPAW token.</div>
      </div>
    </div>
    <div className="note" style={{ marginTop: 18 }}>Equity backs <b>Ayva Labs</b> (PawMe). Any token lives in the separate <b>OpenPaw Foundation</b> — keeping the regulated company clean.</div>
  </Slide>,

  /* 6 TRACTION */
  <Slide n key="6">
    <Head kicker="Traction" title="Live, paid, and pre-selling — before launch." />
    <div className="row">
      {[["LIVE", "app shipped on the App Store"], ["139", "waitlist emails"], ["52", "paid $1 device reservations"], ["$8–22", "CAC via Facebook / Instagram"]].map(([s, l]) => (
        <div className="card grow center" key={l}>
          <div className="stat" style={{ fontSize: 34 }}>{s}</div>
          <div style={{ marginTop: 10, fontSize: 12.5, color: "var(--ink)" }}>{l}</div>
        </div>
      ))}
    </div>
    <div style={{ marginTop: 26 }}>
      {["A known, repeatable acquisition channel — CAC $8–22 on paid social",
        "52 paid pre-orders + 139 waitlist, pre-launch — real willingness to pay",
        "In talks with 2 Hong Kong veterinary hospitals for clinical validation",
        "Built in ~11 months by a 2-person team + contractors"].map((t) => (
        <div key={t} style={{ display: "flex", gap: 12, marginBottom: 11 }}>
          <span style={{ color: C, fontWeight: 700, fontFamily: "var(--head)" }}>✓</span>
          <span style={{ fontSize: 14.5, color: "var(--ink)" }}>{t}</span>
        </div>
      ))}
    </div>
  </Slide>,

  /* 7 REVENUE MODEL */
  <Slide n key="7">
    <Head kicker="Business model" title="Four revenue lines — and insurers may pay our hardware cost." />
    <div className="row">
      {([["Hardware", "$299 retail · ~$67 to build (30–40% margin).", false],
        ["App subscription", "PawMe Pro at $5/mo — recurring.", false],
        ["Food + accessories", "Subscription & affiliate, personalized to the pet.", false],
        ["Insurance brokerage", "Commission per policy referred, using our health data.", true]] as [string, string, boolean][]).map(([h, b, hot]) => (
        <div className={"card grow" + (hot ? " coral" : "")} key={h} style={{ minHeight: 170, padding: "18px 18px" }}>
          <div style={{ fontFamily: "var(--head)", fontWeight: 700, fontSize: 15.5, color: hot ? "#fff" : "var(--ink)" }}>{h}</div>
          <div style={{ fontSize: 12.5, marginTop: 8, color: hot ? "#FBE7DF" : "var(--sub)" }}>{b}</div>
        </div>
      ))}
    </div>
    <div className="card dark" style={{ marginTop: 20 }}>
      <span style={{ color: C, fontWeight: 700 }}>The unlock: </span>
      insurers want PawMe&apos;s health data to price premiums — so they may <b>subsidize or even give away the device</b> in exchange for the data + a brokerage deal. That can drive hardware CAC toward zero.
    </div>
  </Slide>,

  /* 8 MARKET */
  <Slide n key="8">
    <Head kicker="Market" title="A $320B market — and pet insurance is exploding." />
    <div className="row">
      {[["$320B", "global pet care / yr"], ["$14B→$47B", "pet insurance · ~13% CAGR to 2035"], ["< 5%", "of pets insured globally"]].map(([s, l]) => (
        <div className="card grow center" key={l}>
          <div className="stat" style={{ fontSize: s.length > 6 ? 30 : 38 }}>{s}</div>
          <div style={{ marginTop: 10, fontSize: 13, color: "var(--ink)" }}>{l}</div>
        </div>
      ))}
    </div>
    <div className="card dark" style={{ marginTop: 24 }}>
      <span style={{ color: C, fontWeight: 700 }}>Why we win: </span>
      pet insurance is small, underpenetrated and growing fast — and it&apos;s priced on almost no data. PawMe is the device that finally generates that data, at the point of sale.
    </div>
  </Slide>,

  /* 9 GTM */
  <Slide n key="9">
    <Head kicker="Go-to-market" title="A consumer funnel that already works." />
    <div className="row" style={{ alignItems: "stretch", marginTop: 8 }}>
      {[["1 · Instagram + TikTok", "A camera robot + pets = made-for-viral content. Our primary channels."],
        ["2 · Paid social, proven", "CAC $8–22 on Facebook/Instagram today — a tunable acquisition engine."],
        ["3 · Vet & insurer partners", "Clinical validation + insurers that may subsidize the hardware."]].map(([h, b], idx) => (
        <div key={h} style={{ display: "contents" }}>
          <div className="card grow" style={{ minHeight: 175 }}>
            <div style={{ fontFamily: "var(--head)", fontWeight: 700, color: C, fontSize: 16 }}>{h}</div>
            <div style={{ color: "var(--sub)", fontSize: 13, marginTop: 10 }}>{b}</div>
          </div>
          {idx < 2 ? <span className="chev">›</span> : null}
        </div>
      ))}
    </div>
    <div style={{ textAlign: "center", marginTop: 26, fontSize: 15, color: "var(--ink)" }}>
      <b style={{ color: "var(--deep)" }}>Next step: </b>convert the waitlist + VIP list, ship devices, scale paid social.
    </div>
  </Slide>,

  /* 10 OPEN NETWORK + TOKEN */
  <Slide n key="10">
    <Head kicker="The token" title="$OPENPAW — issued by the Foundation, separate from the company." />
    <div className="row" style={{ alignItems: "stretch", marginTop: 2 }}>
      <div className="card grow dark" style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 96 }}>
        <div style={{ fontFamily: "var(--head)", fontWeight: 700, color: "#fff", fontSize: 15 }}>Ayva Labs · PawMe</div>
        <div style={{ color: "#C9B8AC", fontSize: 11.5, marginTop: 3 }}>the regulated company — no token on its books</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 120, flex: "none" }}>
        <span className="chev">›</span>
        <div style={{ fontSize: 10.5, color: "var(--muted)", textAlign: "center", marginTop: 2 }}>sponsors<br />(arm&apos;s-length)</div>
      </div>
      <div className="card grow" style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 96 }}>
        <div style={{ fontFamily: "var(--head)", fontWeight: 700, color: C, fontSize: 15 }}>OpenPaw Foundation</div>
        <div style={{ color: "var(--sub)", fontSize: 11.5, marginTop: 3 }}>non-profit · owns the open project &amp; issues the token</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 120, flex: "none" }}>
        <span className="chev">›</span>
        <div style={{ fontSize: 10.5, color: "var(--muted)", textAlign: "center", marginTop: 2 }}>launches on<br />Virtuals · Jul 8</div>
      </div>
      <div className="card grow coral" style={{ display: "flex", flexDirection: "column", justifyContent: "center", minHeight: 96 }}>
        <div style={{ fontFamily: "var(--head)", fontWeight: 700, fontSize: 16 }}>$OPENPAW</div>
        <div style={{ color: "#FBE7DF", fontSize: 11.5, marginTop: 3 }}>the network token · Base / Virtuals ACF</div>
      </div>
    </div>
    <div style={{ fontFamily: "var(--head)", fontWeight: 700, color: "var(--muted)", fontSize: 12, letterSpacing: 1, marginTop: 22, textTransform: "uppercase" }}>How the token works</div>
    <div className="row" style={{ marginTop: 10 }}>
      <div className="card grow">
        <div style={{ fontFamily: "var(--head)", fontWeight: 700, color: "var(--ink)", fontSize: 15 }}>Earn 🐾</div>
        <div style={{ color: "var(--sub)", fontSize: 13, marginTop: 6 }}>Owners &amp; devices contribute pet-health data → receive $OPENPAW.</div>
      </div>
      <div className="card grow">
        <div style={{ fontFamily: "var(--head)", fontWeight: 700, color: "var(--ink)", fontSize: 15 }}>Burn 🔥</div>
        <div style={{ color: "var(--sub)", fontSize: 13, marginTop: 6 }}>Spend $OPENPAW on premium AI, discounts &amp; data access — real demand for the token.</div>
      </div>
    </div>
    <div className="note" style={{ marginTop: 18 }}>Issued by the <b>Foundation</b>, not the company — PawMe (Ayva Labs) stays regulator-clean. The token ships only if backed by real usage (the Auki model).</div>
  </Slide>,

  /* 11 TEAM */
  <Slide n key="11">
    <Head kicker="Team" title="A 2-person team that ships hardware and software." />
    <div className="row">
      {([["Ashok Jaiswal", "CEO · product & GTM · patent-holder (AI)", "/img/ashok.png"],
        ["Prithu Hazarika", "CTO · engineering, app & ML", "/img/prithu.png"],
        ["+ Contractors & interns", "hardware, design, growth", null]] as [string, string, string | null][]).map(([n2, r, img]) => (
        <div className="card grow center" key={n2} style={{ minHeight: 222 }}>
          {img ? <img className="avatar" src={img} alt={n2} />
            : <div className="avatar-paw"><img src="/img/paw.png" alt="" /></div>}
          <div style={{ fontFamily: "var(--head)", fontWeight: 700, fontSize: 16, marginTop: 14 }}>{n2}</div>
          <div style={{ color: "var(--sub)", fontSize: 11.5, marginTop: 4 }}>{r}</div>
        </div>
      ))}
    </div>
    <div className="card dark" style={{ marginTop: 18 }}>
      <span style={{ color: C, fontWeight: 700 }}>Prior hardware exit — </span>
      Ashok crowdfunded EzeeCube on Indiegogo: $146,666 raised (196% of goal), 496 backers — then shipped, sold &amp; exited. This team has taken hardware from crowdfund to customers before.
    </div>
  </Slide>,

  /* 12 TIMELINE (with movement clip) */
  <Slide n key="12">
    <Head kicker="Execution" title="Idea → working prototype in ~11 months." />
    <div className="tl">
      <div className="tl-line" />
      <div className="tl-nodes">
        {[["Jul '25", "Kickoff — replicate open-source ESP-32 ball"],
          ["Aug '25", "PRD, firmware & first rolling prototype"],
          ["Q4 '25", "Custom PCB + mechanical CAD"],
          ["Jan '26", "Industrial design + PawMe branding"],
          ["Q1 '26", "Working prototype + app live"],
          ["Jul 8", "Pre-orders → launch"]].map(([d, l]) => (
          <div className="tl-node" key={d}>
            <div className="tl-date">{d}</div>
            <div className="tl-dot" />
            <div className="tl-label">{l}</div>
          </div>
        ))}
      </div>
    </div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, marginTop: 24 }}>
      <div style={{ textAlign: "center" }}>
        <img src="/img/proto-ball.jpg" alt="" style={{ height: 150, width: 215, objectFit: "contain", background: "#fff", borderRadius: 12, border: "1px solid #ece3da" }} />
        <div style={{ fontSize: 11.5, color: "var(--sub)", marginTop: 6 }}>ESP-32 ball · 100 mm sphere</div>
      </div>
      <span className="chev" style={{ fontSize: 28 }}>›</span>
      <div style={{ textAlign: "center" }}>
        <img src="/img/proto-print.jpg" alt="" style={{ height: 150, width: 215, objectFit: "cover", borderRadius: 12 }} />
        <div style={{ fontSize: 11.5, color: "var(--sub)", marginTop: 6 }}>First 3D-printed units</div>
      </div>
      <span className="chev" style={{ fontSize: 28 }}>›</span>
      <div style={{ textAlign: "center" }}>
        <video src="/media/pawme-move.mp4" poster="/media/pawme-move-poster.jpg" autoPlay muted loop playsInline
          style={{ height: 150, width: 215, objectFit: "cover", borderRadius: 12, boxShadow: "0 8px 24px rgba(0,0,0,.2)" }} />
        <div style={{ fontSize: 11.5, color: "var(--deep)", fontWeight: 700, marginTop: 6 }}>Working units, today</div>
      </div>
    </div>
    <div className="note" style={{ marginTop: 16 }}>From a transparent rolling ball to working units — a 2-person team + specialist contractors.</div>
  </Slide>,

  /* 13 REVENUE PROJECTIONS */
  <Slide n key="rev-proj">
    <Head kicker="Revenue projections" title="$2.1M → $34M in five years — four revenue lines." />
    <div className="row" style={{ alignItems: "flex-end", height: 300, padding: "0 6px 10px", gap: 28, borderBottom: "2px solid #ece3da" }}>
      {REV.map((d) => {
        const total = d.hw + d.app + d.food + d.ins;
        return (
          <div key={d.y} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ fontFamily: "var(--head)", fontWeight: 700, color: "var(--deep)", fontSize: 16, marginBottom: 6 }}>${total.toFixed(1)}M</div>
            <div style={{ width: 66, height: 230, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              {STREAMS.map(([k, , color], si) => (
                <div key={k} style={{ height: ((d as unknown as Record<string, number>)[k] / REV_MAX) * 230, background: color, borderTopLeftRadius: si === 0 ? 7 : 0, borderTopRightRadius: si === 0 ? 7 : 0 }} />
              ))}
            </div>
            <div style={{ marginTop: 8, fontFamily: "var(--head)", fontWeight: 700, color: "var(--ink)", fontSize: 14 }}>{d.y}</div>
            <div style={{ color: "var(--muted)", fontSize: 11 }}>{d.u} units</div>
          </div>
        );
      })}
    </div>
    <div style={{ display: "flex", gap: 18, justifyContent: "center", marginTop: 16 }}>
      {STREAMS.slice().reverse().map(([k, label, color]) => (
        <div key={k} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--sub)" }}>
          <span style={{ width: 12, height: 12, borderRadius: 3, background: color, display: "inline-block" }} /> {label}
        </div>
      ))}
    </div>
    <div className="note" style={{ marginTop: 14 }}>
      Conservative ramp: 5k → 80k units across four lines — hardware, subscription, food &amp; insurance brokerage — compounding past 2030.
    </div>
  </Slide>,

  /* 14 ASK */
  <Slide n key="14">
    <Head kicker="The ask" title="Raising $2M to scale from prototype to launch." />
    <div className="row">
      <div className="card grow" style={{ minHeight: 250 }}>
        <div className="stat" style={{ fontSize: 34 }}>$2M seed</div>
        <ul style={{ marginTop: 16, paddingLeft: 18, color: "var(--sub)", fontSize: 13.5, lineHeight: 1.9 }}>
          <li>Scale production + first thousands of units</li>
          <li>Grow paid-social (proven CAC $8–22)</li>
          <li>Build the health-data pipeline + insurer deals</li>
          <li><b>Equity or token</b> — finalizing structure with our advisors</li>
        </ul>
      </div>
      <div className="grow">
        <div style={{ fontFamily: "var(--head)", fontWeight: 700, color: "var(--deep)", fontSize: 15, marginBottom: 14 }}>Use of funds</div>
        <Bars rows={[["Marketing", 30], ["Inventory", 25], ["Wages", 25], ["R&D", 15], ["Tooling", 5]] as [string, number][]} />
        <div style={{ fontStyle: "italic", color: "var(--muted)", fontSize: 11, marginTop: 8 }}>Per the financial model — self-funded to date.</div>
      </div>
    </div>
  </Slide>,

  /* 15 VISION */
  <Slide dark key="15">
    <div className="botrule" />
    <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center", gap: 14 }}>
      <img src="/img/robot.png" alt="PawMe" style={{ height: 180 }} />
      <div className="title" style={{ textAlign: "center", fontSize: 34, maxWidth: 820 }}>The pet-health data network for every home.</div>
      <div style={{ color: C, fontSize: 18 }}>Real device. Real revenue. An open platform underneath.</div>
      <div style={{ color: "#C9B8AC", fontSize: 14, marginTop: 8 }}>PawMe — the product · OpenPaw — the open platform · @PawMe</div>
      <div style={{ fontFamily: "var(--head)", fontWeight: 700, fontStyle: "italic", color: "#fff", fontSize: 16, marginTop: 6 }}>Let&apos;s build it.</div>
    </div>
  </Slide>,
];
