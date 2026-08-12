import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getProducts, getPricing, getUseCases, asStringArray, asMetrics } from "@/lib/content";
import { COPY } from "@/lib/copy";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/products", "Products — Six channels. One API key. | Supreme One Software");
}

type ProductRow = Awaited<ReturnType<typeof getProducts>>[number];

const mono = 'ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace';

const tileDark: CSSProperties = {
  background: "var(--ink)",
  color: "#ece9e2",
  border: "1px solid var(--line)",
  borderRadius: 18,
  padding: 24,
  fontSize: 13.5,
};

const tileLight: CSSProperties = {
  background: "var(--paper2)",
  border: "1px solid var(--line)",
  borderRadius: 18,
  padding: 24,
  fontSize: 13.5,
};

function Badge({ badge }: { badge: string }) {
  return (
    <span
      style={{
        fontSize: 10,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        fontWeight: 600,
        color: badge === "Live" ? "var(--good)" : "var(--accent)",
        border: "1px solid currentColor",
        borderRadius: 999,
        padding: "3px 10px",
      }}
    >
      {badge}
    </span>
  );
}

const WAVE = [0.45, 0.8, 0.55, 1, 0.65, 0.9, 0.5, 0.75, 0.6, 1, 0.7, 0.85, 0.5, 0.95, 0.6, 0.8, 0.45, 0.9];

function ProductVisual({ p }: { p: ProductRow }) {
  switch (p.visualKey) {
    case "whatsapp":
      return (
        <div data-card style={tileDark}>
          <div className="sheen" aria-hidden="true" />
          <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.65, fontSize: 12, marginBottom: 16 }}>
            <span>WhatsApp Business · verified ✓</span>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>09:41</span>
          </div>
          <div style={{ display: "grid", gap: 12 }}>
            <div
              style={{
                background: "var(--accent)",
                borderRadius: "12px 12px 4px 12px",
                padding: "10px 14px",
                maxWidth: "88%",
                justifySelf: "end",
              }}
            >
              <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>Template · order_shipped</div>
              Order 7741 shipped — arriving Thursday by 6 pm. Reply 1 to track, 2 to reschedule.
            </div>
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                borderRadius: "12px 12px 12px 4px",
                padding: "10px 14px",
                maxWidth: "70%",
              }}
            >
              1 — track it, please
            </div>
            <div style={{ display: "flex", gap: 10, opacity: 0.65, fontSize: 12 }}>
              <span style={{ color: "var(--good)" }}>✓✓</span> Read · flow builder replied in 380 ms
            </div>
          </div>
        </div>
      );
    case "sms":
      return (
        <div data-card style={tileLight}>
          <div className="sheen" aria-hidden="true" />
          <div style={{ display: "flex", justifyContent: "space-between", color: "var(--muted)", fontSize: 12, marginBottom: 16 }}>
            <span>Sender ID · NRTHMK</span>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>now</span>
          </div>
          <div
            style={{
              border: "1px solid var(--line)",
              borderRadius: 12,
              padding: "12px 16px",
              fontFamily: mono,
              fontSize: 13,
              lineHeight: 1.6,
            }}
          >
            <b style={{ letterSpacing: "0.08em" }}>482913</b> is your one-time password. Valid for 5 minutes. Do not share it with anyone.
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 14, fontSize: 12.5, flexWrap: "wrap" }}>
            <span style={{ color: "var(--good)" }}>✓✓ Delivered · 2.1 s</span>
            <span style={{ color: "var(--muted)" }}>Route 2 of 4 · voice fallback armed</span>
          </div>
        </div>
      );
    case "rcs":
      return (
        <div data-card style={{ ...tileLight, padding: 18 }}>
          <div className="sheen" aria-hidden="true" />
          <div style={{ border: "1px solid var(--line)", borderRadius: 14, overflow: "hidden", background: "var(--paper)" }}>
            <div
              aria-hidden="true"
              style={{
                height: 96,
                background: "linear-gradient(135deg, var(--accent), #4c4699)",
                display: "flex",
                alignItems: "flex-end",
                padding: "10px 16px",
                color: "rgba(255,255,255,0.85)",
                fontSize: 11,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Rich card media
            </div>
            <div style={{ padding: "14px 16px" }}>
              <div style={{ fontWeight: 600, fontSize: 14.5 }}>Order 7741 is out for delivery</div>
              <div style={{ color: "var(--muted)", fontSize: 13, marginTop: 4 }}>Arriving today between 4–6 pm</div>
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                {["Track", "Reschedule"].map((b) => (
                  <span
                    key={b}
                    style={{
                      border: "1px solid var(--accent)",
                      color: "var(--accent)",
                      borderRadius: 999,
                      padding: "6px 16px",
                      fontSize: 12.5,
                      fontWeight: 500,
                    }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    case "telephony":
      return (
        <div data-card style={tileDark}>
          <div className="sheen" aria-hidden="true" />
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontVariantNumeric: "tabular-nums" }}>Call · 04:12</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 12, opacity: 0.8 }}>
              <i aria-hidden="true" style={{ width: 8, height: 8, borderRadius: 999, background: "#e5484d", display: "inline-block" }} />
              Recording
            </span>
          </div>
          <div aria-hidden="true" style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 26 }}>
            {WAVE.map((sc, i) => (
              <i
                key={i}
                style={{
                  width: 3,
                  height: Math.round(26 * sc),
                  background: "var(--accent)",
                  transformOrigin: "50% 100%",
                  animation: `riseBar 1.1s ${i * 0.08}s ease-in-out infinite`,
                  display: "inline-block",
                }}
              />
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", marginTop: 16, paddingTop: 14 }}>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.14em", opacity: 0.6, marginBottom: 6 }}>
              Auto summary
            </div>
            <p style={{ fontSize: 12.5, lineHeight: 1.6, opacity: 0.85 }}>
              Customer requested invoice correction for order 7741. Agent raised ticket #2214. Sentiment improved from tense to
              satisfied. Next step: credit note within 24h.
            </p>
          </div>
        </div>
      );
    case "omnichannel": {
      const kpis = asMetrics(p.metrics).slice(0, 3);
      return (
        <div data-card style={tileLight}>
          <div className="sheen" aria-hidden="true" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {kpis.map((m) => (
              <div
                key={m.label}
                style={{ border: "1px solid var(--line)", borderRadius: 12, padding: "16px 12px", textAlign: "center", background: "var(--paper)" }}
              >
                <div className="serif" style={{ fontSize: "clamp(22px, 2.6vw, 32px)", lineHeight: 1 }}>{m.value}</div>
                <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 8 }}>{m.label}</div>
              </div>
            ))}
          </div>
          <p style={{ color: "var(--muted)", fontSize: 12.5, lineHeight: 1.6, marginTop: 14 }}>
            One thread, one history — an agent picking up a voice call sees the WhatsApp chat from yesterday and the open ticket
            without switching tabs.
          </p>
        </div>
      );
    }
    case "ivr": {
      const box: CSSProperties = {
        border: "1px solid var(--line)",
        borderRadius: 10,
        padding: "10px 14px",
        fontSize: 13,
        background: "var(--paper)",
        textAlign: "center",
      };
      const arrow = <div aria-hidden="true" style={{ textAlign: "center", color: "var(--muted)", fontSize: 14, lineHeight: 1 }}>↓</div>;
      return (
        <div data-card style={tileLight}>
          <div className="sheen" aria-hidden="true" />
          <div style={{ display: "grid", gap: 10 }}>
            <div style={box}>Incoming call → language menu</div>
            {arrow}
            <div style={box}>Intent capture (speech or keypad)</div>
            {arrow}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div style={{ ...box, borderColor: "var(--good)", color: "var(--good)" }}>Self-serve answer</div>
              <div style={{ ...box, borderColor: "var(--accent)", color: "var(--accent)" }}>Skill queue → agent</div>
            </div>
          </div>
        </div>
      );
    }
    default:
      return null;
  }
}

export default async function ProductsPage() {
  const [products, plans, useCases] = await Promise.all([getProducts(), getPricing("PLATFORM"), getUseCases()]);
  const hero = COPY.productsHero;
  const cc = COPY.channelComparison;
  const keyIdx = hero.heading.indexOf("API key");

  return (
    <>
      {/* ── Hero ── */}
      <section className="section" data-scrub style={{ position: "relative", overflow: "hidden" }}>
        <div className="glow glow-accent" data-par="0.07" style={{ width: 420, height: 420, top: -120, right: "6%" }} />
        <div className="glow glow-indigo" data-par="0.11" style={{ width: 360, height: 360, bottom: -100, left: "-4%" }} />
        <div
          className="container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "clamp(32px, 5vw, 72px)",
            alignItems: "center",
          }}
        >
          <div>
            <span className="eyebrow" data-reveal>
              {hero.eyebrow}
            </span>
            <h1 className="display" data-lines data-reveal data-delay="0.06">
              {keyIdx >= 0 ? (
                <>
                  {hero.heading.slice(0, keyIdx)}
                  <em>API key</em>
                  {hero.heading.slice(keyIdx + "API key".length)}
                </>
              ) : (
                hero.heading
              )}
            </h1>
            <p className="lede" style={{ marginTop: 30 }} data-reveal data-delay="0.14">
              {hero.sub}
            </p>
          </div>
          <div data-reveal data-delay="0.2" data-par="0.05">
            <div data-card style={{ ...tileDark, padding: "22px 24px" }}>
              <div className="sheen" aria-hidden="true" />
              <div aria-hidden="true" style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                {["#e5484d", "#e2b53e", "#3fb27f"].map((c) => (
                  <i key={c} style={{ width: 9, height: 9, borderRadius: 999, background: c, opacity: 0.8, display: "inline-block" }} />
                ))}
              </div>
              <pre
                style={{
                  margin: 0,
                  fontFamily: mono,
                  fontSize: 13,
                  lineHeight: 1.75,
                  whiteSpace: "pre",
                  overflowX: "auto",
                }}
              >
                {hero.codeSample.split("\n").map((line, i) => (
                  <span key={i} style={line.startsWith("#") ? { opacity: 0.55 } : undefined}>
                    {line}
                    {"\n"}
                  </span>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product deep-dives ── */}
      <section className="section section-line">
        <div className="container">
          <span className="eyebrow" data-reveal>
            The suite
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            Six products, one <em>console</em>.
          </h2>
          <div style={{ display: "grid", gap: "clamp(52px, 8vw, 110px)", marginTop: "clamp(40px, 6vw, 80px)" }}>
            {products.map((p, i) => {
              const flip = i % 2 === 1;
              const copyCol = (
                <div data-reveal>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontSize: 13, color: "var(--accent)", fontVariantNumeric: "tabular-nums" }}>
                      {String(p.position).padStart(2, "0")}
                    </span>
                    {p.badge && <Badge badge={p.badge} />}
                  </div>
                  <h3 className="serif" style={{ fontSize: "clamp(26px, 3.2vw, 40px)", lineHeight: 1.1, marginTop: 14 }}>
                    {p.title}
                  </h3>
                  <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.65, marginTop: 16, maxWidth: "58ch" }}>{p.copy}</p>
                  <ul style={{ listStyle: "none", marginTop: 20, display: "grid", gap: 10 }}>
                    {asStringArray(p.bullets).map((b, j) => (
                      <li
                        key={b}
                        data-reveal
                        data-delay={0.05 * j}
                        style={{ display: "flex", gap: 12, color: "var(--muted)", fontSize: 14.5 }}
                      >
                        <span style={{ color: "var(--accent)" }}>✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "clamp(20px, 3vw, 40px)",
                      marginTop: 26,
                      borderTop: "1px solid var(--line)",
                      paddingTop: 20,
                    }}
                  >
                    {asMetrics(p.metrics).map((m, j) => (
                      <div key={m.label} data-reveal data-delay={0.05 * j}>
                        <div className="serif" style={{ fontSize: "clamp(20px, 2.2vw, 27px)", lineHeight: 1 }}>{m.value}</div>
                        <div style={{ color: "var(--muted)", fontSize: 12, marginTop: 6 }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
              const visualCol = (
                <div data-reveal data-delay="0.12" data-par="0.04">
                  <ProductVisual p={p} />
                </div>
              );
              return (
                <div
                  key={p.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "clamp(28px, 5vw, 72px)",
                    alignItems: "center",
                  }}
                >
                  {flip ? visualCol : copyCol}
                  {flip ? copyCol : visualCol}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Plans ── */}
      <section className="section section-line" style={{ background: "var(--paper3)" }}>
        <div className="container">
          <span className="eyebrow" data-reveal>
            Plans
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            Pay for <em>volume</em>, not seats.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
              marginTop: "clamp(36px, 5vw, 64px)",
              alignItems: "stretch",
            }}
          >
            {plans.map((t, i) => (
              <div
                key={t.id}
                data-card
                data-reveal
                data-delay={0.07 * i}
                style={{
                  background: "var(--paper2)",
                  border: t.highlighted ? "1px solid var(--accent)" : "1px solid var(--line)",
                  borderRadius: 16,
                  padding: "28px 26px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                }}
              >
                <div className="sheen" aria-hidden="true" />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="eyebrow" style={{ marginBottom: 0 }}>{t.name}</span>
                  {t.priceNote && (
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
                      }}
                    >
                      {t.priceNote}
                    </span>
                  )}
                </div>
                <div className="serif" style={{ fontSize: "clamp(22px, 2.6vw, 30px)", lineHeight: 1.15, marginTop: 16 }}>
                  {t.price}
                </div>
                <p style={{ color: "var(--muted)", fontSize: 14.5, lineHeight: 1.6, marginTop: 12 }}>{t.blurb}</p>
                <div style={{ marginTop: "auto", paddingTop: 24 }}>
                  <Link href="/contact" className={t.highlighted ? "btn btn-solid" : "btn btn-ghost"} data-magnet>
                    Talk to sales
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }} data-reveal data-delay="0.1">
            <Link href="/contact" className="btn btn-solid" data-magnet>
              Request sandbox keys
            </Link>
            <Link href="/platform" className="btn btn-ghost" data-magnet>
              How the platform works
            </Link>
          </div>
        </div>
      </section>

      {/* ── Channel comparison ── */}
      <section className="section section-line">
        <div className="container">
          <span className="eyebrow" data-reveal>
            Channel comparison
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            Which channel for which <em>message</em>.
          </h2>
          <div className="tbl-wrap" style={{ marginTop: "clamp(30px, 4vw, 52px)" }} data-reveal data-delay="0.12">
            <table className="tbl">
              <thead>
                <tr>
                  <th scope="col"></th>
                  {cc.columns.map((c) => (
                    <th key={c} scope="col">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {cc.rows.map((row) => {
                  const [feature, ...vals] = row;
                  return (
                    <tr key={feature}>
                      <td style={{ fontWeight: 500 }}>{feature}</td>
                      {vals.map((v, j) => (
                        <td
                          key={j}
                          style={
                            v === "✓"
                              ? { color: "var(--good)" }
                              : v === "—"
                                ? { color: "var(--muted)" }
                                : undefined
                          }
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Use cases ── */}
      <section className="section section-line" style={{ background: "var(--paper3)" }}>
        <div className="container">
          <span className="eyebrow" data-reveal>
            Use cases
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            Same products, different <em>jobs</em>.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 18,
              marginTop: "clamp(36px, 5vw, 64px)",
            }}
          >
            {useCases.map((u, i) => (
              <div
                key={u.id}
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
                <div className="h3 serif">{u.title}</div>
                <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 10, lineHeight: 1.55 }}>{u.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA band ── */}
      <section className="section section-line" style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 className="h2" style={{ margin: "0 auto" }} data-reveal>
            Start with one channel. Scale to <em>six</em>.
          </h2>
          <div
            style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 36 }}
            data-reveal
            data-delay="0.1"
          >
            <Link href="/contact" className="btn btn-accent" data-magnet>
              Talk to sales
            </Link>
            <Link
              href="/contact"
              className="btn"
              style={{ border: "1px solid rgba(246,244,240,0.3)", color: "var(--paper)" }}
              data-magnet
            >
              Request sandbox keys
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
