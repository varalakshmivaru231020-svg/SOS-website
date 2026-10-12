import type { Metadata } from "next";
import { getFaqGroups } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { HOME } from "@/content/site";
import PageHero from "@/components/site/PageHero";
import SectionHead from "@/components/site/SectionHead";
import FaqAccordion from "@/components/site/FaqAccordion";
import CtaBanner from "@/components/site/CtaBanner";
import JsonLd from "@/components/site/JsonLd";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/faq", {
    title: "FAQ | Supreme One Software",
    description:
      "Answers about Supreme One Software’s products, WhatsApp Business API, Meta verification, pricing, setup, support and custom app and website development.",
  });
}

// The FAQ page shows the general groups; "contact" belongs to the contact page
// and "pricing" also appears on the pricing page.
const PAGE_GROUPS = ["general", "channels", "pricing", "support"];

export default async function FaqPage() {
  const groups = (await getFaqGroups()).filter((g) => PAGE_GROUPS.includes(g.key) && g.items.length > 0);
  const all = groups.flatMap((g) => g.items);

  return (
    <>
      <PageHero
        crumbs={[{ label: "FAQ", href: "/faq" }]}
        eyebrow="FAQ"
        title="Questions, answered"
        accent="answered"
        lede="Products, channels, pricing, setup and support — the things people ask us most."
      />
      {groups.map((g, i) => (
        <section key={g.id} className={`section section-line${i % 2 ? " tint" : ""}`}>
          <div className="container narrow">
            <SectionHead heading={g.title} />
            <div className="faq-wrap" data-reveal data-delay="0.08">
              <FaqAccordion items={g.items.map((it) => ({ id: it.id, question: it.question, answer: it.answer }))} />
            </div>
          </div>
        </section>
      ))}
      {all.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: all.map((it) => ({
              "@type": "Question",
              name: it.question,
              acceptedAnswer: { "@type": "Answer", text: it.answer },
            })),
          }}
        />
      )}
      <CtaBanner heading={HOME.banner.heading} accent={HOME.banner.accent} />
    </>
  );
}
