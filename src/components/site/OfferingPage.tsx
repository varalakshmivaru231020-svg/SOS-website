import Link from "next/link";
import Image from "next/image";
import type { Offering } from "@/content/types";
import { OFFERINGS, PRODUCT_GROUPS, contactHref, demoHref, getIndustry, industryHref, offeringHref } from "@/content";
import PageHero from "./PageHero";
import SectionHead from "./SectionHead";
import DemoVisual from "./DemoVisual";
import CtaBanner from "./CtaBanner";
import JsonLd from "./JsonLd";
import FaqAccordion from "./FaqAccordion";
import { Features, LinkCard, Steps } from "./Cards";

const GROUP_LABEL: Record<Offering["group"], string> = {
  ...(Object.fromEntries(PRODUCT_GROUPS.map((g) => [g.key, g.label])) as Record<"messaging" | "automation", string>),
  engineering: "Custom engineering",
};

/**
 * The one product page template (guide Section 4): every product and service
 * page is this component filled with a different record. Sections with nothing
 * real to show yet — screenshots, a testimonial, placeholder benchmarks — are
 * left out rather than rendered as placeholders.
 */
export default function OfferingPage({ o }: { o: Offering }) {
  const isService = o.kind === "service";
  const benefits = o.benefits.filter((b) => !b.illustrative);
  const shotsReady = o.shots.length > 0 && o.shots.every((s) => s.src);
  const related = OFFERINGS.filter((x) => x.group === o.group && x.slug !== o.slug).slice(0, 3);
  const industries = o.builtFor.map(getIndustry).filter((i) => i !== undefined);

  return (
    <>
      <PageHero
        crumbs={[
          isService ? { label: "Services", href: "/services" } : { label: "Products", href: "/products" },
          { label: o.name, href: offeringHref(o) },
        ]}
        eyebrow={`${GROUP_LABEL[o.group]} · ${o.name}`}
        title={o.hero.headline}
        accent={o.hero.accent}
        lede={o.hero.sub}
        actions={
          <>
            <Link href={isService ? contactHref(o.slug) : demoHref(o.slug)} className="btn btn-accent">
              {isService ? "Start a Project" : "Book a Demo"}
            </Link>
            <Link href={isService ? demoHref(o.slug) : contactHref(o.slug)} className="btn btn-ghost">
              {isService ? "Book a Call" : "Talk to Sales"}
            </Link>
          </>
        }
        visual={<DemoVisual demo={o.demo} />}
      />

      {/* ── The problem ── */}
      <section className="section section-line">
        <div className="container narrow">
          <span className="eyebrow" data-reveal>
            The problem
          </span>
          <p className="problem serif" data-reveal data-delay="0.06">
            {o.problem}
          </p>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section section-line tint">
        <div className="container">
          <SectionHead
            eyebrow="How it works"
            heading={isService ? "From first call to launch" : "Four steps from setup to results"}
            accent={isService ? "launch" : "results"}
          />
          <Steps steps={o.steps} />
        </div>
      </section>

      {/* ── Key features ── */}
      <section className="section section-line">
        <div className="container split">
          <SectionHead
            eyebrow="Key features"
            heading="What’s included"
            accent="included"
            sub={isService ? undefined : `${o.name} runs on the same platform as every other product — one set of contacts, one inbox, one set of reports.`}
          />
          <Features items={o.features} />
        </div>
      </section>

      {/* ── Screenshots — shown once the designer's images are in place ── */}
      {shotsReady && (
        <section className="section section-line tint">
          <div className="container">
            <SectionHead eyebrow="A closer look" heading={`Inside ${o.name}`} accent={o.name} />
            <div className="shots">
              {o.shots.map((s, i) => (
                <figure key={s.title} className="shot" data-reveal data-delay={0.06 * i}>
                  <Image src={s.src!} alt={s.title} width={1200} height={900} sizes="(max-width: 860px) 100vw, 33vw" />
                  <figcaption>{s.title}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Benefits & use case ── */}
      <section className="section section-line">
        <div className="container split">
          <div>
            <SectionHead eyebrow="Benefits" heading="Why it matters" accent="matters" />
            <ul className="benefits">
              {benefits.map((b, i) => (
                <li key={b.text} data-reveal data-delay={0.06 * i}>
                  {b.text}
                </li>
              ))}
            </ul>
          </div>
          <aside className="usecase" data-reveal data-delay="0.1">
            <span className="eyebrow">In practice · Example</span>
            <p className="serif">{o.useCase}</p>
          </aside>
        </div>
      </section>

      {/* ── Built for / Works with ── */}
      <section className="section section-line tint">
        <div className="container fit-grid">
          <div>
            <span className="eyebrow" data-reveal>
              Built for
            </span>
            <ul className="chips" data-reveal data-delay="0.06">
              {industries.map((ind) => (
                <li key={ind.slug}>
                  <Link href={industryHref(ind.slug)} className="chip chip-link">
                    {ind.name} <span aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="eyebrow" data-reveal>
              Works with
            </span>
            <ul className="chips" data-reveal data-delay="0.06">
              {o.worksWith.map((w) => (
                <li key={w} className="chip">
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Testimonial slot ── */}
      {o.testimonial && (
        <section className="section section-line">
          <div className="container narrow">
            <blockquote className="quote" data-reveal>
              <p className="serif">“{o.testimonial.quote}”</p>
              <footer>
                <b>{o.testimonial.name}</b> — {o.testimonial.role}, {o.testimonial.company}
              </footer>
            </blockquote>
          </div>
        </section>
      )}

      {/* ── FAQ ── */}
      <section className="section section-line">
        <div className="container narrow">
          <SectionHead eyebrow="FAQ" heading="Questions, answered" accent="answered" />
          <div className="faq-wrap" data-reveal data-delay="0.1">
            <FaqAccordion items={o.faqs.map((f, i) => ({ id: `${o.slug}-${i}`, question: f.q, answer: f.a }))} />
          </div>
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: o.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      {/* ── Related ── */}
      {related.length > 0 && (
        <section className="section section-line tint">
          <div className="container">
            <SectionHead
              eyebrow={isService ? "More services" : "Works even better together"}
              heading={isService ? "Also from our engineering team" : "Pair it with"}
              accent={isService ? "engineering team" : "Pair it"}
            />
            <div className="card-grid three">
              {related.map((r, i) => (
                <LinkCard key={r.slug} href={offeringHref(r)} title={r.name} note={r.tagline} delay={0.05 * i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBanner
        heading={o.closing.headline}
        accent={o.closing.accent}
        sub={o.closing.sub}
        cta={o.closing.cta}
        interest={o.slug}
        {...(isService && {
          href: contactHref(o.slug),
          secondary: { label: "Book a Call", href: demoHref(o.slug) },
        })}
      />
    </>
  );
}
