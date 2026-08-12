import Link from "next/link";
import type { Metadata } from "next";
import { getTimeline, getOffices, getTeam, asStringArray } from "@/lib/content";
import { COPY, emphasize } from "@/lib/copy";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/about", "About Supreme One Software — A studio that also runs what it builds");
}

export default async function AboutPage() {
  const [timeline, offices, team] = await Promise.all([getTimeline(), getOffices(), getTeam()]);
  const hero = COPY.aboutHero;
  const h = emphasize(hero.heading, "runs");

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
          <p className="lede" style={{ marginTop: 30, maxWidth: "62ch" }} data-reveal data-delay="0.14">
            {hero.story}
          </p>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="section section-line" style={{ background: "var(--paper3)" }}>
        <div className="container">
          <span className="eyebrow" data-reveal>
            Principles
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            How we <em>work</em>.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
              gap: 18,
              marginTop: "clamp(36px, 5vw, 64px)",
            }}
          >
            {COPY.principles.map((p, i) => (
              <div
                key={p.position}
                data-card
                data-reveal
                data-delay={0.05 * i}
                style={{
                  background: "var(--paper2)",
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                  padding: "26px 24px",
                }}
              >
                <div className="sheen" aria-hidden="true" />
                <div style={{ fontSize: 12, color: "var(--accent)", fontVariantNumeric: "tabular-nums", marginBottom: 14 }}>
                  {String(p.position).padStart(2, "0")}
                </div>
                <div className="h3 serif">{p.title}</div>
                <p style={{ color: "var(--muted)", fontSize: 14.5, marginTop: 10, lineHeight: 1.55 }}>{p.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section section-line">
        <div className="container" style={{ maxWidth: 880 }}>
          <span className="eyebrow" data-reveal>
            Timeline
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            From four engineers to <em>140</em>.
          </h2>
          <div style={{ marginTop: "clamp(30px, 4vw, 52px)", borderTop: "1px solid var(--line)" }}>
            {timeline.map((t, i) => (
              <div
                key={t.id}
                data-reveal
                data-delay={0.05 * i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "clamp(72px, 12vw, 120px) 1fr",
                  gap: "clamp(14px, 3vw, 36px)",
                  alignItems: "baseline",
                  padding: "clamp(18px, 2.6vw, 26px) 6px",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <span className="serif" style={{ color: "var(--accent)", fontSize: "clamp(22px, 2.6vw, 30px)", lineHeight: 1 }}>
                  {t.year}
                </span>
                <span>
                  {t.title && (
                    <span style={{ display: "block", fontWeight: 500, marginBottom: 4 }}>{t.title}</span>
                  )}
                  <span style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.55 }}>{t.copy}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Offices ── */}
      <section className="section section-line" style={{ background: "var(--paper3)" }}>
        <div className="container">
          <span className="eyebrow" data-reveal>
            Offices
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            One team, <em>one</em> address.
          </h2>
          <p className="lede" style={{ marginTop: 22, maxWidth: "62ch" }} data-reveal data-delay="0.12">
            Engineering, solution consulting and support all under one roof in Bengaluru.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
              gap: 18,
              marginTop: "clamp(30px, 4vw, 52px)",
            }}
          >
            {offices.map((o, i) => (
              <div
                key={o.id}
                data-card
                data-reveal
                data-delay={0.05 * i}
                style={{
                  background: "var(--paper2)",
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                  padding: "26px 24px",
                }}
              >
                <div className="sheen" aria-hidden="true" />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <h3 className="h3 serif">{o.city}</h3>
                  {o.tag && (
                    <span
                      style={{
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        fontWeight: 600,
                        color: "var(--accent)",
                        border: "1px solid currentColor",
                        borderRadius: 999,
                        padding: "3px 10px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {o.tag}
                    </span>
                  )}
                </div>
                <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 6 }}>{o.country}</div>
                <div style={{ marginTop: 16, borderTop: "1px solid var(--line)", paddingTop: 14 }}>
                  {asStringArray(o.addressLines).map((line) => (
                    <div key={line} style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6 }}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Leadership ── */}
      <section className="section section-line">
        <div className="container">
          <span className="eyebrow" data-reveal>
            Leadership
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            Who you’ll actually <em>talk</em> to.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
              gap: 18,
              marginTop: "clamp(36px, 5vw, 64px)",
            }}
          >
            {team.map((m, i) => (
              <div
                key={m.id}
                data-card
                data-reveal
                data-delay={0.05 * i}
                style={{
                  background: "var(--paper2)",
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                  padding: "26px 24px",
                }}
              >
                <div className="sheen" aria-hidden="true" />
                <div className="h3 serif">{m.name}</div>
                <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>{m.role}</div>
                {m.bio && (
                  <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 12, lineHeight: 1.55 }}>{m.bio}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Careers CTA ── */}
      <section className="section section-line" style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="eyebrow" data-reveal>
            Careers
          </span>
          <h2 className="h2" style={{ margin: "18px auto 0" }} data-reveal data-delay="0.06">
            We’re hiring <em>senior</em> engineers.
          </h2>
          <p style={{ color: "rgba(246,244,240,0.7)", fontSize: 15.5, marginTop: 20 }} data-reveal data-delay="0.12">
            Bengaluru and remote. No bureaucracy, real ownership.
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 36 }} data-reveal data-delay="0.18">
            <Link href="/contact" className="btn btn-accent" data-magnet>
              See open roles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
