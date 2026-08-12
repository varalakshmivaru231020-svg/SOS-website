import Link from "next/link";
import type { Metadata } from "next";
import { getTrustBadges } from "@/lib/content";
import { COPY, emphasize } from "@/lib/copy";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/platform", "Platform — One layer under every conversation");
}

const CHANNELS = ["WhatsApp", "SMS", "RCS", "Voice / IVR", "Email", "Web & in-app"];

const LAYERS = [
  { title: "Intelligence", sub: "Intent, sentiment, summary, copilot drafts, voice agents." },
  { title: "Agent workspace", sub: "Unified inbox, queues, SLA timers, macros." },
  { title: "Analytics", sub: "Delivery, cost, CSAT, containment, per-channel funnels." },
  { title: "Integrations", sub: "CRM, ERP, helpdesk, data warehouse, webhooks." },
];

export default async function PlatformPage() {
  const badges = await getTrustBadges();
  const p = COPY.platformSections;
  const h = emphasize(p.hero.heading, "conversation");

  // The developers copy carries the heading, the node snippet and the four
  // chips as one block — split it back into its parts.
  const devLines = p.developers.split("\n");
  const devHeading = devLines[0];
  const devH = emphasize(devHeading, "five");
  const devCode = devLines.slice(1, devLines.length - 4).join("\n");
  const devChips = devLines.slice(-4).map((line) => {
    const cut = line.indexOf(": ");
    return { label: line.slice(0, cut), text: line.slice(cut + 2) };
  });

  const trustH = emphasize("Built for regulated traffic.", "regulated");
  const statusH = emphasize("The last 12 months, honestly.", "honestly");
  const switchH = emphasize("Migrating from another provider is routine.", "routine");

  return (
    <>
      {/* ── Hero + architecture ── */}
      <section className="section" data-scrub style={{ position: "relative", overflow: "hidden" }}>
        <div className="glow glow-accent" data-par="0.07" style={{ width: 420, height: 420, top: -120, right: "8%" }} />
        <div className="glow glow-indigo" data-par="0.11" style={{ width: 380, height: 380, bottom: -100, left: "-4%" }} />
        <div className="container">
          <span className="eyebrow" data-reveal>
            {p.hero.eyebrow}
          </span>
          <h1 className="display" data-lines data-reveal data-delay="0.06">
            {h.pre}
            <em>{h.em}</em>
            {h.post}
          </h1>
          <p className="lede" style={{ marginTop: 30 }} data-reveal data-delay="0.14">
            {p.hero.sub}
          </p>

          {/* CSS-built architecture diagram */}
          <div style={{ marginTop: "clamp(44px, 6vw, 80px)" }} data-par="0.04">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                gap: 10,
              }}
            >
              {CHANNELS.map((c, i) => (
                <div
                  key={c}
                  data-reveal
                  data-delay={0.05 * i}
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: 12,
                    background: "var(--paper2)",
                    padding: "13px 10px",
                    textAlign: "center",
                    fontSize: 14,
                  }}
                >
                  {c}
                </div>
              ))}
            </div>
            <div
              aria-hidden="true"
              data-reveal
              data-delay="0.28"
              style={{ textAlign: "center", color: "var(--accent)", fontSize: 22, padding: "10px 0" }}
            >
              ↓
            </div>
            <div
              data-card
              data-reveal
              data-delay="0.32"
              style={{
                background: "var(--accent)",
                color: "#fff",
                borderRadius: 14,
                padding: "22px 20px",
                textAlign: "center",
              }}
            >
              <div className="sheen" aria-hidden="true" />
              <div className="h3 serif">Orchestration engine</div>
              <div style={{ fontSize: 13, opacity: 0.85, marginTop: 8, letterSpacing: "0.02em" }}>
                routing · retries · fallback chains · rate shaping · journey logic
              </div>
            </div>
            <div
              aria-hidden="true"
              data-reveal
              data-delay="0.36"
              style={{ textAlign: "center", color: "var(--accent)", fontSize: 22, padding: "10px 0" }}
            >
              ↓
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 12,
              }}
            >
              {LAYERS.map((l, i) => (
                <div
                  key={l.title}
                  data-card
                  data-reveal
                  data-delay={0.4 + 0.06 * i}
                  style={{
                    border: "1px solid var(--line)",
                    borderRadius: 14,
                    background: "var(--paper2)",
                    padding: "20px 18px",
                  }}
                >
                  <div className="sheen" aria-hidden="true" />
                  <div className="serif" style={{ fontSize: 18 }}>
                    {l.title}
                  </div>
                  <p style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 8, lineHeight: 1.55 }}>{l.sub}</p>
                </div>
              ))}
            </div>
            <p
              data-reveal
              data-delay="0.5"
              style={{ color: "var(--muted)", fontSize: 13, marginTop: 20, maxWidth: "88ch", lineHeight: 1.6, fontStyle: "italic" }}
            >
              {p.architectureNote}
            </p>
          </div>
        </div>
      </section>

      {/* ── Trust ── */}
      <section className="section section-line" style={{ background: "var(--paper3)" }}>
        <div className="container">
          <span className="eyebrow" data-reveal>
            Trust
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            {trustH.pre}
            <em>{trustH.em}</em>
            {trustH.post}
          </h2>
          <p className="lede" style={{ marginTop: 24 }} data-reveal data-delay="0.12">
            Encryption in transit and at rest, regional residency in India, UAE, Singapore and the EU, granular
            retention windows, and consent state tracked per channel per customer.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: 14,
              marginTop: "clamp(30px, 4vw, 52px)",
            }}
          >
            {badges.map((b, i) => (
              <div
                key={b.id}
                data-card
                data-reveal
                data-delay={0.05 * i}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 14,
                  background: "var(--paper2)",
                  padding: "22px 18px",
                }}
              >
                <div className="sheen" aria-hidden="true" />
                <div className="serif" style={{ fontSize: 22, lineHeight: 1 }}>
                  {b.label}
                </div>
                {b.sublabel && <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 8 }}>{b.sublabel}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Developers ── */}
      <section className="section section-line">
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "clamp(32px, 5vw, 72px)",
            alignItems: "center",
          }}
        >
          <div>
            <span className="eyebrow" data-reveal>
              Developers
            </span>
            <h2 className="h2" data-lines data-reveal data-delay="0.06">
              {devH.pre}
              <em>{devH.em}</em>
              {devH.post}
            </h2>
            <div style={{ display: "grid", gap: 14, marginTop: 30 }}>
              {devChips.map((c, i) => (
                <div key={c.label} data-reveal data-delay={0.06 * i} style={{ display: "flex", gap: 14, alignItems: "baseline" }}>
                  <span
                    style={{
                      border: "1px solid var(--line)",
                      borderRadius: 999,
                      padding: "5px 14px",
                      fontSize: 12.5,
                      background: "var(--paper2)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.label}
                  </span>
                  <span style={{ color: "var(--muted)", fontSize: 14.5 }}>{c.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal data-delay="0.1" data-par="0.05">
            <div
              data-card
              style={{
                background: "var(--ink)",
                color: "#ece9e2",
                borderRadius: 18,
                padding: 24,
                border: "1px solid var(--line)",
              }}
            >
              <div className="sheen" aria-hidden="true" />
              <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.65, fontSize: 12, marginBottom: 18 }}>
                <span>POST api.supremeonesoftware.com/v2/messages</span>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>200 OK</span>
              </div>
              <pre
                style={{
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                  fontSize: 13,
                  lineHeight: 1.7,
                  whiteSpace: "pre",
                  overflowX: "auto",
                  margin: 0,
                }}
              >
                {devCode}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── Status ── */}
      <section className="section section-line" style={{ background: "var(--paper3)" }}>
        <div className="container">
          <span className="eyebrow" data-reveal>
            Status
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            {statusH.pre}
            <em>{statusH.em}</em>
            {statusH.post}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 24,
              marginTop: "clamp(36px, 5vw, 60px)",
              borderTop: "1px solid var(--line)",
              paddingTop: 34,
            }}
          >
            {p.statusStats.map((s, i) => (
              <div key={s.label} data-reveal data-delay={0.08 * i}>
                <div className="serif" data-count style={{ fontSize: "clamp(30px, 3.6vw, 46px)", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--muted)", fontSize: 13.5, marginTop: 28 }} data-reveal data-delay="0.34">
            Full incident history and live status at status.supremeonesoftware.com.
          </p>
        </div>
      </section>

      {/* ── Switching over ── */}
      <section className="section section-line">
        <div className="container">
          <span className="eyebrow" data-reveal>
            Switching over
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            {switchH.pre}
            <em>{switchH.em}</em>
            {switchH.post}
          </h2>
          <p className="lede" style={{ marginTop: 24 }} data-reveal data-delay="0.12">
            Templates, contacts and number porting move in parallel with your existing vendor until we cut over — no
            downtime window, no re-verification from scratch.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
              marginTop: "clamp(36px, 5vw, 60px)",
            }}
          >
            {p.migrationSteps.map((step, i) => (
              <div
                key={step.position}
                data-card
                data-reveal
                data-delay={0.08 * i}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                  background: "var(--paper2)",
                  padding: "26px 24px",
                }}
              >
                <div className="sheen" aria-hidden="true" />
                <span style={{ fontSize: 13, color: "var(--accent)", fontVariantNumeric: "tabular-nums" }}>
                  {String(step.position).padStart(2, "0")}
                </span>
                <div className="h3 serif" style={{ marginTop: 12 }}>
                  {step.title}
                </div>
                <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 10, lineHeight: 1.55 }}>{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="section section-line" style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="h2" style={{ margin: "0 auto" }} data-reveal>
            One layer under every <em>conversation</em>.
          </h2>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 36 }} data-reveal data-delay="0.1">
            <Link href="/contact" className="btn btn-accent" data-magnet>
              Book a discovery call
            </Link>
            <Link href="/products" className="btn" style={{ border: "1px solid rgba(246,244,240,0.3)", color: "var(--paper)" }} data-magnet>
              See products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
