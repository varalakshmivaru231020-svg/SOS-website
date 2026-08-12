import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/legal/privacy", "Privacy policy — Supreme One Software Pvt Ltd");
}

type LegalSection = { title: string; body: string[] };

const buildSections = (email: string): LegalSection[] => [
  {
    title: "What we collect",
    body: [
      "When you write to us through the contact form we collect the details you choose to share: your name, email address, company, and a brief description of your project. That is the whole list — we don’t ask for anything the conversation doesn’t need.",
      "Like most websites, our servers also record basic technical logs — IP address, browser type, and the pages requested — used only to keep the site running and secure.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "We use your details for one purpose: to respond to your enquiry and, if the conversation continues, to scope and deliver the work you’ve asked about.",
      "We don’t sell your information, we don’t rent it, and we don’t add you to a marketing list unless you explicitly ask to hear from us.",
    ],
  },
  {
    title: "Storage and security",
    body: [
      "Enquiry data is stored on access-controlled infrastructure and encrypted in transit and at rest. Access is limited to the Supreme One Software team members who need it to answer you — nobody else.",
    ],
  },
  {
    title: "Retention",
    body: [
      "We keep enquiry details only as long as the conversation or engagement requires. If a project doesn’t proceed, we delete the enquiry within twelve months. You can ask us to delete it sooner at any time.",
    ],
  },
  {
    title: "Third parties",
    body: [
      "Form submissions reach us through an email delivery provider, which processes your message solely to route it to our inbox. Beyond that, no third party receives your personal information — this site runs no advertising trackers and no analytics that identify you.",
    ],
  },
  {
    title: "Your rights",
    body: [
      "You can ask us what personal information we hold about you, ask us to correct it, or ask us to delete it. Write to us and we’ll act on the request promptly, in line with applicable data-protection law — including India’s Digital Personal Data Protection Act where it applies.",
    ],
  },
  {
    title: "Contact",
    body: [
      `Questions about this policy — or any request about your data — go to ${email}. Supreme One Software Pvt Ltd operates from Bengaluru, Karnataka, India.`,
    ],
  },
];

const bodyStyle: CSSProperties = {
  color: "var(--muted)",
  fontSize: 15,
  lineHeight: 1.7,
  marginTop: 12,
  maxWidth: "68ch",
};

export default async function PrivacyPage() {
  const settings = await getSettings();
  const email = settings.contactEmail;
  const sections = buildSections(email);
  return (
    <>
      {/* ── Hero ── */}
      <section className="section" data-scrub style={{ position: "relative", overflow: "hidden" }}>
        <div className="glow glow-accent" data-par="0.07" style={{ width: 360, height: 360, top: -120, right: "10%" }} />
        <div className="container">
          <span className="eyebrow" data-reveal>
            Legal
          </span>
          <h1 className="display" style={{ fontSize: "clamp(40px, 6.4vw, 92px)" }} data-reveal data-delay="0.06">
            Privacy <em>policy.</em>
          </h1>
          <p className="lede" style={{ marginTop: 26 }} data-reveal data-delay="0.12">
            The short version: we collect only what you send us, we use it only to talk to you, and we never sell it.
          </p>
          <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 18 }} data-reveal data-delay="0.16">
            Last updated: August 2026
          </p>
        </div>
      </section>

      {/* ── Policy ── */}
      <section className="section section-line">
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ borderTop: "1px solid var(--line)" }}>
            {sections.map((s, i) => (
              <div
                key={s.title}
                data-reveal
                data-delay={0.04 * i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "56px 1fr",
                  gap: "clamp(14px, 3vw, 36px)",
                  padding: "clamp(22px, 3vw, 34px) 6px",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <span style={{ fontSize: 13, color: "var(--accent)", fontVariantNumeric: "tabular-nums", paddingTop: 8 }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="h3 serif">{s.title}</h3>
                  {s.body.map((p) => (
                    <p key={p.slice(0, 32)} style={bodyStyle}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 34 }} data-reveal>
            <a href={`mailto:${email}`} className="btn btn-solid" data-magnet>
              {email}
            </a>
            <Link href="/legal/terms" className="btn btn-ghost" data-magnet>
              Terms of service →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
