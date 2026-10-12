import Link from "next/link";
import type { Metadata } from "next";
import { getFaqGroup, getPricing, asStringArray } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { contactHref, demoHref } from "@/content";
import { HOME } from "@/content/site";
import PageHero from "@/components/site/PageHero";
import SectionHead from "@/components/site/SectionHead";
import FaqAccordion from "@/components/site/FaqAccordion";
import CtaBanner from "@/components/site/CtaBanner";
import { Features } from "@/components/site/Cards";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/pricing", {
    title: "Pricing | Supreme One Software",
    description:
      "Plans for WhatsApp Business API, chatbots, campaigns, the unified team inbox and the rest of the platform — or a custom quote for your channels and volume.",
  });
}

const INCLUDED = [
  { title: "Onboarding & setup", copy: "We configure the platform with you and train your team." },
  {
    title: "Meta verification & templates",
    copy: "Help linking Meta Business Manager, applying for the API and getting templates approved.",
  },
  { title: "Ongoing support", copy: "We stay on after go-live, not just until launch." },
];

/**
 * Plans come from Admin → Pricing ("Platform plans"); nothing is shown until a
 * plan is published, and the custom-quote route is always there.
 */
export default async function PricingPage() {
  const [plans, engagements, faq] = await Promise.all([
    getPricing("PLATFORM"),
    getPricing("ENGAGEMENT"),
    getFaqGroup("pricing"),
  ]);
  const featureRows = [...new Set(plans.flatMap((p) => asStringArray(p.features)))];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Pricing", href: "/pricing" }]}
        eyebrow="Pricing"
        title="Pricing that fits how you talk to customers"
        accent="fits"
        lede="Start with one product or run the whole platform. Tell us your channels and volume, and we’ll put together the right plan."
        actions={
          <>
            <Link href={contactHref("platform")} className="btn btn-accent" data-magnet>
              Get a custom quote
            </Link>
            <Link href={demoHref("platform")} className="btn btn-ghost" data-magnet>
              Book a Demo
            </Link>
          </>
        }
      />

      {plans.length > 0 && (
        <section className="section section-line">
          <div className="container">
            <SectionHead eyebrow="Plans" heading="Compare plans" accent="plans" />
            <div className="plans">
              {plans.map((p, i) => (
                <div key={p.id} className={`plan${p.highlighted ? " featured" : ""}`} data-reveal data-delay={0.06 * i}>
                  {p.priceNote && <span className="plan-note">{p.priceNote}</span>}
                  <h3 className="h3 serif">{p.name}</h3>
                  <p className="plan-price">{p.price}</p>
                  <p className="plan-blurb">{p.blurb}</p>
                  <ul>
                    {asStringArray(p.features).map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <Link
                    href={contactHref("platform")}
                    className={`btn ${p.highlighted ? "btn-accent" : "btn-ghost"}`}
                    data-magnet
                  >
                    {p.ctaLabel || "Talk to sales"}
                  </Link>
                </div>
              ))}
            </div>

            {featureRows.length > 0 && plans.length > 1 && (
              <div className="tbl-wrap compare" data-reveal>
                <table className="tbl">
                  <caption className="sr-only">Features included in each plan</caption>
                  <thead>
                    <tr>
                      <th scope="col">Feature</th>
                      {plans.map((p) => (
                        <th key={p.id} scope="col">
                          {p.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {featureRows.map((f) => (
                      <tr key={f}>
                        <th scope="row">{f}</th>
                        {plans.map((p) => {
                          const has = asStringArray(p.features).includes(f);
                          return (
                            <td key={p.id} className={has ? "yes" : "no"}>
                              {has ? "✓" : "—"}
                              <span className="sr-only">{has ? "Included" : "Not included"}</span>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}

      <section className={`section section-line${plans.length ? " tint" : ""}`}>
        <div className="container split">
          <div>
            <SectionHead eyebrow="Custom quote" heading="Need something specific?" accent="specific?" />
            <p className="sec-sub" data-reveal>
              Every business talks to customers differently. Tell us which channels you use, roughly how many conversations
              you handle, and what you’d like to automate — we’ll come back with a quote.
            </p>
            <div className="hero-actions" data-reveal>
              <Link href={contactHref("platform")} className="btn btn-accent" data-magnet>
                Get a custom quote
              </Link>
            </div>
            <p className="fine-print" data-reveal>
              WhatsApp message charges set by Meta are billed in addition to platform fees.
            </p>
          </div>
          <div>
            <span className="eyebrow" data-reveal>
              Included with every plan
            </span>
            <Features items={INCLUDED} />
          </div>
        </div>
      </section>

      {engagements.length > 0 && (
        <section className="section section-line">
          <div className="container">
            <SectionHead
              eyebrow="Custom engineering"
              heading="Apps and websites, quoted per project"
              accent="per project"
            />
            <div className="plans">
              {engagements.map((p, i) => (
                <div key={p.id} className={`plan${p.highlighted ? " featured" : ""}`} data-reveal data-delay={0.06 * i}>
                  {p.priceNote && <span className="plan-note">{p.priceNote}</span>}
                  <h3 className="h3 serif">{p.name}</h3>
                  <p className="plan-price">{p.price}</p>
                  <p className="plan-blurb">{p.blurb}</p>
                </div>
              ))}
            </div>
            <p className="more-link" data-reveal>
              <Link href="/services">See our services →</Link>
            </p>
          </div>
        </section>
      )}

      {faq && faq.items.length > 0 && (
        <section className="section section-line tint">
          <div className="container narrow">
            <SectionHead eyebrow="FAQ" heading={faq.title} />
            <div className="faq-wrap" data-reveal data-delay="0.1">
              <FaqAccordion items={faq.items.map((i) => ({ id: i.id, question: i.question, answer: i.answer }))} />
            </div>
          </div>
        </section>
      )}

      <CtaBanner heading={HOME.banner.heading} accent={HOME.banner.accent} interest="platform" />
    </>
  );
}
