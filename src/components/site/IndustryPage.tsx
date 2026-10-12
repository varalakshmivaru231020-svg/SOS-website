import Link from "next/link";
import type { Industry } from "@/content/types";
import { INDUSTRIES, contactHref, demoHref, getProduct, industryHref, productHref } from "@/content";
import { HOME } from "@/content/site";
import PageHero from "./PageHero";
import SectionHead from "./SectionHead";
import DemoVisual from "./DemoVisual";
import CtaBanner from "./CtaBanner";

/**
 * The one industry page template (guide Section 5): hero, the pain point, how
 * we solve it with the products used, a representative example, and the demo
 * banner. "Benefits & Facts" appears once there are measured results to show.
 */
export default function IndustryPage({ ind }: { ind: Industry }) {
  const others = INDUSTRIES.filter((i) => i.slug !== ind.slug);

  return (
    <>
      <PageHero
        crumbs={[
          { label: "Industries", href: "/industries" },
          { label: ind.name, href: industryHref(ind.slug) },
        ]}
        eyebrow="Industries"
        title={`Built for ${ind.name}`}
        accent={ind.name}
        lede={ind.hero.sub}
        actions={
          <>
            <Link href={demoHref()} className="btn btn-accent">
              Book a Demo
            </Link>
            <Link href="#products-used" className="btn btn-ghost">
              See the products
            </Link>
          </>
        }
        visual={<DemoVisual demo={ind.demo} />}
      />

      {/* ── The pain point ── */}
      <section className="section section-line">
        <div className="container">
          <SectionHead eyebrow="The pain point" heading="Sound familiar?" accent="familiar?" />
          <ol className="pains">
            {ind.pains.map((p, i) => (
              <li key={p} data-reveal data-delay={0.06 * i}>
                <span className="pain-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {p}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── How we solve it ── */}
      <section className="section section-line tint" id="products-used">
        <div className="container">
          <span className="eyebrow" data-reveal>
            How we solve it
          </span>
          <p className="problem serif" data-reveal data-delay="0.06">
            {ind.solve}
          </p>
          <h2 className="h3 serif solve-sub" data-reveal>
            Products used
          </h2>
          <div className="card-grid">
            {ind.uses.map((u, i) => {
              const p = getProduct(u.product);
              if (!p) return null;
              return (
                <Link key={u.product} href={productHref(p.slug)} className="l-card" data-reveal data-delay={0.05 * i}>
                  <span className="l-kicker">{p.tagline}</span>
                  <span className="l-title">{p.name}</span>
                  <span className="l-note">{u.how}</span>
                  <span className="l-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Example ── */}
      <section className="section section-line">
        <div className="container narrow">
          <aside className="usecase" data-reveal>
            <span className="eyebrow">In practice · Example</span>
            <p className="serif">{ind.example}</p>
            <Link href={contactHref()} className="usecase-link">
              Talk to us about your setup →
            </Link>
          </aside>
        </div>
      </section>

      {/* ── Other industries ── */}
      <section className="section section-line tint compact">
        <div className="container">
          <span className="eyebrow" data-reveal>
            Other industries
          </span>
          <ul className="chips" data-reveal data-delay="0.06">
            {others.map((o) => (
              <li key={o.slug}>
                <Link href={industryHref(o.slug)} className="chip chip-link">
                  {o.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner heading={HOME.banner.heading} accent={HOME.banner.accent} />
    </>
  );
}
