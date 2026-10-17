import Link from "next/link";
import type { Metadata } from "next";
import { getHeroStats, getTestimonials } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import {
  INDUSTRIES,
  PRODUCT_GROUPS,
  SERVICES,
  demoHref,
  getProduct,
  industryHref,
  offeringHref,
  productsIn,
} from "@/content";
import { HOME, HOW_IT_WORKS, WHY_US } from "@/content/site";
import HeroSlider, { type HeroSlide } from "@/components/site/HeroSlider";
import Cinematic from "@/components/site/Cinematic";
import SectionHead from "@/components/site/SectionHead";
import CtaBanner from "@/components/site/CtaBanner";
import Testimonials from "@/components/site/Testimonials";
import { LinkCard, Steps } from "@/components/site/Cards";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/", HOME.seo);
}

const slides: HeroSlide[] = HOME.slides.map((s) => {
  if (!s.product) {
    return {
      tab: s.tab,
      eyebrow: HOME.hero.eyebrow,
      headline: HOME.hero.headline,
      accent: HOME.hero.accent,
      sub: HOME.hero.sub,
      cta: { href: demoHref(), label: "Book a Demo" },
      secondary: { href: "/products", label: "Explore Products" },
      demo: HOME.heroDemo,
    };
  }
  const p = getProduct(s.product)!;
  return {
    tab: s.tab,
    eyebrow: p.name,
    headline: s.headline,
    accent: s.accent,
    sub: s.sub,
    cta: { href: demoHref(p.slug), label: "Book a Demo" },
    secondary: { href: offeringHref(p), label: `Explore ${p.name}` },
    demo: p.demo,
  };
});

export default async function HomePage() {
  const [stats, testimonials] = await Promise.all([getHeroStats(), getTestimonials()]);
  // Featured quotes first; the home page shows up to three.
  const quotes = (testimonials.some((t) => t.featured) ? testimonials.filter((t) => t.featured) : testimonials).slice(
    0,
    3,
  );

  return (
    <>
      <HeroSlider
        slides={slides}
        backdrop="/images/home-hero.webp"
        badge={{ href: "/products", label: "ERP, CRM & Website Builder" }}
        note={HOME.hero.note}
      />

      {/* ── Proof strip — figures are managed in Admin → Site blocks ── */}
      {stats.length > 0 && (
        <section className="proof-band" aria-label="At a glance">
          <div className="container">
            <dl className="proof">
              {stats.map((s, i) => (
                <div key={s.id} className="proof-item" data-reveal data-delay={0.06 * i}>
                  <dt className="serif" data-count>
                    {s.value}
                  </dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* ── Products ── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Products"
            heading={HOME.products.heading}
            accent={HOME.products.accent}
            sub={HOME.products.sub}
          />
          <Cinematic src="/images/home-platform.webp" />
          {PRODUCT_GROUPS.map((g) => (
            <div key={g.key} className="group-block">
              <h3 className="group-label" data-reveal>
                {g.label}
              </h3>
              <div className="card-grid three">
                {productsIn(g.key).map((p, i) => (
                  <LinkCard key={p.slug} href={offeringHref(p)} title={p.name} note={p.tagline} delay={0.04 * i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="section section-line tint">
        <div className="container">
          <SectionHead eyebrow="How it works" heading={HOW_IT_WORKS.heading} accent={HOW_IT_WORKS.accent} />
          <Steps steps={HOW_IT_WORKS.steps} />
          <Cinematic src="/images/home-process.webp" delay={0.1} />
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="section section-line">
        <div className="container">
          <SectionHead
            eyebrow="Industries"
            heading={HOME.industries.heading}
            accent={HOME.industries.accent}
            sub={HOME.industries.sub}
          />
          <div className="card-grid four">
            {INDUSTRIES.filter((i) => i.onHome).map((ind, i) => (
              <LinkCard
                key={ind.slug}
                href={industryHref(ind.slug)}
                title={ind.label}
                note={ind.tile}
                delay={0.04 * i}
              />
            ))}
          </div>
          <div className="more-link" data-reveal>
            <Link href="/industries" className="btn btn-ghost">
              All industries →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why teams choose us ── */}
      <section className="section section-line tint">
        <div className="container">
          <SectionHead eyebrow="Why us" heading={HOME.why.heading} accent={HOME.why.accent} />
          <div className="why-grid">
            {WHY_US.map((w, i) => (
              <div key={w.title} className="why-item" data-reveal data-delay={0.07 * i}>
                <span className="why-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="h3 serif">{w.title}</h3>
                <p>{w.copy}</p>
              </div>
            ))}
          </div>
          <Cinematic src="/images/home-team.webp" delay={0.1} />
        </div>
      </section>

      {/* ── Custom services band ── */}
      <section className="section section-line">
        <div className="container split">
          <SectionHead
            eyebrow="Services"
            heading={HOME.services.heading}
            accent={HOME.services.accent}
            sub={HOME.services.sub}
          />
          <div className="card-stack">
            {SERVICES.map((s, i) => (
              <LinkCard key={s.slug} href={offeringHref(s)} title={s.name} note={s.tagline} delay={0.06 * i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials — appear once real quotes are added in Admin → Site blocks ── */}
      {quotes.length > 0 && (
        <section className="section section-line tint">
          <div className="container">
            <SectionHead eyebrow="Testimonials" heading="What our clients say" accent="clients" />
            <Testimonials items={quotes} />
          </div>
        </section>
      )}

      <CtaBanner heading={HOME.banner.heading} accent={HOME.banner.accent} />
    </>
  );
}
