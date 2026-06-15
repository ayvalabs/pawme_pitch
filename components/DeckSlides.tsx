/* PawMe pitch — slides v2 (coral theme). PawMe = product · OpenPaw = open platform. */
import React from "react";

export const deckTitles = [
  "Title", "Problem", "Why now", "Product", "Structure", "Relationship", "Traction",
  "Revenue model", "Market", "Go-to-market", "Open network + token",
  "Team", "Timeline", "Revenue projections", "The Ask", "Vision",
];

const TOTAL = deckTitles.length;
const C = "var(--coral)";

const Slide = ({ dark, flush, page, children }: { dark?: boolean; flush?: boolean; page?: number; children: React.ReactNode }) => (
  <div className={"slide" + (dark ? " dark" : "") + (flush ? " flush" : "")}>
    {children}
    {page ? (
      <div className="footer">
        <span className="brand"><img src="/img/paw.png" alt="" />PawMe</span>
        <span>{String(page).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}</span>
      </div>
    ) : null}
  </div>
);

const Head = ({ kicker, title, dek }: { kicker: string; title: string; dek?: string }) => (
  <div className="shead">
    <div className="kicker">{kicker}</div>
    <div className="title">{title}</div>
    {dek ? <div className="dek">{dek}</div> : null}
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

const Badge = ({ icon, label, href }: { icon: string; label: string; href: string }) => (
  <a href={href} target="_blank" rel="noreferrer"
    style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--ink)", color: "#fff", borderRadius: 11, padding: "9px 15px", textDecoration: "none", fontFamily: "var(--head)", fontWeight: 700, fontSize: 13 }}>
    <img src={`/img/logos/${icon}.svg`} alt="" style={{ height: 18, width: 18 }} /> {label}
  </a>
);

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

export const deckSlides: React.ReactNode[] = [
  /* 1 TITLE */
  <Slide dark flush key="1">
    <video src="/media/pawme-hero.mp4" poster="/media/pawme-hero-poster.jpg" autoPlay muted loop playsInline
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(34,23,16,.12) 0%, rgba(34,23,16,.20) 44%, rgba(34,23,16,.97) 92%)" }} />
    <div className="toprule" />
    <div style={{ position: "absolute", top: 30, left: 44, display: "flex", alignItems: "center", gap: 9, zIndex: 3 }}>
      <img src="/img/paw.png" alt="" style={{ width: 26, height: 26 }} />
      <span style={{ fontFamily: "var(--head)", fontWeight: 800, color: "#fff", fontSize: 19, letterSpacing: "-.01em" }}>PawMe</span>
    </div>
    <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center", paddingBottom: 56 }}>
      <div style={{ color: C, fontFamily: "var(--head)", fontWeight: 800, fontSize: 25, textAlign: "center", letterSpacing: "-.02em" }}>
        The AI pet companion that watches over your pet&apos;s health.
      </div>
      <div style={{ color: "#E8DDD5", fontSize: 15.5, textAlign: "center", marginTop: 11, maxWidth: 640, lineHeight: 1.5 }}>
        A live, paid product today — built on an open platform anyone can extend (OpenPaw).
      </div>
    </div>
    <div style={{ position: "absolute", bottom: 22, left: 0, right: 0, textAlign: "center", color: "#C9B8AC", fontSize: 11, zIndex: 2, letterSpacing: ".3px" }}>
      Confidential · Prepared for ARKN Ventures · June 2026
    </div>
  </Slide>,

  /* 2 PROBLEM */
  <Slide page={2} key="2">
    <Head kicker="The problem" title="We spend $320B on pets — and fly blind on their health." />
    <div className="body">
      <div className="row stretch">
        {[["1B+", "pet dogs & cats worldwide"], ["$320B", "spent on them every year"], ["zero", "shared health record per pet"]].map(([s, l]) => (
          <div className="card sand grow center" key={l} style={{ padding: "34px 20px" }}>
            <div className="stat" style={{ fontSize: 52 }}>{s}</div>
            <div className="statlabel" style={{ fontSize: 15 }}>{l}</div>
          </div>
        ))}
      </div>
      <div className="callout" style={{ marginTop: 18 }}>
        By 2030 there will be <b>more pets than children under five</b>{" "}— yet there&apos;s still no shared health record for any of them. Owners guess; insurers and food brands price blind.
      </div>
    </div>
  </Slide>,

  /* 3 WHY NOW */
  <Slide page={3} key="3">
    <Head kicker="Why now" title="Edge AI finally makes a pet health record possible." />
    <div className="body">
      <div className="row stretch">
        {[["1", "Owners will pay", "Pets are family. Our app is live & paid and the device has 52 paid pre-orders — demand is proven."],
          ["2", "AI captures the signal", "On-device sensors + AI turn everyday behavior into real health indicators, cheaply and continuously."],
          ["3", "Everyone wants the data", "Insurers and food brands will pay for health signals — and reward owners who share them."]].map(([num, h, b]) => (
          <div className="card grow" key={num} style={{ minHeight: 244 }}>
            <div className="idx">{num}</div>
            <div className="ch" style={{ marginTop: 16 }}>{h}</div>
            <div className="cb">{b}</div>
          </div>
        ))}
      </div>
    </div>
  </Slide>,

  /* 4 PRODUCT */
  <Slide page={4} key="4">
    <Head kicker="Product" title="PawMe — an AI vet in your pocket, live today." />
    <div className="body">
      <div className="row" style={{ gap: 40, alignItems: "center" }}>
        <div className="grow">
          {[["Ask an AI vet", "Describe symptoms → instant triage in plain language."],
            ["Scan", "AI photo & vaccine scan turn a picture into insight."],
            ["Track", "Health record, activity, weight & reminders in one place."],
            ["Act", "Find nearby vets, shop, and follow next-step nudges."]].map(([h, b]) => (
            <div key={h} style={{ display: "flex", gap: 13, marginBottom: 16 }}>
              <div className="dot" />
              <div>
                <div className="ch" style={{ fontSize: 16.5 }}>{h}</div>
                <div className="cb" style={{ marginTop: 3, fontSize: 13 }}>{b}</div>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <Badge icon="appstore" label="App Store" href="https://apps.apple.com/app/pawpilot" />
            <Badge icon="googleplay" label="Google Play" href="https://play.google.com/store/apps" />
          </div>
          <div style={{ fontSize: 13, color: "var(--deep)", marginTop: 16, fontWeight: 500 }}>
            <b style={{ fontFamily: "var(--head)" }}>+ PawMe robot</b>{" "}— $299 retail (~$67 to build) · the app&apos;s Pro tier is $5/mo.
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, flex: "none" }}>
          <img className="phone" src="/img/app-home.png" alt="PawMe home" />
          <img className="phone" src="/img/app-symptom.png" alt="Symptom check" style={{ marginTop: 26 }} />
        </div>
      </div>
    </div>
  </Slide>,

  /* 5 STRUCTURE */
  <Slide page={5} key="structure">
    <Head kicker="How it fits together" title="An open platform — and the product we sell on it." />
    <div className="body">
      <div className="row stretch">
        <div className="card grow" style={{ borderTop: "3px solid var(--coral)" }}>
          <div className="ch" style={{ color: C }}>OpenPaw — the open platform</div>
          <div className="cb">Open-source robot designs + firmware. Anyone builds a variant; we merge good PRs. Earns trust, a builder community & cheap R&D. Stewarded by the OpenPaw Foundation.</div>
        </div>
        <div className="card coral grow">
          <div className="ch">PawMe — the commercial product</div>
          <div className="cb">The robot we sell + the app + shop + a pet-insurance brokerage + food deals. Built by Ayva Labs on top of OpenPaw. This is the revenue — the data is the moat.</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 46, margin: "22px 0" }}>
        {["android", "apple", "linux", "huggingface"].map((l) => (
          <img key={l} src={`/img/logos/${l}.svg`} alt={l} style={{ height: 28, opacity: 0.55 }} />
        ))}
      </div>
      <div className="callout">
        <span className="k">The proven playbook: </span>
        open platform, commercial product, same team — Android→Pixel, Linux→Red Hat, and Hugging Face. OpenPaw Foundation owns the open project; Ayva Labs builds &amp; sells PawMe.
      </div>
    </div>
  </Slide>,

  /* 6 RELATIONSHIP */
  <Slide page={6} key="relationship">
    <Head kicker="The relationship" title="One company, one product, one open platform." />
    <div className="body">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="card dark center" style={{ width: 460, padding: "18px 24px" }}>
          <div className="ch">Ayva Labs Limited</div>
          <div className="cb" style={{ marginTop: 5 }}>the company · Hong Kong · equity &amp; team</div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", color: "var(--muted)", fontSize: 22, margin: "4px 0" }}>↓</div>
      <div className="row stretch">
        <div className="card coral grow" style={{ minHeight: 138 }}>
          <div style={{ fontFamily: "var(--head)", fontWeight: 700, fontSize: 12, letterSpacing: 1.5, color: "#FBE7DF", textTransform: "uppercase" }}>builds &amp; sells →</div>
          <div className="ch" style={{ marginTop: 8 }}>PawMe — the product</div>
          <div className="cb">Robot · app · shop · insurance brokerage · food. The commercial revenue — and the proprietary data moat.</div>
        </div>
        <div className="card grow" style={{ minHeight: 138, borderTop: "3px solid var(--coral)" }}>
          <div style={{ fontFamily: "var(--head)", fontWeight: 700, fontSize: 12, letterSpacing: 1.5, color: "var(--deep)", textTransform: "uppercase" }}>sponsors &amp; open-sources →</div>
          <div className="ch" style={{ marginTop: 8, color: C }}>OpenPaw — the open platform</div>
          <div className="cb">Open-source designs + firmware · the Foundation · maker community · optional $OPENPAW token.</div>
        </div>
      </div>
      <div className="note" style={{ marginTop: 18 }}>Equity backs <b>Ayva Labs</b>{" "}(PawMe). Any token lives in the separate <b>OpenPaw Foundation</b>{" "}— keeping the regulated company clean.</div>
    </div>
  </Slide>,

  /* 7 TRACTION */
  <Slide page={7} key="6">
    <Head kicker="Traction" title="Live, paid, and pre-selling — before launch." />
    <div className="body">
      <div className="row stretch">
        {[["LIVE", "app shipped on the App Store"], ["139", "waitlist emails"], ["52", "paid $1 device reservations"], ["$8–22", "CAC via Facebook / Instagram"]].map(([s, l]) => (
          <div className="card sand grow center" key={l} style={{ padding: "26px 16px" }}>
            <div className="stat" style={{ fontSize: 36 }}>{s}</div>
            <div className="statlabel" style={{ fontSize: 12.5 }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 26 }}>
        {["A known, repeatable acquisition channel — CAC $8–22 on paid social",
          "52 paid pre-orders + 139 waitlist, pre-launch — real willingness to pay",
          "In talks with 2 Hong Kong veterinary hospitals for clinical validation",
          "Built in ~11 months by a 2-person team + contractors"].map((t) => (
          <div key={t} style={{ display: "flex", gap: 13, marginBottom: 13, alignItems: "center" }}>
            <span style={{ color: "#fff", background: C, width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flex: "none" }}>✓</span>
            <span style={{ fontSize: 14.5, color: "var(--ink)" }}>{t}</span>
          </div>
        ))}
      </div>
    </div>
  </Slide>,

  /* 8 REVENUE MODEL */
  <Slide page={8} key="7">
    <Head kicker="Business model" title="Four revenue lines — and insurers may pay our hardware cost." />
    <div className="body">
      <div className="row stretch">
        {([["Hardware", "$299 retail · ~$67 to build (30–40% margin).", false],
          ["App subscription", "PawMe Pro at $5/mo — recurring.", false],
          ["Food + accessories", "Subscription & affiliate, personalized to the pet.", false],
          ["Insurance brokerage", "Commission per policy referred, using our health data.", true]] as [string, string, boolean][]).map(([h, b, hot]) => (
          <div className={"card grow" + (hot ? " coral" : "")} key={h} style={{ minHeight: 176 }}>
            <div className="ch" style={{ fontSize: 15.5 }}>{h}</div>
            <div className="cb" style={{ fontSize: 12.5 }}>{b}</div>
          </div>
        ))}
      </div>
      <div className="callout" style={{ marginTop: 20 }}>
        <span className="k">The unlock: </span>
        insurers want PawMe&apos;s health data to price premiums — so they may <b>subsidize or even give away the device</b>{" "}in exchange for the data + a brokerage deal. That can drive hardware CAC toward zero.
      </div>
    </div>
  </Slide>,

  /* 9 MARKET */
  <Slide page={9} key="8">
    <Head kicker="Market" title="A $320B market — and pet insurance is exploding." />
    <div className="body">
      <div className="row stretch">
        {[["$320B", "global pet care / yr"], ["$14B→$47B", "pet insurance · ~13% CAGR to 2035"], ["< 5%", "of pets insured globally"]].map(([s, l]) => (
          <div className="card sand grow center" key={l} style={{ padding: "32px 18px" }}>
            <div className="stat" style={{ fontSize: s.length > 6 ? 32 : 42 }}>{s}</div>
            <div className="statlabel" style={{ fontSize: 13.5 }}>{l}</div>
          </div>
        ))}
      </div>
      <div className="callout" style={{ marginTop: 24 }}>
        <span className="k">Why we win: </span>
        pet insurance is small, underpenetrated and growing fast — and it&apos;s priced on almost no data. PawMe is the device that finally generates that data, at the point of sale.
      </div>
    </div>
  </Slide>,

  /* 10 GTM */
  <Slide page={10} key="9">
    <Head kicker="Go-to-market" title="A consumer funnel that already works." />
    <div className="body">
      <div className="row stretch" style={{ alignItems: "stretch" }}>
        {[["01", "Instagram + TikTok", "A camera robot + pets = made-for-viral content. Our primary channels."],
          ["02", "Paid social, proven", "CAC $8–22 on Facebook/Instagram today — a tunable acquisition engine."],
          ["03", "Vet & insurer partners", "Clinical validation + insurers that may subsidize the hardware."]].map(([num, h, b], idx) => (
          <React.Fragment key={h}>
            <div className="card grow" style={{ minHeight: 188 }}>
              <div className="idx">{num}</div>
              <div className="ch" style={{ marginTop: 14, color: C }}>{h}</div>
              <div className="cb">{b}</div>
            </div>
            {idx < 2 ? <span className="chev">›</span> : null}
          </React.Fragment>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 26, fontSize: 15, color: "var(--ink)" }}>
        <b style={{ color: "var(--deep)", fontFamily: "var(--head)" }}>Next step: </b>convert the waitlist + VIP list, ship devices, scale paid social.
      </div>
    </div>
  </Slide>,

  /* 11 OPEN NETWORK + TOKEN */
  <Slide page={11} key="10">
    <Head kicker="The token" title="$OPENPAW — issued by the Foundation, separate from the company." />
    <div className="body">
      <div className="row stretch">
        <div className="card dark grow mid" style={{ minHeight: 92 }}>
          <div className="ch" style={{ fontSize: 14.5 }}>Ayva Labs · PawMe</div>
          <div className="cb" style={{ fontSize: 11.5, marginTop: 4 }}>the regulated company — no token on its books</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 116, flex: "none" }}>
          <span className="chev">›</span>
          <div style={{ fontSize: 10.5, color: "var(--muted)", textAlign: "center", marginTop: 2 }}>sponsors<br />(arm&apos;s-length)</div>
        </div>
        <div className="card grow mid" style={{ minHeight: 92, borderTop: "3px solid var(--coral)" }}>
          <div className="ch" style={{ fontSize: 14.5, color: C }}>OpenPaw Foundation</div>
          <div className="cb" style={{ fontSize: 11.5, marginTop: 4 }}>non-profit · owns the open project &amp; issues the token</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: 116, flex: "none" }}>
          <span className="chev">›</span>
          <div style={{ fontSize: 10.5, color: "var(--muted)", textAlign: "center", marginTop: 2 }}>launches on<br />Virtuals · Jul 8</div>
        </div>
        <div className="card coral grow mid" style={{ minHeight: 92 }}>
          <div className="ch" style={{ fontSize: 16 }}>$OPENPAW</div>
          <div className="cb" style={{ fontSize: 11.5, marginTop: 4 }}>the network token · Base / Virtuals ACF</div>
        </div>
      </div>
      <div style={{ fontFamily: "var(--head)", fontWeight: 700, color: "var(--muted)", fontSize: 11.5, letterSpacing: 1.6, marginTop: 24, textTransform: "uppercase" }}>How the token works</div>
      <div className="row stretch" style={{ marginTop: 12 }}>
        <div className="card sand grow">
          <div className="ch" style={{ fontSize: 15 }}>Earn 🐾</div>
          <div className="cb">Owners &amp; devices contribute pet-health data → receive $OPENPAW.</div>
        </div>
        <div className="card sand grow">
          <div className="ch" style={{ fontSize: 15 }}>Burn 🔥</div>
          <div className="cb">Spend $OPENPAW on premium AI, discounts &amp; data access — real demand for the token.</div>
        </div>
      </div>
      <div className="note" style={{ marginTop: 18 }}>Issued by the <b>Foundation</b>, not the company — PawMe (Ayva Labs) stays regulator-clean. The token ships only if backed by real usage (the Auki model).</div>
    </div>
  </Slide>,

  /* 12 TEAM */
  <Slide page={12} key="11">
    <Head kicker="Team" title="A 2-person team that ships hardware and software." />
    <div className="body">
      <div className="row stretch">
        {([["Ashok Jaiswal", "CEO · product & GTM · patent-holder (AI)", "/img/ashok.png"],
          ["Prithu Hazarika", "CTO · engineering, app & ML", "/img/prithu.png"],
          ["+ Contractors & interns", "hardware, design, growth", null]] as [string, string, string | null][]).map(([n2, r, img]) => (
          <div className="card grow center" key={n2} style={{ minHeight: 220 }}>
            {img ? <img className="avatar" src={img} alt={n2} />
              : <div className="avatar-paw"><img src="/img/paw.png" alt="" /></div>}
            <div className="ch" style={{ marginTop: 16, fontSize: 16 }}>{n2}</div>
            <div className="cb" style={{ fontSize: 12, marginTop: 5 }}>{r}</div>
          </div>
        ))}
      </div>
      <div className="callout" style={{ marginTop: 18 }}>
        <span className="k">Prior hardware exit — </span>
        Ashok crowdfunded EzeeCube on Indiegogo: $146,666 raised (196% of goal), 496 backers — then shipped, sold &amp; exited. This team has taken hardware from crowdfund to customers before.
      </div>
    </div>
  </Slide>,

  /* 13 TIMELINE */
  <Slide page={13} key="12">
    <Head kicker="Execution" title="Idea → working prototype in ~11 months." />
    <div className="body top">
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginTop: 30 }}>
        <figure style={{ margin: 0, textAlign: "center" }}>
          <img src="/img/proto-ball.jpg" alt="" style={{ height: 152, width: 218, objectFit: "contain", background: "#fff", borderRadius: 14, border: "1px solid var(--line)" }} />
          <figcaption style={{ fontSize: 11.5, color: "var(--sub)", marginTop: 8 }}>ESP-32 ball · 100 mm sphere</figcaption>
        </figure>
        <span className="chev" style={{ fontSize: 26 }}>›</span>
        <figure style={{ margin: 0, textAlign: "center" }}>
          <img src="/img/proto-print.jpg" alt="" style={{ height: 152, width: 218, objectFit: "cover", borderRadius: 14 }} />
          <figcaption style={{ fontSize: 11.5, color: "var(--sub)", marginTop: 8 }}>First 3D-printed units</figcaption>
        </figure>
        <span className="chev" style={{ fontSize: 26 }}>›</span>
        <figure style={{ margin: 0, textAlign: "center" }}>
          <video src="/media/pawme-move.mp4" poster="/media/pawme-move-poster.jpg" autoPlay muted loop playsInline
            style={{ height: 152, width: 218, objectFit: "cover", borderRadius: 14, boxShadow: "0 10px 28px rgba(34,23,16,.22)" }} />
          <figcaption style={{ fontSize: 11.5, color: "var(--deep)", fontWeight: 700, marginTop: 8 }}>Working units, today</figcaption>
        </figure>
      </div>
      <div className="note" style={{ marginTop: 18 }}>From a transparent rolling ball to working units — a 2-person team + specialist contractors.</div>
    </div>
  </Slide>,

  /* 14 REVENUE PROJECTIONS */
  <Slide page={14} key="rev-proj">
    <Head kicker="Revenue projections" title="$2.1M → $34M in five years — four revenue lines." />
    <div className="body top">
      <div className="row" style={{ alignItems: "flex-end", height: 296, padding: "0 6px 0", gap: 30, borderBottom: "2px solid var(--line)" }}>
        {REV.map((d) => {
          const total = d.hw + d.app + d.food + d.ins;
          return (
            <div key={d.y} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ fontFamily: "var(--head)", fontWeight: 800, color: "var(--deep)", fontSize: 16, marginBottom: 7 }}>${total.toFixed(1)}M</div>
              <div style={{ width: 70, height: 226, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                {STREAMS.map(([k, , color], si) => (
                  <div key={k} style={{ height: ((d as unknown as Record<string, number>)[k] / REV_MAX) * 226, background: color, borderTopLeftRadius: si === 0 ? 8 : 0, borderTopRightRadius: si === 0 ? 8 : 0 }} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="row" style={{ padding: "0 6px", gap: 30, marginTop: 8 }}>
        {REV.map((d) => (
          <div key={d.y} style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontFamily: "var(--head)", fontWeight: 800, color: "var(--ink)", fontSize: 14 }}>{d.y}</div>
            <div style={{ color: "var(--muted)", fontSize: 11 }}>{d.u} units</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 18, justifyContent: "center", marginTop: 16 }}>
        {STREAMS.slice().reverse().map(([k, label, color]) => (
          <div key={k} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "var(--sub)" }}>
            <span style={{ width: 12, height: 12, borderRadius: 4, background: color, display: "inline-block" }} /> {label}
          </div>
        ))}
      </div>
      <div className="note" style={{ marginTop: 14 }}>
        Conservative ramp: 5k → 80k units across four lines — hardware, subscription, food &amp; insurance brokerage — compounding past 2030.
      </div>
    </div>
  </Slide>,

  /* 15 ASK */
  <Slide page={15} key="14">
    <Head kicker="The ask" title="Raising $2M to scale from prototype to launch." />
    <div className="body">
      <div className="row stretch">
        <div className="card coral grow" style={{ minHeight: 256, justifyContent: "flex-start" }}>
          <div className="stat" style={{ fontSize: 40, color: "#fff" }}>$2M seed</div>
          <ul style={{ marginTop: 18, paddingLeft: 18, color: "#FCE4DB", fontSize: 13.5, lineHeight: 1.95 }}>
            <li>Scale production + first thousands of units</li>
            <li>Grow paid-social (proven CAC $8–22)</li>
            <li>Build the health-data pipeline + insurer deals</li>
            <li><b style={{ color: "#fff" }}>Equity or token</b>{" "}— finalizing structure with our advisors</li>
          </ul>
        </div>
        <div className="card grow" style={{ minHeight: 256 }}>
          <div style={{ fontFamily: "var(--head)", fontWeight: 700, color: "var(--deep)", fontSize: 15, marginBottom: 18 }}>Use of funds</div>
          <Bars rows={[["Marketing", 30], ["Inventory", 25], ["Wages", 25], ["R&D", 15], ["Tooling", 5]] as [string, number][]} />
          <div style={{ fontStyle: "italic", color: "var(--muted)", fontSize: 11, marginTop: 10 }}>Per the financial model — self-funded to date.</div>
        </div>
      </div>
    </div>
  </Slide>,

  /* 16 VISION */
  <Slide dark key="15">
    <div className="botrule" />
    <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center", gap: 16 }}>
      <img src="/img/robot.png" alt="PawMe" style={{ height: 176 }} />
      <div className="title" style={{ textAlign: "center", fontSize: 36, maxWidth: 840 }}>The pet-health data network for every home.</div>
      <div style={{ color: C, fontSize: 18, fontWeight: 600 }}>Real device. Real revenue. An open platform underneath.</div>
      <div style={{ color: "#C9B8AC", fontSize: 14, marginTop: 6 }}>PawMe — the product · OpenPaw — the open platform · @PawMe</div>
      <div style={{ fontFamily: "var(--head)", fontWeight: 800, color: "#fff", fontSize: 17, marginTop: 8 }}>Let&apos;s build it.</div>
    </div>
  </Slide>,
];
