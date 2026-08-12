import Link from "next/link";
import type { Metadata } from "next";
import {
  getServices,
  getPricing,
  getFaqGroup,
  getStack,
  getQualityGates,
  asStringArray,
} from "@/lib/content";
import { COPY, emphasize } from "@/lib/copy";
import { pageMetadata } from "@/lib/seo";
import FaqAccordion from "@/components/site/FaqAccordion";
import ServiceSlider from "@/components/site/ServiceSlider";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/services", "Services — Engineering teams that ship weekly");
}

export default async function ServicesPage() {
  const [services, tiers, faq, stack, gates] = await Promise.all([
    getServices(),
    getPricing("ENGAGEMENT"),
    getFaqGroup("services"),
    getStack(),
    getQualityGates(),
  ]);
  const hero = COPY.servicesHero;
  const h = emphasize(hero.heading, "weekly");
  const cta = emphasize(COPY.contactHero.heading, "problem");
  const faqH = faq ? emphasize(faq.title) : null;

  return (
    <>
      {/* ── Hero ── */}
      <section className="section" data-scrub style={{ position: "relative", overflow: "hidden" }}>
        <div className="glow glow-accent" data-par="0.07" style={{ width: 420, height: 420, top: -120, right: "10%" }} />
        <div className="container">
          <span className="eyebrow" data-reveal>
            {hero.eyebrow}
          </span>
          <h1 className="display" data-lines data-reveal data-delay="0.06">
            {h.pre}
            <em>{h.em}</em>
            {h.post}
          </h1>
          <p className="lede" style={{ marginTop: 30 }} data-reveal data-delay="0.14">
            {hero.sub}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 36 }}>
            {COPY.heroPills.map((pill: string, i: number) => (
              <span
                key={pill}
                data-reveal
                data-delay={0.18 + 0.05 * i}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 999,
                  padding: "10px 22px",
                  fontSize: 14.5,
                  background: "var(--paper2)",
                }}
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Five service blocks, all on one row ── */}
      <section className="section section-line">
        <div className="container">
          <span className="eyebrow" data-reveal>
            Services
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            Five disciplines, one engineering <em>rhythm</em>.
          </h2>
          <div style={{ marginTop: "clamp(36px, 5vw, 64px)" }} data-reveal data-delay="0.1">
            <ServiceSlider>
              {services.map((s) => {
                const t = emphasize(s.title);
                return (
                  <article key={s.id} className="svc-card" data-card>
                    <div className="sheen" aria-hidden="true" />
                    <span
                      className="eyebrow"
                      style={{ color: "var(--accent)", fontVariantNumeric: "tabular-nums", marginBottom: 14 }}
                    >
                      {s.number}
                    </span>
                    <h2 className="h3">
                      {t.pre}
                      <em>{t.em}</em>
                      {t.post}
                    </h2>
                    <p className="svc-copy" style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6, marginTop: 14 }}>
                      {s.copy}
                    </p>
                    {/* Four tags keeps every card to two rows of pills. */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
                      {asStringArray(s.techTags)
                        .slice(0, 4)
                        .map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontSize: 12.5,
                              color: "var(--muted)",
                              border: "1px solid var(--line)",
                              borderRadius: 999,
                              padding: "5px 14px",
                              background: "var(--paper)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                    </div>
                    <div
                      className="svc-foot"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "baseline",
                        gap: "6px 12px",
                        marginTop: "clamp(20px, 2.4vw, 28px)",
                        borderTop: "1px solid var(--line)",
                        paddingTop: 16,
                      }}
                    >
                      <span className="eyebrow" style={{ margin: 0 }}>
                        Timeline
                      </span>
                      <span style={{ fontSize: 14, color: "var(--muted)" }}>
                        {s.timeline}
                        {s.priceInr && s.priceUsd ? (
                          <>
                            {" · "}
                            <span style={{ color: "var(--ink)", fontWeight: 500 }}>
                              {s.priceInr} / {s.priceUsd}
                            </span>
                          </>
                        ) : null}
                      </span>
                    </div>
                  </article>
                );
              })}
            </ServiceSlider>
          </div>
        </div>
      </section>

      {/* ── How we engage ── */}
      <section className="section section-line">
        <div className="container">
          <span className="eyebrow" data-reveal>
            How we engage
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            <em>Three</em> ways to work with us.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
              marginTop: "clamp(36px, 5vw, 64px)",
            }}
          >
            {tiers.map((tier, i) => (
              <div
                key={tier.id}
                data-card
                data-reveal
                data-delay={0.06 * i}
                style={{
                  background: "var(--paper2)",
                  border: tier.highlighted ? "1px solid var(--accent)" : "1px solid var(--line)",
                  borderRadius: 16,
                  padding: "28px 26px",
                  position: "relative",
                }}
              >
                <div className="sheen" aria-hidden="true" />
                {tier.priceNote && (
                  <span
                    style={{
                      position: "absolute",
                      top: -12,
                      left: 24,
                      fontSize: 10,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      fontWeight: 600,
                      color: "var(--paper)",
                      background: "var(--accent)",
                      borderRadius: 999,
                      padding: "4px 12px",
                    }}
                  >
                    {tier.priceNote}
                  </span>
                )}
                <div className="h3 serif">{tier.name}</div>
                <div style={{ fontSize: 15, marginTop: 10, fontWeight: 500 }}>{tier.price}</div>
                <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 12, lineHeight: 1.6 }}>{tier.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {faq && faqH && (
        <section className="section section-line" style={{ background: "var(--paper3)" }}>
          <div className="container" style={{ maxWidth: 880 }}>
            <span className="eyebrow" data-reveal>
              Questions
            </span>
            <h2 className="h2" data-lines data-reveal data-delay="0.06">
              {faqH.pre}
              <em>{faqH.em}</em>
              {faqH.post}
            </h2>
            <div style={{ marginTop: "clamp(24px, 4vw, 44px)" }} data-reveal data-delay="0.1">
              <FaqAccordion items={faq.items.map((i) => ({ id: i.id, question: i.question, answer: i.answer }))} />
            </div>
          </div>
        </section>
      )}

      {/* ── Our stack ── */}
      <section className="section section-line">
        <div className="container">
          <span className="eyebrow" data-reveal>
            Our stack
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            Boring where it counts, <em>sharp</em> where it matters.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
              marginTop: "clamp(36px, 5vw, 64px)",
            }}
          >
            {stack.map((item, i) => (
              <div
                key={item.id}
                data-reveal
                data-delay={0.05 * i}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                  padding: "22px 22px",
                  background: "var(--paper2)",
                }}
              >
                <div className="h3 serif">{item.name}</div>
                <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8, lineHeight: 1.55 }}>{item.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quality bar ── */}
      <section className="section section-line" style={{ background: "var(--paper3)" }}>
        <div className="container">
          <span className="eyebrow" data-reveal>
            Quality bar
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            Nothing ships without <em>these</em>.
          </h2>
          <p className="lede" style={{ marginTop: 22 }} data-reveal data-delay="0.1">
            A release gate every build passes through before it reaches a customer, on every engagement type.
          </p>
          <div className="kpi-grid" style={{ marginTop: "clamp(30px, 4vw, 52px)" }}>
            {gates.map((g, i) => (
              <div key={g.id} className="kpi-card" data-card data-reveal data-delay={0.05 * i}>
                <div className="sheen" aria-hidden="true" />
                <span className="kpi-tile">{String(i + 1).padStart(2, "0")}</span>
                <span className="serif" style={{ fontSize: 19, lineHeight: 1.15 }}>
                  {g.title}
                </span>
                <span className="kpi-copy">{g.copy}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── End CTA ── */}
      <section className="section section-line" style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="h2" style={{ margin: "0 auto" }} data-reveal>
            {cta.pre}
            <em>{cta.em}</em>
            {cta.post}
          </h2>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 36 }} data-reveal data-delay="0.1">
            <Link href="/contact" className="btn btn-accent" data-magnet>
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
