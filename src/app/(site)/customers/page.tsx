import Link from "next/link";
import type { Metadata } from "next";
import { getCaseStudies, getClientLogos, getTestimonials, asMetrics, asStringArray } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { INDUSTRIES, demoHref, industryHref } from "@/content";
import { HOME } from "@/content/site";
import Testimonials from "@/components/site/Testimonials";
import PageHero from "@/components/site/PageHero";
import SectionHead from "@/components/site/SectionHead";
import CtaBanner from "@/components/site/CtaBanner";
import { LinkCard } from "@/components/site/Cards";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/customers", {
    title: "Customers | Supreme One Software",
    description:
      "How businesses use Supreme One Software for WhatsApp, chat and voice — case studies and what our customers say.",
  });
}

/**
 * Case studies, testimonials and logos are all managed in the admin panel
 * (Customers and Site blocks). Each section appears once it has real entries;
 * until then the page points visitors to a demo for their own industry.
 */
export default async function CustomersPage() {
  const [cases, testimonials, logos] = await Promise.all([getCaseStudies(), getTestimonials(), getClientLogos()]);
  const hasStories = cases.length > 0 || testimonials.length > 0;

  return (
    <>
      <PageHero
        crumbs={[{ label: "Customers", href: "/customers" }]}
        eyebrow="Customers"
        title="Businesses that talk to customers on every channel"
        accent="every channel"
        lede="How teams use the platform to answer faster, automate the routine and measure what works."
        actions={
          <Link href={demoHref()} className="btn btn-accent">
            Book a Demo
          </Link>
        }
      />

      {logos.length > 0 && (
        <section className="section section-line compact">
          <div className="container">
            <span className="eyebrow" data-reveal>
              Trusted by
            </span>
            <ul className="logo-row">
              {logos.map((l, i) => (
                <li key={l.id} className="serif" data-reveal data-delay={0.04 * i}>
                  {l.name}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {cases.length > 0 && (
        <section className="section section-line">
          <div className="container">
            <SectionHead eyebrow="Case studies" heading="Shipped, measured, still running" accent="still running" />
            <div className="cases">
              {cases.map((c, i) => (
                <article key={c.id} className="case" data-reveal data-delay={0.05 * i}>
                  <ul className="case-tags">
                    {asStringArray(c.tags).map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <h3 className="h3 serif">{c.client}</h3>
                  <p>{c.copy}</p>
                  {asMetrics(c.metrics).length > 0 && (
                    <dl className="case-metrics">
                      {asMetrics(c.metrics).map((m) => (
                        <div key={m.label}>
                          <dt className="serif">{m.value}</dt>
                          <dd>{m.label}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {testimonials.length > 0 && (
        <section className="section section-line tint">
          <div className="container">
            <SectionHead eyebrow="In their words" heading="What customers say" accent="say" />
            <Testimonials items={testimonials} />
          </div>
        </section>
      )}

      {!hasStories && (
        <section className="section section-line">
          <div className="container narrow">
            <div className="usecase" data-reveal>
              <span className="eyebrow">Customer stories</span>
              <p className="serif">
                We’re writing up detailed customer stories now. In the meantime, book a demo and we’ll walk you through how
                businesses like yours run on the platform.
              </p>
              <Link href={demoHref()} className="usecase-link">
                Book a Demo →
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="section section-line tint">
        <div className="container">
          <SectionHead eyebrow="By industry" heading={HOME.industries.heading} accent={HOME.industries.accent} />
          <div className="card-grid">
            {INDUSTRIES.map((ind, i) => (
              <LinkCard key={ind.slug} href={industryHref(ind.slug)} title={ind.name} note={ind.tile} delay={0.04 * i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner heading={HOME.banner.heading} accent={HOME.banner.accent} />
    </>
  );
}
