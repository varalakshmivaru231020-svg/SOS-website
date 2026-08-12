import Link from "next/link";
import type { Metadata } from "next";
import { getCaseStudies, getIndustries, asStringArray, asMetrics } from "@/lib/content";
import { COPY, emphasize } from "@/lib/copy";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/work", "Work — Supreme One Software");
}

export default async function WorkPage() {
  const [caseStudies, industries] = await Promise.all([getCaseStudies(), getIndustries()]);
  const hero = COPY.workHero;
  const h = emphasize(hero.heading, "running");
  const numbers = emphasize("Across every engagement.", "every");

  return (
    <>
      {/* ── Hero ── */}
      <section className="section" data-scrub style={{ position: "relative", overflow: "hidden" }}>
        <div className="glow glow-accent" data-par="0.07" style={{ width: 420, height: 420, top: -120, right: "8%" }} />
        <div className="glow glow-indigo" data-par="0.11" style={{ width: 380, height: 380, bottom: -100, left: "-4%" }} />
        <div className="container">
          <span className="eyebrow" data-reveal>
            {hero.eyebrow}
          </span>
          <h1 className="display" data-lines data-reveal data-delay="0.06">
            {h.pre}
            <em>{h.em}</em>
            {h.post}
          </h1>
          {hero.sub && (
            <p className="lede" style={{ marginTop: 30 }} data-reveal data-delay="0.14">
              {hero.sub}
            </p>
          )}
        </div>
      </section>

      {/* ── Case studies ── */}
      <section className="section section-line">
        <div className="container" style={{ display: "grid", gap: "clamp(24px, 4vw, 44px)" }}>
          {caseStudies.map((c, i) => (
            <article
              key={c.id}
              data-card
              data-reveal
              data-delay={0.06 * i}
              style={{
                background: "var(--paper2)",
                border: "1px solid var(--line)",
                borderRadius: 18,
                padding: "clamp(28px, 4vw, 52px)",
              }}
            >
              <div className="sheen" aria-hidden="true" />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 16,
                  flexWrap: "wrap",
                  marginBottom: 18,
                }}
              >
                <span style={{ fontSize: 13, color: "var(--accent)", fontVariantNumeric: "tabular-nums" }}>
                  {String(c.position).padStart(2, "0")}
                </span>
                <span style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {asStringArray(c.tags).map((t) => (
                    <span
                      key={t}
                      style={{
                        border: "1px solid var(--line)",
                        borderRadius: 999,
                        padding: "5px 14px",
                        fontSize: 12.5,
                        color: "var(--muted)",
                        background: "var(--paper)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </span>
              </div>
              <h2 className="serif" style={{ fontSize: "clamp(30px, 4.2vw, 54px)", lineHeight: 1.02 }}>
                {c.client}
              </h2>
              <p style={{ color: "var(--muted)", fontSize: 15.5, lineHeight: 1.65, marginTop: 16, maxWidth: "62ch" }}>
                {c.copy}
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 24,
                  marginTop: "clamp(24px, 3vw, 38px)",
                  borderTop: "1px solid var(--line)",
                  paddingTop: 26,
                }}
              >
                {asMetrics(c.metrics).map((m, j) => (
                  <div key={m.label} data-reveal data-delay={0.06 * j}>
                    <div className="serif" data-count style={{ fontSize: "clamp(28px, 3.2vw, 42px)", lineHeight: 1 }}>
                      {m.value}
                    </div>
                    <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 8 }}>{m.label}</div>
                  </div>
                ))}
              </div>
            </article>
          ))}

          {/* Quiet line */}
          <div style={{ textAlign: "center", marginTop: 10 }} data-reveal>
            <Link href="/contact" className="btn btn-ghost" data-magnet>
              Ask for the full case study →
            </Link>
          </div>
        </div>
      </section>

      {/* ── By the numbers ── */}
      <section className="section section-line" style={{ background: "var(--paper3)" }}>
        <div className="container">
          <span className="eyebrow" data-reveal>
            By the numbers
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            {numbers.pre}
            <em>{numbers.em}</em>
            {numbers.post}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 24,
              marginTop: "clamp(36px, 5vw, 64px)",
              borderTop: "1px solid var(--line)",
              paddingTop: 34,
            }}
          >
            {COPY.workStats.map((s, i) => (
              <div key={s.label} data-reveal data-delay={0.08 * i}>
                <div className="serif" data-count style={{ fontSize: "clamp(30px, 3.6vw, 46px)", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="section section-line">
        <div className="container">
          <span className="eyebrow" data-reveal>
            Industries we serve
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
            {industries.map((ind, i) => (
              <span
                key={ind.id}
                data-reveal
                data-delay={0.04 * i}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 999,
                  padding: "10px 22px",
                  fontSize: 14.5,
                  background: "var(--paper2)",
                }}
              >
                {ind.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="section section-line" style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="h2" style={{ margin: "0 auto" }} data-reveal>
            Let&rsquo;s build something <em>alive</em>.
          </h2>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 36 }} data-reveal data-delay="0.1">
            <Link href="/contact" className="btn btn-accent" data-magnet>
              Book a discovery call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
