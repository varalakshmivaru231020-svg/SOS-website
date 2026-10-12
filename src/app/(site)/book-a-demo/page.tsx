import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { INTEREST_GROUPS } from "@/content";
import PageHero from "@/components/site/PageHero";
import SectionHead from "@/components/site/SectionHead";
import ContactForm from "@/components/site/ContactForm";
import { Steps } from "@/components/site/Cards";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/book-a-demo", {
    title: "Book a Demo | Supreme One Software",
    description:
      "See WhatsApp Business API, chatbots, campaigns, the unified team inbox and more working on your own conversations. Book a demo with Supreme One Software.",
  });
}

const NEXT_STEPS = [
  { title: "Tell us about your business", copy: "The channels you use today and what you’d like to automate." },
  { title: "We set up a walkthrough", copy: "Built around your own conversations, not a generic script." },
  { title: "Get a plan to go live", copy: "Including Meta verification and template approval support." },
];

// The form sits in the hero so it is in view on arrival — this is the page
// every Book a Demo button lands on.
export default function BookDemoPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: "Book a Demo", href: "/book-a-demo" }]}
        eyebrow="Book a Demo"
        title="See the platform working on your own conversations"
        accent="your own conversations"
        lede="Pick what you’d like to see and leave your details — our team will reach out to schedule a walkthrough."
        visual={
          <div className="form-card hero-form" id="enquiry" data-reveal data-delay="0.12">
            <ContactForm groups={INTEREST_GROUPS} intent="demo" />
          </div>
        }
      />
      <section className="section section-line tint">
        <div className="container">
          <SectionHead eyebrow="What happens next" heading="Three steps to a working setup" accent="working setup" />
          <Steps steps={NEXT_STEPS} />
        </div>
      </section>
    </>
  );
}
