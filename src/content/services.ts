// Custom engineering — Section 4C of the website content guide. Same page
// template as the products, with "Start a Project / Book a Call" actions.
import type { Service } from "./types";

export const SERVICES: Service[] = [
  {
    kind: "service",
    slug: "mobile-app-development",
    group: "engineering",
    name: "Mobile App Development",
    tagline: "Android and iOS apps",
    priority: "P3",
    seo: {
      title: "Mobile App Development | Supreme One Software",
      description:
        "Custom Android & iOS apps, connected to your messaging stack. Book a demo with Supreme One Software.",
    },
    hero: {
      headline: "Custom mobile apps built around your business",
      accent: "your business",
      sub: "Custom Android & iOS apps, connected to your messaging stack.",
    },
    problem:
      "Off-the-shelf app templates rarely fit a growing business’s exact workflow, and hiring and managing a separate app vendor adds time and coordination overhead.",
    steps: [
      { title: "Discovery & planning", copy: "We map your workflows, users and must-have features." },
      { title: "Design", copy: "Wireframes and UI design tailored to your brand." },
      { title: "Development", copy: "Native or cross-platform build with backend and API integration." },
      {
        title: "Launch & support",
        copy: "App Store / Play Store submission plus ongoing post-launch support.",
      },
    ],
    features: [
      {
        title: "Native & cross-platform builds",
        copy: "Choose the right approach for your budget and timeline.",
      },
      {
        title: "Backend & API integration",
        copy: "Connect to your existing systems, including your chat stack.",
      },
      { title: "Custom UI/UX design", copy: "A tailored interface, not a generic template." },
      {
        title: "App Store & Play Store deployment",
        copy: "We handle the submission and approval process.",
      },
      { title: "Post-launch support", copy: "Bug fixes, updates and new features after launch." },
    ],
    shots: [
      { title: "Three finished app screens in device frames" },
      { title: "Build-process timeline graphic" },
      { title: "Diagram: app connected to the chat backend" },
    ],
    benefits: [
      { text: "One team, one roadmap — your app and messaging stack share the same backend." },
      { text: "No handoff gap between separate vendors." },
      { text: "Ongoing support after launch, not a one-time handover." },
    ],
    useCase:
      "A logistics company gets a driver-facing delivery app connected to the same backend as their WhatsApp customer bot — a status update in one place reflects instantly in the other.",
    builtFor: ["logistics-distribution", "retail-e-commerce", "healthcare", "real-estate"],
    worksWith: ["Your existing CRM", "Payment gateways", "WhatsApp / chat stack", "Cloud backends"],
    faqs: [
      {
        q: "Do you build native apps or cross-platform?",
        a: "We recommend the right approach based on your budget, timeline and feature needs — both are available.",
      },
      {
        q: "How long does a typical build take?",
        a: "It depends on scope — we’ll give a clear estimate after the discovery call.",
      },
      {
        q: "Can you maintain an existing app instead of building new?",
        a: "Yes — we take on maintenance and new feature work for existing apps too.",
      },
      {
        q: "Will the app connect with our WhatsApp/chat setup?",
        a: "Yes — this is one of our specialties, since we build both in-house.",
      },
    ],
    closing: { headline: "Have an app idea? Let’s scope it together.", accent: "scope it", cta: "Start a project" },
    demo: {
      channel: "whatsapp",
      contact: "SwiftRoute Logistics",
      messages: [
        { from: "event", text: "Driver app · marked delivered" },
        {
          from: "business",
          card: {
            title: "Delivered · Order #3391",
            body: "Received by R. Kumar at 2:14 pm",
            actions: ["View proof of delivery"],
          },
        },
        { from: "customer", text: "Got it, thanks!" },
      ],
    },
  },
  {
    kind: "service",
    slug: "website-development",
    group: "engineering",
    name: "Website Development",
    tagline: "Fast, SEO-ready websites",
    priority: "P3",
    seo: {
      title: "Website Development | Supreme One Software",
      description:
        "Fast, modern websites built to convert — with your chat stack pre-integrated. Book a demo with Supreme One Software.",
    },
    hero: {
      headline: "Fast, modern websites built to convert",
      accent: "built to convert",
      // The guide's sub repeated the headline; this keeps its point.
      sub: "Custom-designed, SEO-ready and mobile-first — with your chat stack pre-integrated from day one.",
    },
    problem:
      "Many business websites are slow, hard to update, and disconnected from the chat and marketing tools the business actually uses day to day — creating extra work and missed opportunities.",
    steps: [
      { title: "Discovery", copy: "We learn your goals, audience and must-have pages." },
      { title: "Design", copy: "A clean, modern design aligned to your brand." },
      { title: "Build", copy: "Development on a fast, SEO-ready, mobile-first foundation." },
      {
        title: "Launch & integrate",
        copy: "Go live with your chat widget, forms and analytics pre-connected.",
      },
    ],
    features: [
      { title: "Custom design", copy: "No generic templates; built around your brand and goals." },
      { title: "CMS options", copy: "Update content yourself without needing a developer for every change." },
      { title: "SEO-ready structure", copy: "Clean code, fast load times, proper on-page basics." },
      { title: "Chat widget pre-integrated", copy: "Your WhatsApp/chat automation is live from day one." },
      { title: "Mobile-first & responsive", copy: "Looks and works great on every device." },
    ],
    shots: [
      { title: "Before and after of a client website" },
      { title: "Responsive device mockup (desktop, tablet, phone)" },
      { title: "Website with the chat widget live" },
    ],
    benefits: [
      { text: "One vendor for both the website and the messaging stack behind it." },
      { text: "No handoff gap between separate teams." },
      { text: "Faster path from launch to a fully working chat-enabled site." },
    ],
    useCase:
      "A clinic gets a new booking-focused website with the WhatsApp chatbot embedded from day one — visitors book an appointment without leaving the page.",
    builtFor: ["healthcare", "real-estate", "education", "hospitality-travel"],
    worksWith: ["WhatsApp Business API", "Google Analytics", "CRM systems", "Payment gateways"],
    faqs: [
      {
        q: "Can you redesign our existing site instead of building from scratch?",
        a: "Yes — a full redesign or a phased rebuild, depending on your timeline and budget.",
      },
      {
        q: "Will I be able to edit content myself after launch?",
        a: "Yes, on a CMS-based build you’ll have access to update text, images and blog posts.",
      },
      {
        q: "Does the chat widget cost extra?",
        // The guide said "a Botsync customer"; this is the platform's own customer base.
        a: "It’s included when you’re already a platform customer; we’ll walk through pricing during scoping.",
      },
      {
        q: "How long does a typical website project take?",
        a: "It depends on the number of pages and features — we’ll give a clear timeline after discovery.",
      },
    ],
    closing: {
      headline: "Let’s build a site that actually works for your business.",
      accent: "actually works",
      cta: "Start a project",
    },
    demo: {
      channel: "web",
      contact: "Sunrise Clinic",
      messages: [
        { from: "event", text: "Visitor on /book-appointment" },
        { from: "business", text: "Hi! Would you like to book an appointment?", replies: ["Today", "Tomorrow", "Pick a date"] },
        { from: "customer", text: "Tomorrow" },
        {
          from: "business",
          card: { title: "Tomorrow · 10:00 am", body: "Dr. Mehta · General consultation", actions: ["Confirm booking"] },
        },
      ],
    },
  },
];
