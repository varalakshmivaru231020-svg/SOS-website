import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getSettings } from "@/lib/content";
import LegalPage, { type LegalSection } from "@/components/site/LegalPage";

export async function generateMetadata(): Promise<Metadata> {
  return pageMetadata("/legal/cookies", {
    title: "Cookie Policy | Supreme One Software",
    description: "The cookies and similar technologies used on the Supreme One Software website, and how to control them.",
  });
}

// Decided at build time from the same variables that switch the scripts on,
// so the policy matches what this deployment runs.
const ANALYTICS = Boolean(process.env.NEXT_PUBLIC_GA_ID);
const CHAT_WIDGET = Boolean(process.env.NEXT_PUBLIC_CHAT_WIDGET_SRC);

const buildSections = (email: string): LegalSection[] => [
  {
    title: "What cookies are",
    body: [
      "Cookies are small files a website stores in your browser. Similar technologies — like the browser’s session storage — do much the same job. This policy covers both.",
    ],
  },
  {
    title: "What this site uses",
    body: [
      "Our own pages set no advertising cookies. We keep one note in your browser’s session storage so the opening animation plays only once per visit; it is cleared when you close the tab.",
      "If you are a member of our team signing in to the site’s admin area, a strictly necessary cookie keeps you signed in. Visitors to the public site never receive it.",
    ],
  },
  {
    title: "Analytics",
    body: [
      ANALYTICS
        ? "We use Google Analytics, which sets cookies (named _ga and _ga_*) to count visits, see which pages are read, and measure how often the Book a Demo button is used. The data is aggregated and does not include anything you type into our forms."
        : "This site currently runs no analytics cookies. If we add analytics, we’ll update this policy first.",
    ],
  },
  {
    title: "Third-party content",
    body: [
      "The map on our contact page is embedded from Google Maps, and Google may set its own cookies when it loads. The WhatsApp button opens WhatsApp, where Meta’s policies apply.",
      ...(CHAT_WIDGET
        ? ["The chat widget on this site is provided by our own messaging platform and may store a conversation identifier so your chat continues across pages."]
        : []),
    ],
  },
  {
    title: "Controlling cookies",
    body: [
      "You can block or delete cookies in your browser settings. Blocking them won’t stop the site working — you may just see the opening animation again, and an embedded map may not load.",
    ],
  },
  {
    title: "Contact",
    body: [`Questions about cookies on this site go to ${email}.`],
  },
];

export default async function CookiesPage() {
  const settings = await getSettings();
  return (
    <LegalPage
      path="/legal/cookies"
      title="Cookie Policy"
      accent="Policy"
      lede="What this site stores in your browser, and why."
      updated="October 2026"
      sections={buildSections(settings.contactEmail)}
    />
  );
}
