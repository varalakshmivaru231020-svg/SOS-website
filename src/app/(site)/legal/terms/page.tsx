import Link from "next/link";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/legal/terms", "Terms of service — Supreme One Software Pvt Ltd");
}

type LegalSection = { title: string; body: string[] };

const buildSections = (email: string): LegalSection[] => [
  {
    title: "Acceptance",
    body: [
      "By using this website, or by engaging Supreme One Software Pvt Ltd for services, you accept these terms. If you’re acting for a company, you confirm you have the authority to bind it. If you don’t agree with something here, the right move is not to use the site or the services.",
    ],
  },
  {
    title: "Our services",
    body: [
      "Supreme One Software Pvt Ltd is a software studio and messaging platform. We design and build custom software for clients, and we operate a conversational-messaging platform spanning channels such as WhatsApp, RCS, SMS, and voice.",
      "The specifics of any engagement — scope, deliverables, timelines, and fees — live in the proposal, statement of work, or order form we agree with you. Where those documents and these terms differ, the signed document wins.",
    ],
  },
  {
    title: "Intellectual property",
    body: [
      "Deliverables we build for you under a signed engagement belong to you once they’re paid for, as set out in that engagement. The Supreme One Software platform, our tooling, our pre-existing code, and everything on this site remain ours. Neither side gets rights in the other’s trademarks without written permission.",
    ],
  },
  {
    title: "Acceptable use",
    body: [
      "If you use our platform, you agree not to send unlawful, deceptive, or abusive messages; not to spam; and to hold the consents required to message your recipients. You also agree to follow the policies of the channels involved — carrier rules, WhatsApp Business policies, and the like. We may suspend traffic that breaks these rules.",
    ],
  },
  {
    title: "Warranties and liability",
    body: [
      "We build carefully and run the platform to a high standard, but the site and services are provided “as is” — we can’t promise they will be uninterrupted or error-free.",
      "To the fullest extent the law allows, Supreme One Software’s total liability arising from an engagement is capped at the fees you paid us for that engagement in the twelve months before the claim, and neither side is liable for indirect or consequential losses. Nothing in these terms excludes liability that cannot lawfully be excluded.",
    ],
  },
  {
    title: "Governing law",
    body: [
      "These terms are governed by the laws of India, and the courts at Bengaluru, Karnataka have exclusive jurisdiction over disputes arising from them — unless a signed engagement with you says otherwise.",
    ],
  },
  {
    title: "Changes",
    body: [
      "We may update these terms from time to time. The “last updated” date above tells you when. Continuing to use the site or services after a change means you accept the revised terms.",
    ],
  },
  {
    title: "Contact",
    body: [
      `Questions about these terms go to ${email}. Supreme One Software Pvt Ltd operates from Bengaluru, Karnataka, India.`,
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

export default async function TermsPage() {
  const settings = await getSettings();
  const email = settings.contactEmail;
  const sections = buildSections(email);
  return (
    <>
      {/* ── Hero ── */}
      <section className="section" data-scrub style={{ position: "relative", overflow: "hidden" }}>
        <div className="glow glow-indigo" data-par="0.11" style={{ width: 360, height: 360, top: -120, right: "10%" }} />
        <div className="container">
          <span className="eyebrow" data-reveal>
            Legal
          </span>
          <h1 className="display" style={{ fontSize: "clamp(40px, 6.4vw, 92px)" }} data-reveal data-delay="0.06">
            Terms of <em>service.</em>
          </h1>
          <p className="lede" style={{ marginTop: 26 }} data-reveal data-delay="0.12">
            The ground rules for using this site, engaging the studio, and sending traffic through the platform.
          </p>
          <p style={{ color: "var(--muted)", fontSize: 13, marginTop: 18 }} data-reveal data-delay="0.16">
            Last updated: August 2026
          </p>
        </div>
      </section>

      {/* ── Terms ── */}
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
            <Link href="/legal/privacy" className="btn btn-ghost" data-magnet>
              Privacy policy →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
