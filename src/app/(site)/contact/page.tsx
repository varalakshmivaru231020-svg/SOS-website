import type { Metadata } from "next";
import { getOffices, getFaqGroup, getSettings, asStringArray } from "@/lib/content";
import { COPY, emphasize } from "@/lib/copy";
import { pageMetadata } from "@/lib/seo";
import ContactForm from "@/components/site/ContactForm";
import FaqAccordion from "@/components/site/FaqAccordion";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/contact", "Contact — Supreme One Software");
}

const LINK_STYLE = { color: "var(--accent)", textDecoration: "none" };
const PHONE_RE = /^\+?\d[\d\s()-]{6,}$/;

/**
 * Route copy is a " · "-separated list — an email, sometimes a phone number,
 * sometimes a plain note ("24/7 NOC"). Contact details come from the admin
 * panel, so each segment is swapped for the current value and linked.
 */
function RouteCopy({ copy, email, phone }: { copy: string; email: string; phone: string }) {
  const segments = copy.split(" · ");
  return (
    <>
      {segments.map((seg, i) => {
        const sep = i > 0 ? " · " : "";
        if (seg.includes("@")) {
          return (
            <span key={i}>
              {sep}
              <a href={`mailto:${email}`} style={LINK_STYLE}>
                {email}
              </a>
            </span>
          );
        }
        if (PHONE_RE.test(seg.trim()) && phone) {
          return (
            <span key={i}>
              {sep}
              <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} style={LINK_STYLE}>
                {phone}
              </a>
            </span>
          );
        }
        return <span key={i}>{sep + seg}</span>;
      })}
    </>
  );
}

export default async function ContactPage() {
  const [offices, faq, settings] = await Promise.all([getOffices(), getFaqGroup("contact"), getSettings()]);
  // Routes 1–3 map to the three published addresses, all set in the admin panel.
  const routeEmails = [settings.contactEmail, settings.supportEmail, settings.partnersEmail];
  const hero = COPY.contactHero;
  const h = emphasize(hero.heading, "problem");
  const formH = emphasize("Send the brief.", "brief");
  const officesH = emphasize("Where we sit.", "sit");
  const faqH = faq ? emphasize(faq.title, "ask") : null;

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

      {/* ── Contact routes ── */}
      <section className="section section-line">
        <div className="container">
          <span className="eyebrow" data-reveal>
            Routes
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            Three ways <em>in</em>.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
              marginTop: "clamp(30px, 4vw, 52px)",
            }}
          >
            {COPY.contactRoutes.map((r, i) => (
              <div
                key={r.title}
                data-card
                data-reveal
                data-delay={0.06 * i}
                style={{
                  background: "var(--paper2)",
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                  padding: "26px 24px",
                }}
              >
                <div className="sheen" aria-hidden="true" />
                <span style={{ fontSize: 13, color: "var(--accent)", fontVariantNumeric: "tabular-nums" }}>
                  {String(r.position).padStart(2, "0")}
                </span>
                <div className="h3 serif" style={{ marginTop: 12 }}>
                  {r.title}
                </div>
                <p style={{ color: "var(--muted)", fontSize: 14.5, marginTop: 10, lineHeight: 1.6 }}>
                  <RouteCopy copy={r.copy} email={routeEmails[i] || r.email} phone={settings.phone} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The form ── */}
      <section className="section section-line" style={{ background: "var(--paper3)" }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <span className="eyebrow" data-reveal>
            The brief
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            {formH.pre}
            <em>{formH.em}</em>
            {formH.post}
          </h2>
          <div style={{ marginTop: "clamp(28px, 4vw, 48px)" }} data-reveal data-delay="0.12">
            <ContactForm />
          </div>
          <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 16 }} data-reveal data-delay="0.16">
            {COPY.ndaNote}
          </p>
        </div>
      </section>

      {/* ── Offices ── */}
      <section className="section section-line">
        <div className="container">
          <span className="eyebrow" data-reveal>
            Offices
          </span>
          <h2 className="h2" data-lines data-reveal data-delay="0.06">
            {officesH.pre}
            <em>{officesH.em}</em>
            {officesH.post}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 18,
              marginTop: "clamp(28px, 4vw, 48px)",
            }}
          >
            {offices.map((o, i) => (
              <div
                key={o.id}
                data-reveal
                data-delay={0.06 * i}
                style={{
                  border: "1px solid var(--line)",
                  borderRadius: 16,
                  padding: "22px 22px 24px",
                  background: "var(--paper2)",
                }}
              >
                {o.tag && (
                  <span
                    style={{
                      fontSize: 10.5,
                      textTransform: "uppercase",
                      letterSpacing: "0.14em",
                      fontWeight: 600,
                      color: "var(--accent)",
                    }}
                  >
                    {o.tag}
                  </span>
                )}
                <div className="h3 serif" style={{ marginTop: o.tag ? 10 : 0 }}>
                  {o.city}
                </div>
                <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8, lineHeight: 1.6 }}>
                  {asStringArray(o.addressLines).map((line) => (
                    <span key={line} style={{ display: "block" }}>
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      {faq && (
        <section className="section section-line">
          <div className="container" style={{ maxWidth: 880 }}>
            <span className="eyebrow" data-reveal>
              Before you write
            </span>
            <h2 className="h2" data-lines data-reveal data-delay="0.06">
              {faqH && (
                <>
                  {faqH.pre}
                  <em>{faqH.em}</em>
                  {faqH.post}
                </>
              )}
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
