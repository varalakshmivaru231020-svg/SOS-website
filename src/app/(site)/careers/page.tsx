import type { Metadata } from "next";
import { getSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { ABOUT } from "@/content/site";
import PageHero from "@/components/site/PageHero";
import SectionHead from "@/components/site/SectionHead";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/careers", {
    title: "Careers | Supreme One Software",
    description:
      "Work at Supreme One Software — a product studio and communication platform team in Bengaluru building messaging, voice and custom software.",
  });
}

export default async function CareersPage() {
  const settings = await getSettings();
  const email = settings.contactEmail;

  return (
    <>
      <PageHero
        crumbs={[{ label: "Careers", href: "/careers" }]}
        eyebrow="Careers"
        title="Build the software businesses talk through"
        accent="talk through"
        lede="We’re a product studio and communication platform team building WhatsApp, voice and chat products — and the apps and websites that sit alongside them."
        actions={
          email ? (
            <a href={`mailto:${email}?subject=${encodeURIComponent("Careers")}`} className="btn btn-accent">
              Send us your CV
            </a>
          ) : undefined
        }
      />
      <section className="section section-line">
        <div className="container split">
          <SectionHead
            eyebrow="Open roles"
            heading="No roles listed right now"
            accent="right now"
            sub={`We’re always glad to hear from good engineers, designers and customer-facing people. Write to ${email} with your CV and a note about what you’d like to work on.`}
          />
          <div>
            <span className="eyebrow" data-reveal>
              How we work
            </span>
            <ul className="benefits">
              {ABOUT.values.map((v) => (
                <li key={v.title} data-reveal>
                  <b>{v.title}.</b> {v.copy}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
