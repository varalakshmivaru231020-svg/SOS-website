import Link from "next/link";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/content";
import LegalPage, { type LegalSection } from "@/components/site/LegalPage";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/legal/privacy", {
    title: "Privacy Policy | Supreme One Software",
    description: "How Supreme One Software Pvt Ltd collects, uses and protects your personal information.",
  });
}

// Whether analytics is switched on is decided at build time, so the policy
// always describes what this deployment actually runs.
const ANALYTICS = Boolean(process.env.NEXT_PUBLIC_GA_ID);

const buildSections = (email: string): LegalSection[] => [
  {
    title: "What we collect",
    body: [
      "When you write to us or book a demo through this site, we collect the details you choose to share: your name, email address, and — if you add them — your phone number, company and message, along with the product you’re interested in. We also note which page of our site you came from, so we know what you were reading when you got in touch.",
      "Like most websites, our servers also record basic technical logs — IP address, browser type and the pages requested — used only to keep the site running and secure.",
    ],
  },
  {
    title: "How we use it",
    body: [
      "We use your details to respond to your enquiry and, if the conversation continues, to arrange a demo, prepare a quote, or scope and deliver the work you’ve asked about.",
      "We don’t sell your information, we don’t rent it, and we don’t add you to a marketing list unless you explicitly ask to hear from us.",
    ],
  },
  {
    title: "Storage and security",
    body: [
      "Enquiry data is stored on access-controlled infrastructure and encrypted in transit. Access is limited to the Supreme One Software team members who need it to answer you.",
    ],
  },
  {
    title: "Retention",
    body: [
      "We keep enquiry details only as long as the conversation or engagement requires. If a project doesn’t proceed, we delete the enquiry within twelve months. You can ask us to delete it sooner at any time.",
    ],
  },
  {
    title: "Third parties",
    body: [
      "Form submissions reach us through an email delivery provider, which processes your message solely to route it to our inbox.",
      "Our contact page shows a map embedded from Google Maps, which loads content from Google; and the WhatsApp button opens WhatsApp, where Meta’s own terms apply.",
      ANALYTICS
        ? "We use Google Analytics to understand how visitors use the site — which pages are viewed and how often the Book a Demo button is used. Google processes this data on our behalf; it does not include the contents of your enquiry."
        : "This site runs no advertising trackers and no analytics that identify you.",
      <>
        More detail is in our <Link href="/legal/cookies">Cookie Policy</Link>.
      </>,
    ],
  },
  {
    title: "Your rights",
    body: [
      "You can ask us what personal information we hold about you, ask us to correct it, or ask us to delete it. Write to us and we’ll act on the request promptly, in line with applicable data-protection law — including India’s Digital Personal Data Protection Act where it applies.",
    ],
  },
  {
    title: "Contact",
    body: [
      `Questions about this policy — or any request about your data — go to ${email}. Supreme One Software Pvt Ltd operates from Bengaluru, Karnataka, India.`,
    ],
  },
];

export default async function PrivacyPage() {
  const settings = await getSettings();
  return (
    <LegalPage
      path="/legal/privacy"
      title="Privacy Policy"
      accent="Policy"
      lede="The short version: we collect only what you send us, we use it only to talk to you, and we never sell it."
      updated="October 2026"
      sections={buildSections(settings.contactEmail)}
    />
  );
}
