// The eleven communication products — Section 4A/4B of the website content
// guide, transcribed into the product page template — plus the business
// software (ERP, Website Builder, CRM). Edits here go live on the
// next build. Departures from the guide are deliberate and noted inline.
import type { Product } from "./types";

export const PRODUCTS: Product[] = [
  // ── Messaging & voice ──────────────────────────────────────────────
  {
    kind: "product",
    slug: "whatsapp-business-api",
    group: "messaging",
    name: "WhatsApp Business API",
    tagline: "Verified, two-way messaging at scale",
    priority: "P1",
    seo: {
      title: "WhatsApp Business API | Supreme One Software",
      description:
        "Talk to customers where they already are — at scale, with automation. Book a demo with Supreme One Software.",
    },
    hero: {
      headline: "Turn WhatsApp into your #1 business channel",
      accent: "WhatsApp",
      sub: "Talk to customers where they already are — at scale, with automation.",
    },
    problem:
      "Customers expect instant replies on the apps they already use every day, but email gets ignored and phone lines get busy. Businesses that rely only on traditional channels lose leads to slower response times and missed messages.",
    steps: [
      {
        title: "Get verified",
        copy: "We help you apply for and set up your official WhatsApp Business API account with the green tick.",
      },
      {
        title: "Connect your tools",
        // The guide names a "Botsync dashboard" here; it is the platform's own dashboard.
        copy: "Link the API to your CRM or e-commerce store, or use our dashboard directly.",
      },
      { title: "Automate & send", copy: "Set up automated replies, broadcast campaigns and order updates." },
      { title: "Track & improve", copy: "Monitor delivery, open rates and conversations from one dashboard." },
    ],
    features: [
      { title: "Official green-tick verification", copy: "Build instant trust with a verified business profile." },
      {
        title: "Template & session messaging",
        copy: "Send approved marketing templates and handle live conversations.",
      },
      { title: "Product catalog & payments", copy: "Showcase products and accept payments directly in chat." },
      { title: "Multi-agent access", copy: "Let your whole team manage conversations from shared numbers." },
      {
        title: "API & no-code options",
        copy: "Developers integrate via API; non-technical teams use the dashboard.",
      },
    ],
    shots: [
      { title: "Shared inbox view with a verified business profile" },
      { title: "Broadcast / template message builder" },
      { title: "Product catalog shown inside a WhatsApp chat" },
    ],
    benefits: [
      { text: "Open rates on WhatsApp are consistently far higher than email.", illustrative: true },
      { text: "Sub-second delivery for template messages." },
      { text: "Works for both marketing broadcasts and real-time customer service." },
    ],
    useCase:
      "A retail brand connects its store to WhatsApp Business API. Every order confirmation, shipping update and delivery notice is sent automatically — cutting “where’s my order” tickets while keeping customers informed in real time.",
    builtFor: ["retail-e-commerce", "healthcare", "bfsi", "hospitality-travel"],
    worksWith: ["Shopify", "WooCommerce", "Salesforce", "Zoho", "HubSpot", "Google Sheets"],
    faqs: [
      {
        q: "Do I need a Facebook Business Manager account?",
        a: "Yes — we’ll guide you through linking WhatsApp Business API to your Meta Business Manager as part of onboarding.",
      },
      {
        q: "Can I keep my existing WhatsApp number?",
        a: "In most cases yes, provided it isn’t already registered on the standard WhatsApp Business app.",
      },
      {
        q: "How long does verification take?",
        a: "Timelines vary by Meta’s review queue — we’ll confirm a current estimate during onboarding.",
      },
      {
        q: "Is there a message-sending limit?",
        a: "Meta sets tiered limits that increase automatically as your quality rating and usage grow.",
      },
    ],
    closing: {
      headline: "Ready to make WhatsApp your highest-converting channel?",
      accent: "highest-converting",
      cta: "Book a free walkthrough",
    },
    demo: {
      channel: "whatsapp",
      contact: "Northwind Store",
      messages: [
        { from: "customer", text: "Hi! Has my order #4821 shipped?" },
        { from: "business", text: "Yes — it left our warehouse this morning." },
        {
          from: "business",
          card: { title: "Order #4821 · Shipped", body: "Arriving tomorrow by 7 pm", actions: ["Track order", "Change address"] },
        },
        { from: "customer", text: "Perfect, thank you!" },
      ],
    },
  },
  {
    kind: "product",
    slug: "rcs",
    group: "messaging",
    name: "RCS",
    tagline: "Rich, branded business texting",
    priority: "P2",
    seo: {
      title: "RCS | Supreme One Software",
      description:
        "Business texting, reimagined — rich and branded, no app required. Book a demo with Supreme One Software.",
    },
    hero: {
      headline: "Business texting, reimagined",
      accent: "reimagined",
      // The guide's sub repeated the headline; this keeps its substance.
      sub: "Rich and branded, no app required — cards, carousels and one-tap replies in your customer’s own messaging app.",
    },
    problem:
      "Plain SMS feels outdated and easy to ignore, while asking customers to install a new app creates friction. Businesses need a channel that feels modern but works on every phone, out of the box.",
    steps: [
      { title: "Verify your brand", copy: "We register your business identity, logo and colors with carriers." },
      { title: "Design rich messages", copy: "Build cards, carousels and quick-reply buttons instead of plain text." },
      { title: "Send at scale", copy: "Deploy alerts, promotions and updates directly to the native messaging app." },
      {
        title: "Fall back safely",
        copy: "Undelivered RCS messages automatically fall back to SMS, so nothing is lost.",
      },
    ],
    features: [
      {
        title: "Branded sender profile",
        copy: "Your logo, name and verification badge appear in the customer’s inbox.",
      },
      { title: "Rich cards & carousels", copy: "Show products, offers or steps visually instead of plain text." },
      { title: "Suggested replies & actions", copy: "Let customers respond or act with one tap." },
      { title: "Read receipts & typing indicators", copy: "See when a message has been seen." },
      { title: "Automatic SMS fallback", copy: "Ensures delivery even on devices without RCS support." },
    ],
    shots: [
      { title: "Rich card with action buttons on a phone" },
      { title: "Product carousel message" },
      { title: "SMS fallback preview, side by side" },
    ],
    benefits: [
      { text: "Higher engagement than plain SMS.", illustrative: true },
      { text: "No app-install friction for the customer." },
      { text: "Works over the native messaging app on most modern devices, with coverage growing." },
    ],
    useCase:
      "A bank sends a fraud alert as an interactive RCS card with “Yes, it was me” and “Block my card” buttons — customers respond instantly, without calling support.",
    builtFor: ["bfsi", "retail-e-commerce", "logistics-distribution", "automotive"],
    worksWith: ["CRM systems", "SMS gateways", "Existing messaging infrastructure"],
    faqs: [
      {
        q: "Does RCS work on iPhone?",
        a: "Device support is expanding — we’ll confirm current coverage during onboarding.",
      },
      {
        q: "What happens if a customer’s device doesn’t support RCS?",
        a: "The message automatically falls back to standard SMS, so delivery isn’t affected.",
      },
      {
        q: "Do I need separate content for RCS vs SMS?",
        a: "We help you design one rich message that gracefully degrades to a plain-text fallback.",
      },
      {
        q: "Is RCS suitable for OTPs and alerts?",
        a: "Yes — its higher trust and rich formatting make it ideal for time-sensitive, branded alerts.",
      },
    ],
    closing: { headline: "Give your texts a professional upgrade.", accent: "upgrade", cta: "Talk to us about RCS" },
    demo: {
      channel: "rcs",
      contact: "Meridian Bank",
      messages: [
        { from: "event", text: "Verified sender · RCS" },
        {
          from: "business",
          card: {
            title: "Was this you?",
            body: "₹12,400 at Electronics Hub, today 10:42 am",
            actions: ["Yes, it was me", "Block my card"],
          },
        },
        { from: "customer", text: "Block my card" },
        { from: "business", text: "Done — your card is blocked and a replacement is on its way." },
      ],
    },
  },
  {
    kind: "product",
    slug: "ivr-solutions",
    group: "messaging",
    name: "IVR Solutions",
    tagline: "Voice menus that route every call",
    priority: "P2",
    seo: {
      title: "IVR Solutions | Supreme One Software",
      description:
        "Answer every call instantly — a voice menu that routes callers and never puts them on hold. Book a demo with Supreme One Software.",
    },
    hero: {
      headline: "Answer every call. Miss no customer.",
      accent: "every call.",
      sub: "A voice menu that answers instantly, routes callers to the right team and never puts them on hold.",
    },
    problem:
      "Phone lines still carry your most urgent customer conversations, but missed calls, long hold times and manual call routing cost you leads and frustrate callers — especially outside office hours.",
    steps: [
      {
        title: "Choose your number",
        copy: "Get a cloud virtual number (toll-free or local) set up in minutes.",
      },
      {
        title: "Design your call flow",
        copy: "Build the voice menu visually: greetings, “press 1 for sales”, language options.",
      },
      {
        title: "Route intelligently",
        copy: "Send callers to the right agent or team by menu choice, time of day or availability, with voicemail as a fallback.",
      },
      {
        title: "Track every call",
        copy: "See call volume, missed calls, durations and recordings in one dashboard.",
      },
    ],
    features: [
      { title: "Visual call-flow builder", copy: "Design multi-level voice menus without any coding." },
      { title: "Smart call routing", copy: "Route by department, language, business hours or round robin." },
      {
        title: "Multi-language greetings",
        copy: "Recorded or text-to-speech prompts in your customers’ languages.",
      },
      {
        title: "Call recording & analytics",
        copy: "Review calls and track volume, answer rates and missed calls.",
      },
      {
        title: "Missed-call follow-up",
        copy: "Automatically send a WhatsApp or SMS message when a call is missed.",
      },
    ],
    shots: [
      { title: "Visual call-flow builder" },
      { title: "Call log and analytics dashboard" },
      { title: "Missed call followed by a WhatsApp message" },
    ],
    benefits: [
      { text: "Every call is answered or captured, 24/7 — no more silent missed calls." },
      { text: "Callers reach the right team faster, with fewer transfers." },
      { text: "Voice and WhatsApp work together on one platform — a missed call becomes a conversation." },
    ],
    useCase:
      "A clinic’s IVR greets callers in their own language, lets them press 1 to book an appointment or 2 for reports, and sends a WhatsApp confirmation right after the call — so the front desk only handles calls that truly need a person.",
    builtFor: ["healthcare", "bfsi", "real-estate", "logistics-distribution"],
    worksWith: ["CRM systems", "WhatsApp Business API", "Unified Team Inbox", "Telephony / SIP providers"],
    faqs: [
      {
        q: "Do I need any special hardware?",
        a: "No — it’s cloud-based and works with your existing phones, mobile apps or softphones.",
      },
      {
        q: "Can I keep my existing business number?",
        a: "In many cases yes, depending on your carrier and number type — we’ll confirm during onboarding.",
      },
      {
        q: "Can callers be routed by language or department?",
        a: "Yes — build menus that route by language, department, time of day or agent availability.",
      },
      {
        q: "Can a missed call trigger a WhatsApp message?",
        a: "Yes — missed or abandoned calls can automatically trigger a WhatsApp or SMS follow-up.",
      },
    ],
    closing: { headline: "Never miss a call again.", accent: "call", cta: "Talk to us about IVR Solutions" },
    demo: {
      channel: "voice",
      contact: "City Clinic",
      messages: [
        { from: "event", text: "Incoming call · 10:42" },
        { from: "business", text: "Welcome to City Clinic. Press 1 for appointments, 2 for reports, 3 for Hindi." },
        { from: "customer", text: "Pressed 1" },
        { from: "business", text: "Connecting you to the appointments desk…" },
        { from: "event", text: "WhatsApp follow-up sent" },
        {
          from: "business",
          card: { title: "Appointment confirmed", body: "Tuesday, 11:30 am · Dr. Iyer", actions: ["Reschedule"] },
        },
      ],
    },
  },
  {
    kind: "product",
    slug: "facebook-automation",
    group: "messaging",
    name: "Facebook Automation",
    tagline: "Messenger and comment replies",
    priority: "P2",
    seo: {
      title: "Facebook Automation | Supreme One Software",
      description:
        "Automate Messenger and comment conversations, around the clock. Book a demo with Supreme One Software.",
    },
    hero: {
      headline: "Never miss a message on Facebook again",
      accent: "Facebook",
      sub: "Automate Messenger and comment conversations, around the clock.",
    },
    problem:
      "A lot of local businesses get their first customer inquiry through a Facebook comment or Messenger DM — a slow reply often means a lost customer to a faster competitor.",
    steps: [
      { title: "Connect your page", copy: "Link your Facebook Business Page in a few clicks." },
      { title: "Set up auto-replies", copy: "Define instant responses for common Messenger questions." },
      {
        title: "Automate comment-to-DM",
        copy: "Turn post and ad comments into private conversations automatically.",
      },
      { title: "Route to your team", copy: "Hand off complex queries to a human agent seamlessly." },
    ],
    features: [
      { title: "Messenger auto-responses", copy: "Instant answers to FAQs, hours, pricing and location." },
      { title: "Comment-to-DM automation", copy: "Convert public comments into private, sales-ready chats." },
      { title: "Lead Ads integration", copy: "Capture and respond to Facebook Lead Ad submissions instantly." },
      { title: "Business-hours logic", copy: "Show different automated messages in and out of hours." },
      { title: "Human handoff rules", copy: "Escalate to a live agent when a conversation needs a person." },
    ],
    shots: [
      { title: "Messenger auto-reply flow setup" },
      { title: "Comment-to-DM rule screen" },
      { title: "Handoff-to-agent conversation" },
    ],
    benefits: [
      { text: "Keeps response times low on a channel many customers use as their first touchpoint." },
      { text: "Captures leads generated by ad spend that would otherwise go unanswered." },
      { text: "Reduces repetitive manual replies for your team." },
    ],
    useCase:
      "A local clinic’s Messenger bot answers “do you accept insurance?” and books an appointment slot — before a staff member even sees the message.",
    builtFor: ["healthcare", "real-estate", "automotive", "restaurants-food-delivery"],
    worksWith: ["Facebook Business Manager", "Meta Lead Ads", "CRM systems"],
    faqs: [
      {
        q: "Can I still reply manually when I want to?",
        a: "Yes — automation handles routine questions while your team stays fully in control of any conversation.",
      },
      {
        q: "Does this work with Facebook ad campaigns?",
        a: "Yes, it connects directly with Lead Ads and comment-based ad campaigns.",
      },
      {
        q: "Will customers know they’re talking to a bot?",
        a: "You control the tone and can introduce the assistant clearly, then hand off to a human at any point.",
      },
      {
        q: "Can I use the same inbox for Facebook and WhatsApp?",
        a: "Yes — pair it with Unified Team Inbox to manage every channel in one place.",
      },
    ],
    closing: {
      headline: "Turn Facebook comments into customers.",
      accent: "customers.",
      cta: "Get started with Facebook Automation",
    },
    demo: {
      channel: "messenger",
      contact: "Lakeside Dental",
      messages: [
        { from: "customer", text: "Hi, do you accept insurance?" },
        {
          from: "business",
          text: "Yes, we work with most major insurers. Would you like to book a check-up?",
          replies: ["Book a slot", "Talk to the team"],
        },
        { from: "customer", text: "Book a slot" },
        {
          from: "business",
          card: { title: "Thursday · 4:30 pm", body: "Lakeside Dental, Main Road", actions: ["Confirm"] },
        },
      ],
    },
  },
  {
    kind: "product",
    slug: "instagram-automation",
    group: "messaging",
    name: "Instagram Automation",
    tagline: "Turn DMs and comments into leads",
    priority: "P1",
    seo: {
      title: "Instagram Automation | Supreme One Software",
      description: "Turn every DM and comment into a lead. Book a demo with Supreme One Software.",
    },
    hero: {
      headline: "Turn every DM and comment into a lead",
      accent: "a lead",
      // The guide's sub repeated the headline; this is drawn from its feature list.
      sub: "Reply to DMs, comments and Story replies in seconds, then send interested followers straight to your team inbox or CRM.",
    },
    problem:
      "Instagram drives huge interest through comments, story replies and DMs — but manually replying to all of it around the clock isn’t realistic, and slow replies cost sales.",
    steps: [
      { title: "Connect your account", copy: "Connect your Instagram Business account securely in minutes." },
      {
        title: "Set up keyword triggers",
        copy: "Choose words like “price” or “info” that trigger an automatic DM.",
      },
      {
        title: "Automate story & comment replies",
        copy: "Respond to comments and story mentions instantly.",
      },
      { title: "Capture leads", copy: "Route interested followers straight into your team inbox or CRM." },
    ],
    features: [
      { title: "Auto-reply to DMs & comments", copy: "Instant responses to common questions." },
      { title: "Story-reply automation", copy: "Engage followers who reply to your Stories." },
      { title: "Comment-to-DM triggers", copy: "Turn a public comment into a private DM with details." },
      { title: "Lead capture", copy: "Send qualified conversations straight into your inbox or CRM." },
      { title: "Multi-language support", copy: "Reply in your customer’s language automatically." },
    ],
    shots: [
      { title: "Keyword trigger setup screen" },
      { title: "Comment turning into a DM" },
      { title: "Lead list inside the team inbox" },
    ],
    benefits: [
      {
        text: "Captures leads generated by ad spend and organic content that would otherwise go unanswered.",
      },
      { text: "Keeps engagement high without adding headcount." },
      { text: "Works across DMs, comments and Story replies from one setup." },
    ],
    useCase:
      "A fashion brand auto-replies to “price?” comments on a reel with a DM containing the catalog link and a discount code — turning a comment into a sale.",
    builtFor: ["retail-e-commerce", "salons-wellness", "hospitality-travel", "education"],
    worksWith: ["Instagram Business / Creator accounts", "Meta Ads", "E-commerce platforms"],
    faqs: [
      {
        q: "Do I need a certain number of followers to use this?",
        a: "No — any Instagram Business or Creator account can connect.",
      },
      {
        q: "Can it work alongside my existing content strategy?",
        a: "Yes — it automates responses, not your content; you keep full creative control.",
      },
      {
        q: "Will it reply to negative comments the same way?",
        a: "You can route sensitive or negative comments to a human instead of an automated reply.",
      },
      {
        q: "Can I automate replies for multiple accounts?",
        a: "Yes — manage several Instagram accounts from one dashboard.",
      },
    ],
    closing: { headline: "Stop losing leads in your DMs.", accent: "DMs.", cta: "Automate Instagram today" },
    demo: {
      channel: "instagram",
      contact: "linen.and.loom",
      messages: [
        { from: "event", text: "@riya.k commented “price?” on your reel" },
        {
          from: "business",
          text: "Hi Riya! The linen co-ord set is ₹2,499. Here’s the full catalog — use REEL10 for 10% off.",
          replies: ["Shop the look"],
        },
        { from: "customer", text: "Ordering now 😍" },
      ],
    },
  },

  // ── Automation & growth ────────────────────────────────────────────
  {
    kind: "product",
    slug: "no-code-chatbot",
    group: "automation",
    name: "No-Code Chatbot",
    tagline: "24/7 bots, built visually",
    priority: "P1",
    seo: {
      title: "No-Code Chatbot | Supreme One Software",
      description: "Build a 24/7 chatbot without writing a line of code. Book a demo with Supreme One Software.",
    },
    hero: {
      headline: "Build a 24/7 chatbot without writing a line of code",
      accent: "24/7 chatbot",
      sub: "Drag-and-drop flows that answer your most common questions on WhatsApp, Instagram, Facebook and web chat — and hand off to your team when a person is needed.",
    },
    problem:
      "Customers ask the same questions again and again — hours, pricing, order status — and answering each one manually drains your team’s time, especially outside business hours.",
    steps: [
      {
        title: "Choose a template or start blank",
        copy: "Pick a starting flow for your industry, or build from scratch.",
      },
      { title: "Build visually", copy: "Drag and drop conversation steps, no code required." },
      { title: "Set triggers", copy: "Define keywords or intents that start each flow." },
      { title: "Set handoff rules", copy: "Decide exactly when a conversation should go to a human agent." },
    ],
    features: [
      { title: "Drag-and-drop flow builder", copy: "Build and edit conversation flows visually." },
      {
        title: "Keyword & AI intent triggers",
        copy: "Match exact phrases or let AI understand varied wording.",
      },
      { title: "Multi-language support", copy: "Serve customers in their preferred language automatically." },
      { title: "Human handoff rules", copy: "Set clear conditions for escalating to a live agent." },
      {
        title: "Works across channels",
        copy: "Deploy the same bot on WhatsApp, Instagram, Facebook and web chat.",
      },
    ],
    shots: [
      { title: "Drag-and-drop flow builder" },
      { title: "The bot answering on WhatsApp" },
      { title: "Human handoff rules screen" },
    ],
    benefits: [
      { text: "Cuts first-response time from hours to seconds for common questions." },
      { text: "Frees your team to focus on conversations that actually need a human." },
      { text: "One bot, deployable across every connected channel." },
    ],
    useCase:
      "An e-commerce store’s bot answers “where is my order” and “what’s your return policy” instantly, 24/7 — while flagging genuinely upset customers straight to a human agent.",
    builtFor: ["retail-e-commerce", "education", "real-estate", "automotive"],
    worksWith: ["WhatsApp", "Instagram", "Facebook", "Website chat widget", "CRM systems"],
    faqs: [
      {
        q: "Do I need any technical skills to build a bot?",
        a: "No — the builder is fully visual and designed for non-technical users.",
      },
      {
        q: "Can the bot understand different ways of asking the same question?",
        a: "Yes, with AI-intent matching in addition to exact keyword triggers.",
      },
      {
        q: "What happens if the bot can’t answer something?",
        a: "You set the rules — escalate to a human immediately or after a set number of failed attempts.",
      },
      {
        q: "Can I use the same bot across WhatsApp and Instagram?",
        a: "Yes — build once, deploy across every connected channel.",
      },
    ],
    // The guide's CTA read "Get started free"; a free tier isn't confirmed yet.
    closing: { headline: "Build your first bot in an afternoon.", accent: "an afternoon.", cta: "Get started" },
    demo: {
      channel: "whatsapp",
      contact: "Northwind Store",
      messages: [
        { from: "customer", text: "Where is my order?" },
        { from: "business", text: "Happy to check! What’s your order number?" },
        { from: "customer", text: "#5530" },
        {
          from: "business",
          card: { title: "Order #5530 · Out for delivery", body: "Expected today by 6 pm", actions: ["Track", "Talk to a person"] },
        },
      ],
    },
  },
  {
    kind: "product",
    slug: "campaigns",
    group: "automation",
    name: "Campaigns",
    tagline: "Segmented broadcasts that get read",
    priority: "P1",
    seo: {
      title: "Campaigns | Supreme One Software",
      description: "Broadcasts that actually get opened. Book a demo with Supreme One Software.",
    },
    hero: {
      headline: "Broadcasts that actually get opened",
      accent: "opened",
      sub: "Segmented, personalised WhatsApp broadcasts with scheduling, template approval support, and delivery and click analytics for every send.",
    },
    problem:
      "Email open rates keep dropping and SMS feels impersonal — businesses need a broadcast channel that customers actually read and act on.",
    steps: [
      { title: "Build your audience", copy: "Segment contacts by tags, purchase history or behavior." },
      {
        title: "Design your message",
        copy: "Use approved templates with images, buttons and personalization.",
      },
      { title: "Schedule & send", copy: "Time your campaign for maximum engagement." },
      { title: "Track performance", copy: "See delivery, open and click rates in real time." },
    ],
    features: [
      { title: "Segmented broadcasts", copy: "Target the right audience, not your entire list." },
      { title: "Scheduling", copy: "Plan campaigns in advance around key dates or offers." },
      { title: "Template approval assistance", copy: "We help get your message templates approved." },
      { title: "Click & delivery analytics", copy: "See exactly how each campaign performs." },
      { title: "Personalization", copy: "Insert names, order details or offers automatically." },
    ],
    shots: [
      { title: "Audience segment and template builder" },
      { title: "Schedule screen" },
      { title: "Delivery and click analytics dashboard" },
    ],
    benefits: [
      {
        text: "Broadcasts on WhatsApp typically see far higher open and read rates than email or SMS.",
        illustrative: true,
      },
      { text: "Segment-level targeting reduces unsubscribes and improves relevance." },
      { text: "Full visibility into delivery and click performance per campaign." },
    ],
    useCase:
      "A gym chain sends a monthly offer broadcast segmented by membership type and location — resulting in noticeably higher redemption than their previous email campaigns.",
    builtFor: ["retail-e-commerce", "salons-wellness", "restaurants-food-delivery", "real-estate"],
    worksWith: ["CRM systems", "E-commerce platforms", "Spreadsheet / contact list import"],
    faqs: [
      {
        q: "Will my messages get blocked as spam?",
        a: "We help you follow opt-in and template guidelines to protect your sending reputation.",
      },
      { q: "Can I personalize each message?", a: "Yes — insert names, order numbers or custom fields automatically." },
      {
        q: "How do I build my contact list?",
        a: "Import from a CRM, e-commerce platform or spreadsheet, or collect opt-ins directly through chat and forms.",
      },
      {
        q: "Can I A/B test campaigns?",
        a: "Yes, test different messages or send times against segments of your audience.",
      },
    ],
    closing: { headline: "Send a campaign people actually read.", accent: "actually read.", cta: "Talk to us about Campaigns" },
    demo: {
      channel: "whatsapp",
      contact: "FitZone Gyms",
      messages: [
        { from: "event", text: "Campaign · Gold members · Pune" },
        {
          from: "business",
          card: {
            title: "Your October offer is here",
            body: "Hi Arjun — renew your Gold membership this week and get two months on us.",
            actions: ["Renew now", "Not now"],
          },
        },
        { from: "customer", text: "Renew now" },
        { from: "business", text: "Great choice! Here’s your secure payment link." },
      ],
    },
  },
  {
    kind: "product",
    slug: "unified-team-inbox",
    group: "automation",
    name: "Unified Team Inbox",
    tagline: "Every channel in one inbox",
    priority: "P1",
    seo: {
      title: "Unified Team Inbox | Supreme One Software",
      description: "Every channel, one inbox — no more dropped chats. Book a demo with Supreme One Software.",
    },
    hero: {
      headline: "Every channel. One inbox. No more dropped chats.",
      accent: "One inbox.",
      sub: "WhatsApp, Instagram, Facebook and web chat in one shared inbox, with assignment, internal notes and SLA timers for the whole team.",
    },
    problem:
      "When customer conversations are spread across separate apps, messages get missed, replies get duplicated, and there’s no shared visibility across the team.",
    steps: [
      { title: "Connect your channels", copy: "Link WhatsApp, Instagram, Facebook and web chat." },
      { title: "Assign conversations", copy: "Route chats to the right agent or team automatically." },
      { title: "Collaborate internally", copy: "Add notes and tags visible only to your team." },
      { title: "Monitor performance", copy: "Track response times and resolution rates per agent." },
    ],
    features: [
      { title: "Multi-channel view", copy: "WhatsApp, Instagram, Facebook and web chat in one screen." },
      { title: "Agent assignment", copy: "Route conversations automatically or manually." },
      { title: "Tags & internal notes", copy: "Organize conversations and leave context for teammates." },
      { title: "SLA timers", copy: "Get alerted before a conversation breaches your response-time target." },
      { title: "Performance reporting", copy: "See response times and resolution rates by agent or team." },
    ],
    shots: [
      { title: "Multi-channel inbox with WhatsApp, Instagram, Facebook and web chat" },
      { title: "Assignment, tags and internal notes panel" },
      { title: "SLA timers and agent performance report" },
    ],
    benefits: [
      { text: "Removes duplicate replies and dropped chats across channels." },
      { text: "Gives managers clear visibility into team response times." },
      { text: "One login instead of switching between multiple apps all day." },
    ],
    useCase:
      "A support team of 5 handles WhatsApp, Instagram and web chat leads from a single dashboard instead of switching between 3 separate apps all day.",
    builtFor: ["retail-e-commerce", "education", "hospitality-travel", "automotive"],
    worksWith: ["WhatsApp", "Instagram", "Facebook Messenger", "Website chat widget", "CRM systems"],
    faqs: [
      {
        q: "How many agents can use the inbox at once?",
        a: "As many as your plan allows — conversations can be assigned across your whole team.",
      },
      {
        q: "Can I set rules for how chats get assigned?",
        a: "Yes — route by channel, keyword, availability or round robin.",
      },
      {
        q: "Does it show conversation history across channels?",
        a: "Yes — you can see a customer’s full history regardless of which channel they used.",
      },
      {
        q: "Can I track individual agent performance?",
        a: "Yes, with built-in reporting on response times and resolutions per agent.",
      },
    ],
    closing: {
      headline: "Stop juggling apps.",
      accent: "juggling",
      sub: "Bring every conversation into one inbox.",
      cta: "Book a Demo",
    },
    demo: {
      channel: "inbox",
      rows: [
        { name: "Priya S.", channel: "WhatsApp", preview: "Can I change my delivery slot?", tag: "Assigned · Neha" },
        { name: "@arjun.travels", channel: "Instagram", preview: "Is the Goa package still available?", tag: "New" },
        { name: "Rahul M.", channel: "Messenger", preview: "Thanks, that solved it!", tag: "Resolved" },
        { name: "Website visitor", channel: "Web chat", preview: "Do you ship to Dubai?", tag: "SLA 4 min" },
      ],
    },
  },
  {
    kind: "product",
    slug: "ecommerce-solutions",
    group: "automation",
    name: "E-Commerce Solutions",
    tagline: "Catalog, carts and payments in chat",
    priority: "P1",
    seo: {
      title: "E-Commerce Solutions | Supreme One Software",
      description: "Turn chat into your storefront. Book a demo with Supreme One Software.",
    },
    hero: {
      headline: "Turn chat into your storefront",
      accent: "storefront",
      sub: "Catalog, cart and payment links inside WhatsApp and Instagram, with automatic order updates and abandoned-cart recovery.",
    },
    problem:
      "Customers browse and get interested, but the moment they have to leave the chat to complete a purchase elsewhere, a large share of them simply drop off.",
    steps: [
      {
        title: "Connect your store",
        copy: "Sync your product catalog from Shopify, WooCommerce or your own system.",
      },
      {
        title: "Showcase products in chat",
        copy: "Let customers browse and ask questions without leaving the conversation.",
      },
      { title: "Automate cart recovery", copy: "Send timely nudges when a cart is abandoned." },
      {
        title: "Accept payment in chat",
        copy: "Share a payment link or checkout directly within the conversation.",
      },
    ],
    features: [
      { title: "Product catalog in chat", copy: "Customers browse without leaving WhatsApp or Instagram." },
      { title: "Cart & order updates", copy: "Automatic confirmations and shipping-status messages." },
      { title: "Abandoned-cart recovery", copy: "Automated nudges sent at the right moment." },
      { title: "Payment links", copy: "Let customers pay directly through the conversation." },
      { title: "Order tracking", copy: "Customers check order status anytime, automatically." },
    ],
    shots: [
      { title: "Product catalog in chat" },
      { title: "Abandoned-cart message with payment link" },
      { title: "Order-status conversation" },
    ],
    benefits: [
      { text: "Recovers carts that would otherwise be lost." },
      { text: "Shortens the path from “interested” to “paid” by removing extra steps." },
      { text: "Keeps the entire purchase journey inside one conversation." },
    ],
    useCase:
      "A D2C brand automatically sends a WhatsApp nudge with a payment link an hour after a cart is abandoned — recovering a meaningful share of sales that would otherwise be lost.",
    builtFor: ["retail-e-commerce", "salons-wellness", "restaurants-food-delivery"],
    worksWith: ["Shopify", "WooCommerce", "Payment gateways", "Inventory systems"],
    faqs: [
      {
        q: "Which e-commerce platforms do you support?",
        a: "Shopify and WooCommerce are supported out of the box; others can be connected via API.",
      },
      {
        q: "Can customers pay without leaving WhatsApp?",
        a: "Yes — a secure payment link opens directly from the chat.",
      },
      {
        q: "How is an abandoned cart detected?",
        a: "We track cart activity from your store and trigger a follow-up after a set period you control.",
      },
      {
        q: "Can I customize the recovery message and timing?",
        a: "Yes, fully — including delay, message content and any discount offered.",
      },
    ],
    closing: { headline: "Recover lost sales automatically.", accent: "automatically.", cta: "Set up E-Commerce Solutions" },
    demo: {
      channel: "whatsapp",
      contact: "Bloom Botanics",
      messages: [
        { from: "event", text: "Cart reminder · 1 hour later" },
        { from: "business", text: "Hi Meera, your cart is waiting — the Rose & Oud candle is almost sold out." },
        { from: "business", catalog: [{ name: "Rose & Oud candle", price: "₹1,250" }], replies: ["Pay ₹1,250"] },
        { from: "customer", text: "Done, paid!" },
        { from: "business", text: "Thank you! Order #7712 is confirmed — we’ll message you when it ships." },
      ],
    },
  },
  {
    kind: "product",
    slug: "form-builder",
    group: "automation",
    name: "Form Builder",
    tagline: "Collect data inside the chat",
    priority: "P2",
    seo: {
      title: "Form Builder | Supreme One Software",
      description: "Collect information without losing the conversation. Book a demo with Supreme One Software.",
    },
    hero: {
      headline: "Collect information without losing the conversation",
      accent: "the conversation",
      sub: "Conversational forms that run inside the chat or on your website, with conditional logic, file uploads and responses that sync to your CRM.",
    },
    problem:
      "Sending a customer a link to a separate web form breaks the conversation and drops completion rates — but you still need structured information like contact details or intake data.",
    steps: [
      { title: "Design your form", copy: "Add questions, conditional logic and required fields." },
      { title: "Choose where it runs", copy: "Deploy inside chat, embedded on your site, or both." },
      { title: "Collect responses", copy: "Customers fill it out without leaving the conversation." },
      { title: "Sync to your systems", copy: "Responses flow automatically into your CRM or spreadsheet." },
    ],
    features: [
      {
        title: "Conversational forms in chat",
        copy: "Ask questions one at a time, in a natural back-and-forth.",
      },
      { title: "Embeddable web forms", copy: "Use the same builder for a standalone website form." },
      { title: "Conditional logic", copy: "Show or skip questions based on previous answers." },
      { title: "CRM sync", copy: "Responses land directly in your CRM or spreadsheet, no manual entry." },
      { title: "File & document upload", copy: "Let customers attach documents where needed." },
    ],
    shots: [
      { title: "Conversational form inside WhatsApp" },
      { title: "Form builder with conditional logic" },
      { title: "Responses table syncing to a CRM" },
    ],
    benefits: [
      { text: "Higher completion rates than link-outs to an external form." },
      { text: "Customers never leave the conversation they’re already in." },
      { text: "No manual re-entry of responses into your systems." },
    ],
    useCase:
      "A clinic collects patient intake details — name, symptoms, preferred appointment time — via a WhatsApp form before the first appointment, saving front-desk time.",
    builtFor: ["healthcare", "bfsi", "education", "real-estate"],
    worksWith: ["CRM systems", "Google Sheets", "WhatsApp", "Website embed"],
    faqs: [
      {
        q: "Can forms include file uploads?",
        a: "Yes — customers can attach documents or images where your form requires it.",
      },
      { q: "Do responses sync automatically?", a: "Yes, to your connected CRM or spreadsheet — no manual data entry." },
      { q: "Can I reuse the same form on my website and in chat?", a: "Yes, build once and deploy in both places." },
      {
        q: "Can I set required vs optional questions?",
        a: "Yes, along with conditional logic to skip irrelevant questions.",
      },
    ],
    closing: {
      headline: "Collect the information you need, without breaking the conversation.",
      accent: "without breaking",
      cta: "Book a Demo",
    },
    demo: {
      channel: "whatsapp",
      contact: "City Clinic",
      messages: [
        { from: "business", text: "Before your visit, a few quick questions. What’s your full name?" },
        { from: "customer", text: "Ananya Rao" },
        { from: "business", text: "Thanks, Ananya. What symptoms are you experiencing?" },
        { from: "customer", text: "Mild fever since Monday" },
        { from: "business", card: { title: "Preferred appointment time", actions: ["Morning", "Afternoon", "Evening"] } },
      ],
    },
  },
  {
    kind: "product",
    slug: "ai-reviews-qr",
    group: "automation",
    name: "AI Reviews Link / QR",
    tagline: "Turn happy customers into reviews",
    priority: "P2",
    seo: {
      title: "AI Reviews Link / QR | Supreme One Software",
      description: "Turn happy customers into public reviews, automatically. Book a demo with Supreme One Software.",
    },
    hero: {
      headline: "Turn happy customers into public reviews automatically",
      accent: "public reviews",
      sub: "A one-tap review link or table QR code, sent at the right moment, with AI-drafted prompts that make writing a review easy.",
    },
    problem:
      "Most happy customers never leave a review simply because nobody asked at the right moment — and manually chasing every customer for feedback isn’t realistic.",
    steps: [
      { title: "Generate your link or QR code", copy: "Get a unique review link or printable QR code." },
      {
        title: "Set the trigger",
        copy: "Choose when it’s sent: after checkout, after a visit, or on a schedule.",
      },
      {
        title: "Guide the customer",
        copy: "An AI-drafted prompt makes it easy to describe their experience.",
      },
      {
        title: "Publish & monitor",
        copy: "Reviews post to your chosen platform; you track ratings from one dashboard.",
      },
    ],
    features: [
      { title: "One-tap review link", copy: "No app download, no login, one tap to leave a review." },
      { title: "In-store / table QR code", copy: "Printable QR codes for physical locations." },
      { title: "Auto-request after purchase or visit", copy: "Ask automatically, at the ideal moment." },
      { title: "AI-drafted prompts", copy: "Helps customers put their experience into words easily." },
      { title: "Ratings dashboard", copy: "Monitor review volume and average rating in one place." },
    ],
    shots: [
      { title: "Table-top QR card design" },
      { title: "One-tap review flow on a phone" },
      { title: "Ratings and review dashboard" },
    ],
    benefits: [
      { text: "Increases review volume by asking at the right moment, automatically." },
      { text: "Removes the need to remember or manually chase customers for reviews." },
      { text: "Keeps negative feedback private while public reviews stay positive." },
    ],
    useCase:
      "A restaurant places a table QR code that opens a pre-filled review flow right after the bill is paid — turning a good meal into a public 5-star review.",
    builtFor: ["restaurants-food-delivery", "hospitality-travel", "salons-wellness", "retail-e-commerce"],
    worksWith: ["Google Business Profile", "Facebook Reviews", "POS systems"],
    faqs: [
      {
        q: "Which review platforms does this support?",
        a: "Google Business Profile is most common; other platforms can be configured as needed.",
      },
      {
        q: "Can I control when the review request is sent?",
        a: "Yes — trigger it after checkout, after a visit, on a schedule, or manually.",
      },
      {
        q: "What if a customer wants to leave a complaint instead of a public review?",
        a: "You can route lower ratings to a private feedback form instead of the public review page.",
      },
      {
        q: "Do I need a printer for the QR code?",
        a: "No — you can also send the link digitally via WhatsApp, SMS or email; printing is optional.",
      },
    ],
    closing: { headline: "Make every good experience count.", accent: "count.", cta: "Set up AI Reviews today" },
    demo: {
      channel: "whatsapp",
      contact: "The Curry House",
      messages: [
        {
          from: "business",
          text: "Thanks for dining with us tonight! How was your meal?",
          replies: ["★★★★★", "★★★★", "★★★ or less"],
        },
        { from: "customer", text: "★★★★★" },
        { from: "business", text: "Wonderful! Here’s a review drafted from your rating — edit it and post in one tap." },
        {
          from: "business",
          card: {
            title: "“Lovely dinner, quick service, and the butter chicken was excellent.”",
            actions: ["Post on Google"],
          },
        },
      ],
    },
  },

  // ── Business software ──────────────────────────────────────────────
  // Not in the content guide: added at the founder's request. Benefits carry
  // no figures until there are measured ones to quote.
  {
    kind: "product",
    slug: "erp",
    group: "business",
    name: "ERP",
    tagline: "Inventory, billing and operations in one system",
    priority: "P2",
    seo: {
      title: "ERP | Supreme One Software",
      description:
        "Run inventory, purchasing, billing and accounts from one system, with updates sent over WhatsApp. Book a demo with Supreme One Software.",
    },
    hero: {
      headline: "Run your whole operation from one system",
      accent: "one system",
      sub: "Inventory, purchasing, sales, billing and accounts in a single ERP — with order and payment updates sent to customers over WhatsApp and SMS.",
    },
    problem:
      "Stock lives in one spreadsheet, invoices in another tool and orders in someone’s inbox. Every handover is manual, numbers never quite match, and nobody can see the whole business at once.",
    steps: [
      { title: "Map your processes", copy: "We walk through how you buy, stock, sell and bill today." },
      { title: "Configure the modules", copy: "Switch on the modules you need and set them up around your workflow." },
      { title: "Move your data", copy: "Bring in products, customers, suppliers and opening balances." },
      { title: "Go live & train", copy: "Your team is trained on the system, with support after launch." },
    ],
    features: [
      { title: "Inventory & warehouses", copy: "Live stock levels across locations, with low-stock alerts." },
      { title: "Purchasing", copy: "Purchase orders, supplier records and goods received in one flow." },
      { title: "Sales & invoicing", copy: "Quotes, orders and GST-ready invoices from the same records." },
      { title: "Accounts & payments", copy: "Track receivables, payables and payments against every invoice." },
      { title: "Reports & dashboards", copy: "Sales, stock and cash flow at a glance, for every branch." },
      { title: "Customer updates on WhatsApp", copy: "Order, dispatch and payment messages sent automatically." },
    ],
    shots: [
      { title: "Operations dashboard with sales, stock and cash flow" },
      { title: "Inventory list across two warehouses" },
      { title: "Invoice with a WhatsApp payment reminder" },
    ],
    benefits: [
      { text: "One source of truth for stock, sales and accounts." },
      { text: "Less re-keying between spreadsheets, billing and messaging tools." },
      { text: "Customers hear about orders and payments without anyone sending a message by hand." },
    ],
    useCase:
      "A distributor runs purchasing, three warehouses and billing from one ERP. When an order is dispatched the customer gets a WhatsApp update with the invoice, and overdue payments trigger a polite reminder automatically.",
    builtFor: ["logistics-distribution", "retail-e-commerce", "automotive", "restaurants-food-delivery"],
    worksWith: ["WhatsApp Business API", "Payment gateways", "Tally / accounting exports", "Spreadsheet import"],
    faqs: [
      {
        q: "Can the ERP be tailored to how we work?",
        a: "Yes — modules are configured around your processes, and custom changes can be built where you need them.",
      },
      {
        q: "Can we move our existing data across?",
        a: "Yes. We import products, customers, suppliers and opening balances from your current spreadsheets or software.",
      },
      {
        q: "Does it work across multiple branches or warehouses?",
        a: "Yes — stock, sales and reports can be tracked per location and for the business as a whole.",
      },
      {
        q: "Do we need to use your messaging products as well?",
        a: "No. The ERP works on its own; WhatsApp and SMS updates are there when you want them.",
      },
    ],
    closing: { headline: "Ready to see your whole business in one place?", accent: "one place?", cta: "Book an ERP demo" },
    demo: {
      channel: "inbox",
      title: "Orders",
      tabs: ["Today", "Pending", "Dispatched"],
      label: "Example ERP order list with order values and fulfilment status",
      rows: [
        { name: "SO-1042 · Mehta Traders", channel: "₹48,200", preview: "24 items · Warehouse A", tag: "Packing" },
        { name: "SO-1041 · Kaveri Stores", channel: "₹12,750", preview: "Invoice sent on WhatsApp", tag: "Dispatched" },
        { name: "PO-0388 · Sunrise Supplies", channel: "₹96,000", preview: "Goods received, 2 items short", tag: "Review" },
        { name: "SO-1040 · Anand Retail", channel: "₹7,900", preview: "Payment received", tag: "Closed" },
      ],
    },
  },
  {
    kind: "product",
    slug: "website-builder",
    group: "business",
    name: "Website Builder",
    tagline: "Launch a professional site without code",
    priority: "P2",
    seo: {
      title: "Website Builder | Supreme One Software",
      description:
        "Build a fast, mobile-ready business website without code, with chat, forms and bookings built in. Book a demo with Supreme One Software.",
    },
    hero: {
      headline: "Launch a professional website without writing code",
      accent: "without writing code",
      sub: "Pick a template, add your content and publish — with WhatsApp chat, enquiry forms and bookings already wired in.",
    },
    problem:
      "A custom website takes weeks and a developer for every small change, while generic builders leave you stitching together chat, forms and analytics yourself. Meanwhile, visitors leave without a way to reach you.",
    steps: [
      { title: "Choose a template", copy: "Start from a design made for your industry." },
      { title: "Add your content", copy: "Edit text, images, products and services in a visual editor." },
      { title: "Connect your channels", copy: "Turn on WhatsApp chat, enquiry forms and bookings." },
      { title: "Publish & grow", copy: "Go live on your own domain and track visits and enquiries." },
    ],
    features: [
      { title: "Drag-and-drop editor", copy: "Change any page yourself — no developer needed." },
      { title: "Mobile-ready templates", copy: "Every design looks right on phones, tablets and desktops." },
      { title: "Built-in chat & forms", copy: "Visitors message you on WhatsApp or send an enquiry in one tap." },
      { title: "Bookings & catalogue", copy: "Show products or services and take bookings online." },
      { title: "SEO basics included", copy: "Page titles, descriptions and sitemaps handled for you." },
      { title: "Your own domain & SSL", copy: "Publish on your domain with a secure connection." },
    ],
    shots: [
      { title: "Visual editor with a page being edited" },
      { title: "Template gallery filtered by industry" },
      { title: "Published site on a phone with the chat button open" },
    ],
    benefits: [
      { text: "Go live in days rather than waiting on a full custom build." },
      { text: "Make changes yourself, whenever you need to." },
      { text: "Every enquiry lands in the same inbox as your other channels." },
    ],
    useCase:
      "A salon launches its site from a beauty template in an afternoon. Clients browse services, book a slot online and get the confirmation on WhatsApp — and the owner updates prices whenever they change.",
    builtFor: ["salons-wellness", "restaurants-food-delivery", "real-estate", "education"],
    worksWith: ["WhatsApp Business API", "Unified Team Inbox", "Google Analytics", "Payment gateways"],
    faqs: [
      {
        q: "Do I need any technical skills?",
        a: "No. If you can edit a document, you can edit your site — and we’ll help with the initial setup.",
      },
      {
        q: "Can I use my own domain?",
        a: "Yes. Connect a domain you already own, or we’ll help you register one.",
      },
      {
        q: "What if I outgrow the builder?",
        a: "Our website development team can build custom features or a fully custom site when you need it.",
      },
      {
        q: "Where do website enquiries go?",
        a: "Into your team inbox alongside WhatsApp, Instagram and Facebook conversations, or to your email.",
      },
    ],
    closing: { headline: "Your new website could be live this week.", accent: "live this week.", cta: "Start building" },
    demo: {
      channel: "web",
      contact: "Glow Studio",
      messages: [
        { from: "customer", text: "Hi, do you have a slot for a haircut on Saturday?" },
        { from: "business", text: "We do! Pick a time that suits you:", replies: ["11:00", "14:30", "17:00"] },
        { from: "customer", text: "14:30 please" },
        {
          from: "business",
          card: { title: "Booked · Sat 14:30", body: "Confirmation sent to your WhatsApp", actions: ["Add to calendar"] },
        },
      ],
    },
  },
  {
    kind: "product",
    slug: "crm",
    group: "business",
    name: "CRM",
    tagline: "Every lead and customer, tracked to the sale",
    priority: "P1",
    seo: {
      title: "CRM | Supreme One Software",
      description:
        "Track every lead from first message to closed sale, with WhatsApp, calls and follow-ups in one CRM. Book a demo with Supreme One Software.",
    },
    hero: {
      headline: "Never lose track of a lead again",
      accent: "a lead",
      sub: "A CRM built around conversations — every WhatsApp chat, call and enquiry becomes a contact, a deal and a follow-up your team can see.",
    },
    problem:
      "Leads arrive on WhatsApp, Instagram, calls and forms, then live in personal phones and spreadsheets. Follow-ups slip, nobody knows who spoke to whom, and good opportunities go cold.",
    steps: [
      { title: "Capture every lead", copy: "Enquiries from chat, calls, ads and forms become contacts automatically." },
      { title: "Build your pipeline", copy: "Set up stages that match how you sell, and move deals along them." },
      { title: "Follow up on time", copy: "Tasks, reminders and WhatsApp templates keep every lead moving." },
      { title: "Measure & improve", copy: "See conversion by source, stage and salesperson." },
    ],
    features: [
      { title: "Contact timeline", copy: "Every message, call, note and order for a customer in one view." },
      { title: "Visual sales pipeline", copy: "Drag deals between stages and see what’s stuck." },
      { title: "Lead assignment", copy: "Route new leads to the right person by source, area or round-robin." },
      { title: "Tasks & reminders", copy: "Never miss a follow-up, with reminders for every open deal." },
      { title: "WhatsApp from the CRM", copy: "Message a lead on WhatsApp without leaving their record." },
      { title: "Sales reports", copy: "Conversion, revenue and response time by team member." },
    ],
    shots: [
      { title: "Pipeline board with deals in each stage" },
      { title: "Contact timeline with WhatsApp messages and calls" },
      { title: "Sales report by source and team member" },
    ],
    benefits: [
      { text: "Every lead is captured, assigned and followed up — none left in a personal phone." },
      { text: "Managers see the whole pipeline without chasing updates." },
      { text: "Conversations and sales live in the same place." },
    ],
    useCase:
      "A real-estate agency routes every property enquiry from Facebook ads and WhatsApp into the CRM, assigns it to an agent by area, and reminds that agent to follow up — so no buyer waits a day for a reply.",
    builtFor: ["real-estate", "education", "bfsi", "automotive"],
    worksWith: ["WhatsApp Business API", "Facebook Lead Ads", "IVR Solutions", "Form Builder", "Google Sheets"],
    faqs: [
      {
        q: "Can we import our existing contacts?",
        a: "Yes — import from spreadsheets or another CRM, with fields mapped during onboarding.",
      },
      {
        q: "Does it work with our WhatsApp number?",
        a: "Yes. Connected through the WhatsApp Business API, your team chats with leads straight from the CRM.",
      },
      {
        q: "Can we customise the pipeline stages?",
        a: "Yes — set up stages, fields and lead sources to match how your team sells.",
      },
      {
        q: "Is there a mobile app for the sales team?",
        a: "The CRM works in the mobile browser, so your team can update deals on the move.",
      },
    ],
    closing: { headline: "Turn more conversations into customers.", accent: "customers.", cta: "Book a CRM demo" },
    demo: {
      channel: "inbox",
      title: "Pipeline",
      tabs: ["All deals", "Mine", "Due today"],
      label: "Example CRM pipeline with leads, their source and deal stage",
      rows: [
        { name: "Ananya R.", channel: "WhatsApp", preview: "2BHK site visit booked for Sunday", tag: "Site visit" },
        { name: "Vikram S.", channel: "Lead Ads", preview: "Follow-up call due today", tag: "Contacted" },
        { name: "Meera K.", channel: "Web form", preview: "Sent price sheet and brochure", tag: "Proposal" },
        { name: "Rohit P.", channel: "IVR", preview: "Booking amount received", tag: "Won" },
      ],
    },
  },
];
