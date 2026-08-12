import Link from "next/link";
import type { Metadata } from "next";
import {
  getServices,
  getProducts,
  getHeroStats,
  getIndustries,
  getTestimonial,
  getComparisonRows,
  getClientLogos,
  getFaqGroup,
  asStringArray,
  asMetrics,
} from "@/lib/content";
import { COPY, emphasize } from "@/lib/copy";
import { pageMetadata } from "@/lib/seo";
import FaqAccordion from "@/components/site/FaqAccordion";
import ServiceSlider from "@/components/site/ServiceSlider";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/", "Supreme One Software — We build the software that speaks for your business");
}

export default async function HomePage() {
  const [services, products, stats, industries, testimonial, comparison, logos, faq] = await Promise.all([
    getServices(),
    getProducts(),
    getHeroStats(),
    getIndustries(),
    getTestimonial(),
    getComparisonRows(),
    getClientLogos(),
    getFaqGroup("home"),
  ]);
  const hero = COPY.homeHero;
  const h = emphasize(hero.heading, "speaks");

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
          <p className="lede" style={{ marginTop: 30 }} data-reveal data-delay="0.14">
            {hero.sub}
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 38 }} data-reveal data-delay="0.2">
            <Link href="/services" className="btn btn-solid" data-magnet>
              {hero.ctaPrimary}
            </Link>
            <Link href="/products" className="btn btn-ghost" data-magnet>
              {hero.ctaSecondary}
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: 24,
              marginTop: "clamp(48px, 7vw, 90px)",
              borderTop: "1px solid var(--line)",
              paddingTop: 34,
            }}
          >
            {stats.map((s, i) => (
              <div key={s.id} data-reveal data-delay={0.08 * i}>
                <div className="serif" data-count style={{ fontSize: "clamp(30px, 3.6vw, 46px)", lineHeight: 1 }}>
                  {s.value}
                </div>
                <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 8 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="marquee" aria-hidden="true">
        <div className="track">
          {[0, 1].map((dup) => (
            <span key={dup} style={{ display: "inline-flex", gap: 48 }}>
              {COPY.marqueeItems.map((item: string) => (
                <span key={item} className="item">
                  {item}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── Services ── */}
      <section className="section">
        <div className="container">
          <span className="eyebrow" data-reveal>
            Services
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            Five disciplines, <em>one</em> engineering rhythm.
          </h2>
          <div style={{ marginTop: "clamp(36px, 5vw, 64px)" }} data-reveal data-delay="0.1">
            <ServiceSlider>
              {services.map((s) => (
                <Link key={s.id} href="/services" className="svc-card" data-card>
                  <div className="sheen" aria-hidden="true" />
                  <span style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <span style={{ fontSize: 13, color: "var(--accent)", fontVariantNumeric: "tabular-nums" }}>
                      {s.number}
                    </span>
                    <span aria-hidden="true" style={{ color: "var(--accent)", fontSize: 20 }}>
                      →
                    </span>
                  </span>
                  <span className="h3 serif" style={{ display: "block", marginTop: 12 }}>
                    {s.title}
                  </span>
                  <span
                    className="svc-copy svc-foot"
                    style={{ color: "var(--muted)", fontSize: 14, display: "block", marginTop: 10, paddingTop: 0 }}
                  >
                    {asStringArray(s.techTags).join(" · ")}
                  </span>
                </Link>
              ))}
            </ServiceSlider>
          </div>
          <div style={{ marginTop: 28 }} data-reveal>
            <Link href="/services" className="btn btn-ghost" data-magnet>
              All services →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section className="section section-line" style={{ background: "var(--paper3)" }}>
        <div className="container">
          <span className="eyebrow" data-reveal>
            Products
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            Six products your <em>customers</em> already live inside.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: 18,
              marginTop: "clamp(36px, 5vw, 64px)",
            }}
          >
            {products.map((p, i) => (
              <Link
                key={p.id}
                href="/products"
                data-card
                data-reveal
                data-delay={0.05 * i}
                style={{
                  background: "var(--paper2)",
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                  padding: "26px 24px",
                  display: "block",
                }}
              >
                <div className="sheen" aria-hidden="true" />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 12, color: "var(--muted)", fontVariantNumeric: "tabular-nums" }}>
                    {String(p.position).padStart(2, "0")}
                  </span>
                  {p.badge && (
                    <span
                      style={{
                        fontSize: 10,
                        textTransform: "uppercase",
                        letterSpacing: "0.14em",
                        fontWeight: 600,
                        color: p.badge === "Live" ? "var(--good)" : "var(--accent)",
                        border: "1px solid currentColor",
                        borderRadius: 999,
                        padding: "3px 10px",
                      }}
                    >
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="h3 serif">{p.title}</div>
                <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 10, lineHeight: 1.55 }}>
                  {asStringArray(p.bullets)[0]}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Platform preview ── */}
      <section className="section section-line">
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(32px, 5vw, 72px)", alignItems: "center" }}>
          <div>
            <span className="eyebrow" data-reveal>
              The platform
            </span>
            <h2 className="h2" data-lines data-reveal data-delay="0.06">
              Every conversation, <em>one</em> intelligent thread.
            </h2>
            <ul style={{ listStyle: "none", marginTop: 30, display: "grid", gap: 16 }}>
              {["Sub-second routing across WhatsApp, RCS, SMS and voice", "Regional data residency — India, UAE, Singapore, EU", "Drop-in SDKs for web, iOS, Android and server"].map((b, i) => (
                <li key={b} data-reveal data-delay={0.06 * i} style={{ display: "flex", gap: 12, color: "var(--muted)", fontSize: 15 }}>
                  <span style={{ color: "var(--accent)" }}>✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 30 }} data-reveal>
              <Link href="/platform" className="btn btn-solid" data-magnet>
                How the platform works
              </Link>
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
                fontSize: 13.5,
                border: "1px solid var(--line)",
              }}
            >
              <div className="sheen" aria-hidden="true" />
              <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.65, fontSize: 12, marginBottom: 18 }}>
                <span>Live thread · #48213</span>
                <span style={{ fontVariantNumeric: "tabular-nums" }}>00:41</span>
              </div>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: "12px 12px 12px 4px", padding: "10px 14px", maxWidth: "85%" }}>
                  Hi — my order 7741 hasn&apos;t arrived yet. WhatsApp
                </div>
                <div style={{ background: "var(--accent)", borderRadius: "12px 12px 4px 12px", padding: "10px 14px", maxWidth: "85%", justifySelf: "end" }}>
                  It left the hub this morning — arriving today by 6 pm. Want live tracking? · Copilot
                </div>
                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 12, padding: "10px 14px", maxWidth: "85%" }}>
                  <div style={{ fontSize: 11, opacity: 0.65, marginBottom: 4 }}>RCS rich card</div>
                  Order 7741 · Out for delivery — Track · Reschedule
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, opacity: 0.7, fontSize: 12 }}>
                  <span
                    aria-hidden="true"
                    style={{ display: "inline-flex", gap: 2, alignItems: "flex-end", height: 14 }}
                  >
                    {[0.5, 0.9, 0.6, 1, 0.7].map((sc, i) => (
                      <i
                        key={i}
                        style={{
                          width: 3,
                          height: 14,
                          background: "var(--accent)",
                          transformOrigin: "50% 100%",
                          animation: `riseBar 1.1s ${i * 0.12}s ease-in-out infinite`,
                          display: "inline-block",
                        }}
                      />
                    ))}
                  </span>
                  Voice follow-up · IVR queue 2 · Sentiment: positive · Intent: delivery status
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="section section-line">
        <div className="container">
          <span className="eyebrow" data-reveal>
            Industries
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 18 }}>
            {industries
              .filter((i) => i.showOnHome)
              .map((ind, i) => (
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

      {/* ── Testimonial ── */}
      {testimonial && (
        <section className="section section-line" style={{ background: "var(--paper3)" }}>
          <div className="container" style={{ maxWidth: 980 }}>
            <blockquote data-reveal>
              <p className="serif" style={{ fontSize: "clamp(24px, 3.4vw, 40px)", lineHeight: 1.2 }}>
                “{testimonial.quote}”
              </p>
              <footer style={{ marginTop: 24, color: "var(--muted)", fontSize: 14.5 }}>
                <b style={{ color: "var(--ink)", fontWeight: 500 }}>{testimonial.author}</b> — {testimonial.role},{" "}
                {testimonial.company}
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      {/* ── CTA band ── */}
      <section className="section section-line" style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="h2" style={{ margin: "0 auto" }} data-reveal>
            Let’s build something <em>alive</em>.
          </h2>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 36 }} data-reveal data-delay="0.1">
            <Link href="/contact" className="btn btn-accent" data-magnet>
              Book a discovery call
            </Link>
            <Link href="/work" className="btn" style={{ border: "1px solid rgba(246,244,240,0.3)", color: "var(--paper)" }} data-magnet>
              See our work
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Supreme One Software ── */}
      <section className="section">
        <div className="container">
          <span className="eyebrow" data-reveal>
            Why Supreme One Software
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            One vendor instead of <em>four</em>.
          </h2>
          <div className="tbl-wrap" style={{ marginTop: "clamp(30px, 4vw, 52px)" }} data-reveal data-delay="0.12">
            <table className="tbl">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Four vendors</th>
                  <th scope="col" style={{ color: "var(--accent)" }}>
                    Supreme One Software
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparison.map((r) => (
                  <tr key={r.id}>
                    <td style={{ fontWeight: 500 }}>{r.feature}</td>
                    <td style={{ color: "var(--muted)" }}>{r.typical}</td>
                    <td style={{ fontWeight: 500 }}>{r.northmark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Trusted by ── */}
      <section className="section section-line" style={{ paddingBlock: "clamp(40px, 6vw, 72px)" }}>
        <div className="container">
          <span className="eyebrow" data-reveal>
            Trusted by
          </span>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(24px, 5vw, 64px)", alignItems: "baseline", marginTop: 14 }}>
            {logos.map((l, i) => (
              <span key={l.id} className="serif" data-reveal data-delay={0.05 * i} style={{ fontSize: "clamp(20px, 2.4vw, 28px)", color: "var(--muted)" }}>
                {l.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {faq && (
        <section className="section section-line">
          <div className="container" style={{ maxWidth: 880 }}>
            <span className="eyebrow" data-reveal>
              FAQ
            </span>
            <h2 className="h2" data-lines data-reveal data-delay="0.06">
              {faq.title}
            </h2>
            <div style={{ marginTop: "clamp(24px, 4vw, 44px)" }} data-reveal data-delay="0.1">
              <FaqAccordion items={faq.items.map((i) => ({ id: i.id, question: i.question, answer: i.answer }))} />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
