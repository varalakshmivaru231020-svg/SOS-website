// Copy for the pages that aren't product/industry templates: the home page
// (guide Section 3), the platform overview and About (Section 1). Proof-strip
// figures, testimonials, pricing and FAQs live in the database instead, so
// marketing can confirm and change them from the admin panel.
import type { ChatDemo, Item, ProductSlug } from "./types";

type HeroSlideCopy =
  | { tab: string; product: null }
  | { tab: string; product: ProductSlug; headline: string; accent: string; sub: string };

export const HOME = {
  seo: {
    title: "Supreme One Software — Every customer conversation, in one place",
    description:
      "WhatsApp, Instagram, Facebook, RCS and cloud voice — automated, unified in one team inbox, and measured end to end. Book a demo with Supreme One Software.",
  },
  hero: {
    eyebrow: "Communication platform · by Supreme One Software",
    headline: "Every customer conversation, in one place",
    accent: "one place",
    sub: "WhatsApp, Instagram, Facebook, RCS and cloud voice — automated, unified in one team inbox, and measured end to end.",
    note: "WhatsApp Business API onboarding, template approval and setup support included.",
  },
  // Section 3.1 visual: customer asks about delivery, business replies, sends catalog.
  heroDemo: {
    channel: "whatsapp",
    contact: "Northwind Store",
    messages: [
      { from: "customer", text: "Hi! Do you deliver to Indiranagar?" },
      {
        from: "business",
        text: "We do — same-day on orders placed before 4 pm. Want to see what’s new this week?",
      },
      { from: "customer", text: "Yes please!" },
      {
        from: "business",
        catalog: [
          { name: "Linen shirt", price: "₹1,499" },
          { name: "Canvas tote", price: "₹899" },
          { name: "Desk lamp", price: "₹2,199" },
        ],
        replies: ["View catalog", "Talk to us"],
      },
    ],
  } satisfies ChatDemo,
  // The hero rotates through these. The first is the platform pitch above and
  // carries the page's H1; the rest each lead into one product.
  slides: [
    { tab: "Platform", product: null },
    {
      tab: "CRM",
      product: "crm",
      headline: "Every lead tracked from first message to sale",
      accent: "to sale",
      sub: "WhatsApp chats, calls and form enquiries become contacts, deals and follow-ups your whole team can see.",
    },
    {
      tab: "ERP",
      product: "erp",
      headline: "Stock, billing and accounts in one system",
      accent: "one system",
      sub: "Run inventory, purchasing, invoicing and payments together — with order updates sent to customers on WhatsApp.",
    },
    {
      tab: "Website Builder",
      product: "website-builder",
      headline: "A professional website, live this week",
      accent: "live this week",
      sub: "Pick a template, add your content and publish — with chat, enquiry forms and bookings built in.",
    },
    {
      tab: "Chatbot",
      product: "no-code-chatbot",
      headline: "Answer every customer, around the clock",
      accent: "around the clock",
      sub: "Build WhatsApp, Instagram and website bots visually, and hand over to your team when a person is needed.",
    },
  ] satisfies HeroSlideCopy[],
  products: {
    heading: "Fourteen products. One platform.",
    accent: "One platform.",
    sub: "Pick one tool or run all of them together — every product shares the same contacts, inbox and reports.",
  },
  industries: {
    heading: "Built for how your industry talks to customers",
    accent: "your industry",
    sub: "Same platform, set up around the conversations that matter in your business.",
  },
  why: {
    heading: "Why teams choose Supreme One",
    accent: "Supreme One",
  },
  services: {
    heading: "Need something custom?",
    accent: "custom?",
    sub: "Our engineering team builds the apps and websites that sit alongside your messaging stack.",
  },
  banner: {
    heading: "See the platform working on your own conversations",
    accent: "your own conversations",
  },
};

/** Section 3.4 — used on the home page and the platform overview. */
export const HOW_IT_WORKS: { heading: string; accent: string; steps: Item[] } = {
  heading: "From first message to measured result",
  accent: "measured result",
  steps: [
    {
      title: "Connect your channels",
      copy: "Link WhatsApp, Instagram, Facebook, RCS and your phone line.",
    },
    {
      title: "Automate the routine",
      copy: "Chatbots, IVR and campaigns handle FAQs, calls and broadcasts.",
    },
    {
      title: "Engage as a team",
      copy: "Agents reply from one shared inbox with assignment and SLA timers.",
    },
    {
      title: "Measure and improve",
      copy: "Track delivery, response times, conversions and reviews in one place.",
    },
  ],
};

/** Section 3.6. */
export const WHY_US: Item[] = [
  {
    title: "One partner for chat, voice and software",
    copy: "Messaging, calls, apps and websites come from one team, so nothing falls between vendors.",
  },
  {
    title: "Set up with you, not left to you",
    copy: "We help with Meta verification, template approvals and go-live, then stay on for support.",
  },
  {
    title: "Useful from day one",
    copy: "No-code tools your marketing and support teams run themselves, with developers only when you want them.",
  },
];

/** Section 1. Mission and values are drafts awaiting the founder's review. */
export const ABOUT = {
  seo: {
    title: "Our Story | Supreme One Software",
    description:
      "Supreme One Software builds the software that speaks for your business — a product studio and communication platform company, established in 2025.",
  },
  eyebrow: "Product studio & communication platform · Est. 2025",
  headline: "We build the software that speaks for your business",
  accent: "speaks",
  intro:
    "Supreme One Software is a product studio and communication platform company, combining engineering and messaging under one roof: web, mobile, custom systems, commerce and AI, wired into WhatsApp, SMS, RCS and cloud voice from day one.",
  whatWeDo: [
    {
      title: "Communication products",
      copy: "WhatsApp Business API, RCS, IVR, chatbots, campaigns, a unified team inbox and more, run from one platform.",
    },
    {
      title: "Custom engineering",
      copy: "Mobile apps and websites built to sit alongside your messaging stack.",
    },
  ] satisfies Item[],
  mission: "To help businesses talk to every customer, on every channel, without adding headcount.",
  values: [
    {
      title: "One partner",
      copy: "Chat, voice and software from a single team, so nothing falls between vendors.",
    },
    {
      title: "Set up with you",
      copy: "Onboarding, Meta verification and template approval support, then ongoing support.",
    },
    { title: "Useful from day one", copy: "No-code tools your own teams can run." },
  ] satisfies Item[],
  process: [
    { title: "Discover", copy: "Understand your workflows, customers and goals." },
    { title: "Design", copy: "Plan the conversation flows, screens or pages." },
    { title: "Build", copy: "Configure the platform or develop the custom software." },
    { title: "Launch & support", copy: "Go live, train your team, and stay on for support." },
  ] satisfies Item[],
};
