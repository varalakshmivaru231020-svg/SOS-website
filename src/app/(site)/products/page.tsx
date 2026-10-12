import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PRODUCT_GROUPS, SERVICES, contactHref, demoHref, getProduct, offeringHref, productsIn } from "@/content";
import { HOME, HOW_IT_WORKS } from "@/content/site";
import PageHero from "@/components/site/PageHero";
import SectionHead from "@/components/site/SectionHead";
import DemoVisual from "@/components/site/DemoVisual";
import CtaBanner from "@/components/site/CtaBanner";
import { Features, LinkCard, Steps } from "@/components/site/Cards";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/products", {
    title: "Platform overview — 11 communication products | Supreme One Software",
    description:
      "WhatsApp Business API, RCS, IVR, Facebook and Instagram automation, chatbots, campaigns, a unified team inbox, e-commerce, forms and AI reviews — one platform. Book a demo.",
  });
}

const GROUP_HEADINGS: Record<(typeof PRODUCT_GROUPS)[number]["key"], { heading: string; accent: string }> = {
  messaging: { heading: "Reach customers on the channels they already use", accent: "already use" },
  automation: { heading: "Automate the routine, grow what works", accent: "grow what works" },
};

const SHARED = [
  { title: "One set of contacts", copy: "Every product reads and writes the same customer records." },
  { title: "One shared inbox", copy: "Conversations from every channel land with the same team." },
  { title: "One set of reports", copy: "Delivery, response times, conversions and reviews, measured in one place." },
  {
    title: "Set up with you",
    copy: "Onboarding, Meta verification and template approval support, then ongoing support.",
  },
];

export default function ProductsOverviewPage() {
  const inbox = getProduct("unified-team-inbox");
  return (
    <>
      <PageHero
        crumbs={[{ label: "Products", href: "/products" }]}
        eyebrow="Platform overview"
        title={HOME.products.heading}
        accent={HOME.products.accent}
        lede={HOME.products.sub}
        actions={
          <>
            <Link href={demoHref("platform")} className="btn btn-accent" data-magnet>
              Book a Demo
            </Link>
            <Link href={contactHref("platform")} className="btn btn-ghost" data-magnet>
              Talk to Sales
            </Link>
          </>
        }
        visual={inbox && <DemoVisual demo={inbox.demo} />}
      />

      {PRODUCT_GROUPS.map((g, gi) => (
        <section key={g.key} className={`section section-line${gi % 2 ? " tint" : ""}`}>
          <div className="container">
            <SectionHead eyebrow={g.label} heading={GROUP_HEADINGS[g.key].heading} accent={GROUP_HEADINGS[g.key].accent} />
            <div className="card-grid three">
              {productsIn(g.key).map((p, i) => (
                <LinkCard key={p.slug} href={offeringHref(p)} title={p.name} note={p.tagline} delay={0.04 * i} />
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section section-line">
        <div className="container split">
          <SectionHead
            eyebrow="One platform"
            heading="Pick one tool or run them all together"
            accent="all together"
          />
          <Features items={SHARED} />
        </div>
      </section>

      <section className="section section-line tint">
        <div className="container">
          <SectionHead eyebrow="How it works" heading={HOW_IT_WORKS.heading} accent={HOW_IT_WORKS.accent} />
          <Steps steps={HOW_IT_WORKS.steps} />
        </div>
      </section>

      <section className="section section-line">
        <div className="container split">
          <SectionHead eyebrow="Services" heading={HOME.services.heading} accent={HOME.services.accent} sub={HOME.services.sub} />
          <div className="card-stack">
            {SERVICES.map((s, i) => (
              <LinkCard key={s.slug} href={offeringHref(s)} title={s.name} note={s.tagline} delay={0.06 * i} />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner heading={HOME.banner.heading} accent={HOME.banner.accent} interest="platform" />
    </>
  );
}
