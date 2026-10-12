import type { Metadata } from "next";
import { getSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { INTEREST_GROUPS } from "@/content";
import PageHero from "@/components/site/PageHero";
import SectionHead from "@/components/site/SectionHead";
import ContactForm from "@/components/site/ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/partners", {
    title: "Partner With Us | Supreme One Software",
    description:
      "Agencies, resellers and technology providers: partner with Supreme One Software to bring WhatsApp, chat and voice automation to more businesses.",
  });
}

const PARTNER_TYPES = [
  {
    title: "Agencies & consultants",
    copy: "Bring WhatsApp, chatbots and campaigns to your clients, with our team behind the setup.",
  },
  {
    title: "Resellers & referrals",
    copy: "Introduce the platform to businesses in your network.",
  },
  {
    title: "Technology partners",
    copy: "Connect your CRM, store, telephony or other product to the platform.",
  },
];

export default async function PartnersPage() {
  const settings = await getSettings();
  const email = settings.partnersEmail || settings.contactEmail;

  return (
    <>
      <PageHero
        crumbs={[{ label: "Partner With Us", href: "/partners" }]}
        eyebrow="Partner With Us"
        title="Let’s grow together"
        accent="together"
        lede="If you work with businesses that talk to their customers, let’s talk about working together."
      />
      <section className="section section-line">
        <div className="container">
          <SectionHead eyebrow="Who we partner with" heading="Three ways to work with us" accent="work with us" />
          <div className="why-grid">
            {PARTNER_TYPES.map((p, i) => (
              <div key={p.title} className="why-item" data-reveal data-delay={0.07 * i}>
                <span className="why-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="h3 serif">{p.title}</h3>
                <p>{p.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section section-line tint" id="enquiry">
        <div className="container narrow">
          <SectionHead
            eyebrow="Get in touch"
            heading="Tell us about your business"
            accent="your business"
            sub={email ? `Or write to us directly at ${email}.` : undefined}
          />
          <div className="form-card" data-reveal data-delay="0.1">
            <ContactForm groups={INTEREST_GROUPS} intent="partnership" />
          </div>
        </div>
      </section>
    </>
  );
}
