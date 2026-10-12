import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { INDUSTRIES, industryHref } from "@/content";
import { HOME } from "@/content/site";
import PageHero from "@/components/site/PageHero";
import CtaBanner from "@/components/site/CtaBanner";
import { LinkCard } from "@/components/site/Cards";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/industries", {
    title: "Industries | Supreme One Software",
    description:
      "WhatsApp, chat and voice automation set up for retail, healthcare, education, real estate, hospitality, restaurants, BFSI, automotive, salons and logistics.",
  });
}

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Industries", href: "/industries" }]}
        eyebrow="Industries"
        title={HOME.industries.heading}
        accent={HOME.industries.accent}
        lede={HOME.industries.sub}
      />
      <section className="section section-line">
        <div className="container">
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
