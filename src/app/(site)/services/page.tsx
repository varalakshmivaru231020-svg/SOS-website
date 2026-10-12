import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { SERVICES, contactHref, demoHref, offeringHref } from "@/content";
import { ABOUT, HOME } from "@/content/site";
import PageHero from "@/components/site/PageHero";
import SectionHead from "@/components/site/SectionHead";
import CtaBanner from "@/components/site/CtaBanner";
import { LinkCard, Steps } from "@/components/site/Cards";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/services", {
    title: "Custom engineering — Mobile apps & websites | Supreme One Software",
    description:
      "Android and iOS apps and fast, SEO-ready websites, built by the same team as your messaging stack. Start a project with Supreme One Software.",
  });
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Services", href: "/services" }]}
        eyebrow="Custom engineering"
        title="Apps and websites, wired into your conversations"
        accent="wired into"
        lede={HOME.services.sub}
        actions={
          <>
            <Link href={contactHref()} className="btn btn-accent">
              Start a Project
            </Link>
            <Link href={demoHref()} className="btn btn-ghost">
              Book a Call
            </Link>
          </>
        }
      />

      <section className="section section-line">
        <div className="container">
          <SectionHead eyebrow="What we build" heading="Two services, one team" accent="one team" />
          <div className="card-grid two">
            {SERVICES.map((s, i) => (
              <LinkCard
                key={s.slug}
                href={offeringHref(s)}
                kicker={s.tagline}
                title={s.name}
                note={s.hero.sub}
                delay={0.06 * i}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-line tint">
        <div className="container">
          <SectionHead eyebrow="How we work" heading="From first call to launch" accent="launch" />
          <Steps steps={ABOUT.process} />
        </div>
      </section>

      <CtaBanner
        heading="Have something in mind? Let’s scope it together."
        accent="scope it"
        cta="Start a Project"
        href={contactHref()}
        secondary={{ label: "Book a Call", href: demoHref() }}
      />
    </>
  );
}
