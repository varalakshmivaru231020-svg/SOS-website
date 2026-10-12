// The ten industry pages — Section 5 of the website content guide, plus the
// home-page tiles from Section 3.5. The guide leaves "Use case" and "Benefits
// & Facts" as placeholders; the examples below are representative scenarios
// built from the product use cases in the guide and are labelled as examples
// on the page. Measured results are added once there are some.
import type { Industry } from "./types";

const seo = (name: string, solve: string) => ({
  title: `${name} | Supreme One Software`,
  description: `${solve} Book a demo with Supreme One Software.`,
});

export const INDUSTRIES: Industry[] = [
  {
    slug: "retail-e-commerce",
    name: "Retail & E-Commerce",
    label: "Retail & E-Commerce",
    tile: "Cart recovery, order updates, catalog in chat",
    onHome: true,
    priority: "P1",
    seo: seo(
      "Retail & E-Commerce",
      "Automated cart recovery, order updates and catalog-in-chat that turns browsers into buyers without extra staff.",
    ),
    hero: {
      sub: "Catalogs, carts, payments and order updates inside WhatsApp and Instagram — so browsers become buyers without adding staff.",
    },
    pains: ["Abandoned carts", "Slow replies to “where’s my order?”", "Missed leads from Instagram and Facebook"],
    solve:
      "Automated cart recovery, order updates and catalog-in-chat that turns browsers into buyers without extra staff.",
    uses: [
      { product: "ecommerce-solutions", how: "Catalog in chat, payment links and abandoned-cart nudges." },
      { product: "campaigns", how: "Segmented offers and announcements for customers who opted in." },
      { product: "whatsapp-business-api", how: "Order confirmations, shipping and delivery updates, sent automatically." },
      { product: "instagram-automation", how: "Comments and DMs on your posts turned into conversations that sell." },
    ],
    example:
      "A retail brand connects its store to WhatsApp. Order confirmations, shipping updates and delivery notices go out automatically, so “where’s my order?” tickets fall away — and an hour after a cart is abandoned, the customer gets a reminder with a payment link.",
    demo: {
      channel: "whatsapp",
      contact: "Northwind Store",
      messages: [
        { from: "customer", text: "Is the indigo kurta available in M?" },
        { from: "business", text: "Yes, size M is in stock! Shall I add it to your cart?", replies: ["Add to cart", "See similar"] },
        { from: "customer", text: "Add to cart" },
        { from: "business", card: { title: "Cart · 1 item · ₹1,899", body: "Free delivery by Friday", actions: ["Pay now"] } },
      ],
    },
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    label: "Healthcare",
    tile: "Appointments, reminders, intake forms",
    onHome: true,
    priority: "P1",
    seo: seo(
      "Healthcare",
      "Appointment booking and reminders via chat, automated FAQ answers and intake forms before the visit.",
    ),
    hero: {
      sub: "Appointments, reminders and intake forms on WhatsApp, chat and voice — patients get answers fast, and your front desk gets time back.",
    },
    pains: ["Missed appointment requests", "Repetitive FAQ calls", "No-shows"],
    solve: "Appointment booking and reminders via chat, automated FAQ answers, and intake forms before the visit.",
    uses: [
      { product: "no-code-chatbot", how: "Answers timings, fees and directions, and books appointments around the clock." },
      { product: "form-builder", how: "Collects patient intake details in WhatsApp before the first visit." },
      { product: "whatsapp-business-api", how: "Appointment confirmations and reminders on the app patients already use." },
      { product: "ivr-solutions", how: "Routes callers to appointments or reports, and follows up missed calls on WhatsApp." },
    ],
    example:
      "A clinic’s IVR greets callers in their own language, lets them press 1 to book an appointment or 2 for reports, and sends a WhatsApp confirmation right after the call — so the front desk only handles calls that truly need a person.",
    demo: {
      channel: "whatsapp",
      contact: "City Clinic",
      messages: [
        {
          from: "business",
          text: "Reminder: your appointment with Dr. Iyer is tomorrow at 11:00 am.",
          replies: ["Confirm", "Reschedule"],
        },
        { from: "customer", text: "Confirm" },
        { from: "business", text: "See you tomorrow! Please fill in this short form before your visit." },
        { from: "business", card: { title: "Pre-visit form · 2 minutes", actions: ["Start form"] } },
      ],
    },
  },
  {
    slug: "education",
    name: "Education",
    label: "Education",
    tile: "Enquiry follow-up and fee reminders",
    onHome: true,
    priority: "P2",
    seo: seo(
      "Education",
      "Instant course-query answers, automated fee and renewal reminders, and drip nurture for every enquiry.",
    ),
    hero: {
      sub: "Answer course questions the moment they arrive, follow up every enquiry, and send fee reminders without chasing anyone by hand.",
    },
    pains: ["Slow follow-up on new enquiries", "The same batch and course questions, again and again", "Fee reminders chased by hand"],
    solve: "Instant course-query answers, automated fee and renewal reminders, and drip nurture for every enquiry.",
    uses: [
      { product: "no-code-chatbot", how: "Answers course, batch and fee questions instantly, day or night." },
      { product: "campaigns", how: "Fee and renewal reminders, plus follow-ups that nurture new enquiries." },
      { product: "unified-team-inbox", how: "Counsellors share one inbox for WhatsApp, Instagram and web chat enquiries." },
    ],
    example:
      "An institute’s chatbot answers course and batch questions as soon as an enquiry comes in, hands warm leads to a counsellor in the shared inbox, and sends fee reminders automatically before each due date.",
    demo: {
      channel: "whatsapp",
      contact: "Brightpath Academy",
      messages: [
        { from: "customer", text: "What are the fees for the data science course?" },
        {
          from: "business",
          text: "The 6-month Data Science program is ₹45,000, payable in 3 instalments. The next batch starts on 4 Nov.",
          replies: ["Download brochure", "Talk to a counsellor"],
        },
        { from: "customer", text: "Talk to a counsellor" },
        { from: "business", text: "Connecting you with Sneha from admissions now." },
      ],
    },
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    label: "Real Estate",
    tile: "Instant property info, site-visit booking",
    onHome: true,
    priority: "P2",
    seo: seo(
      "Real Estate",
      "Instant property info via chatbot, automated site-visit scheduling and broadcasts for new listings.",
    ),
    hero: {
      sub: "Reply to every property enquiry instantly, book site visits without the back-and-forth, and tell interested buyers about new listings first.",
    },
    pains: ["Slow response to new leads", "Repetitive property-detail questions", "Site-visit scheduling"],
    solve: "Instant property info via chatbot, automated site-visit scheduling and broadcasts for new listings.",
    uses: [
      { product: "no-code-chatbot", how: "Shares property details, prices and floor plans the moment a lead asks." },
      { product: "campaigns", how: "Broadcasts new listings and launches to interested buyers." },
      { product: "whatsapp-business-api", how: "Site-visit confirmations and reminders on the channel buyers already use." },
      { product: "ivr-solutions", how: "Routes enquiry calls to the right project team and follows up missed calls." },
    ],
    example:
      "A developer’s WhatsApp bot answers questions about a new project — configurations, prices, floor plans — and books site visits for the sales team, while every missed enquiry call gets an automatic WhatsApp follow-up.",
    demo: {
      channel: "whatsapp",
      contact: "Greenfield Homes",
      messages: [
        { from: "customer", text: "Can you share details of the 2BHK in Whitefield?" },
        {
          from: "business",
          card: {
            title: "2BHK · Whitefield · 1,150 sq ft",
            body: "₹78 L · Ready to move in",
            actions: ["Book a site visit", "Floor plan"],
          },
        },
        { from: "customer", text: "Book a site visit" },
        { from: "business", text: "Saturday 11 am or Sunday 4 pm?", replies: ["Sat 11 am", "Sun 4 pm"] },
      ],
    },
  },
  {
    slug: "hospitality-travel",
    name: "Hospitality & Travel",
    label: "Hospitality & Travel",
    tile: "Bookings, concierge chat, reviews",
    onHome: true,
    priority: "P2",
    seo: seo(
      "Hospitality & Travel",
      "Automated booking confirmations and check-in info, a concierge chatbot and post-stay review requests.",
    ),
    hero: {
      sub: "Booking confirmations, check-in details and concierge answers on WhatsApp — and a review request at the moment guests are happiest.",
    },
    pains: ["Booking confirmations sent by hand", "Concierge-style questions at all hours", "Too few reviews after great stays"],
    solve: "Automated booking confirmations and check-in info, a concierge chatbot, and post-stay review requests.",
    uses: [
      { product: "whatsapp-business-api", how: "Booking confirmations, check-in details and directions, sent automatically." },
      { product: "ai-reviews-qr", how: "Review requests after check-out, at the moment guests are happiest." },
      { product: "no-code-chatbot", how: "A concierge that answers questions about amenities, timings and local tips." },
    ],
    example:
      "A boutique hotel sends booking confirmations and check-in details on WhatsApp, lets a concierge bot answer questions about breakfast timings and airport pickups, and asks for a review the morning after check-out.",
    demo: {
      channel: "whatsapp",
      contact: "Seabreeze Resort",
      messages: [
        {
          from: "business",
          card: {
            title: "Booking confirmed · Sea View Room",
            body: "Check-in Friday, 2 pm · 2 nights",
            actions: ["Directions", "Add airport pickup"],
          },
        },
        { from: "customer", text: "Can we check in early?" },
        { from: "business", text: "We’ve noted 11 am for you and will confirm on the morning of arrival." },
      ],
    },
  },
  {
    slug: "restaurants-food-delivery",
    name: "Restaurants & Food Delivery",
    label: "Restaurants & Food Delivery",
    tile: "Orders, bookings, review QR codes",
    onHome: true,
    priority: "P2",
    seo: seo(
      "Restaurants & Food Delivery",
      "Booking and order-status automation, and a table QR that turns diners into 5-star reviews.",
    ),
    hero: {
      sub: "Table bookings, order updates and menu questions handled in chat — and a table QR code that turns a good meal into a review.",
    },
    pains: ["Table bookings over the phone", "Repeat questions about timings and the menu", "Collecting reviews"],
    solve: "Booking and order-status automation, and a table QR that turns diners into 5-star reviews.",
    uses: [
      { product: "ai-reviews-qr", how: "Table QR codes and post-meal links that turn diners into reviews." },
      { product: "no-code-chatbot", how: "Takes table bookings and answers questions about timings and the menu." },
      { product: "campaigns", how: "Weekend specials and offers sent to regulars who opted in." },
    ],
    example:
      "A restaurant places a table QR code that opens a pre-filled review flow right after the bill is paid — turning a good meal into a public 5-star review.",
    demo: {
      channel: "whatsapp",
      contact: "The Curry House",
      messages: [
        { from: "customer", text: "Table for 4 tonight at 8?" },
        { from: "business", text: "You’re booked — table for 4 at 8:00 pm. See you soon!" },
        { from: "event", text: "After the meal" },
        { from: "business", text: "Thanks for dining with us! Mind leaving a quick review?", replies: ["Leave a review"] },
      ],
    },
  },
  {
    slug: "bfsi",
    name: "BFSI",
    label: "BFSI",
    tile: "Secure alerts and KYC follow-ups",
    onHome: true,
    priority: "P3",
    seo: seo(
      "BFSI — Banking, Finance & Insurance",
      "Verified sender identity, RCS and branded alerts, and secure document collection via chat forms.",
    ),
    hero: {
      sub: "Verified, branded alerts customers trust, KYC follow-ups that don’t stall, and documents collected securely inside the conversation.",
    },
    pains: ["Alerts that have to be secure and trusted", "KYC follow-ups", "High-trust messaging needs"],
    solve: "Verified sender identity, RCS and branded alerts, and secure document collection via chat forms.",
    uses: [
      { product: "rcs", how: "Branded, verified alerts with one-tap actions." },
      { product: "whatsapp-business-api", how: "Verified-business messaging for updates and service requests." },
      { product: "form-builder", how: "Collects KYC documents inside the conversation." },
      { product: "ivr-solutions", how: "Routes callers by language and need, around the clock." },
    ],
    example:
      "A bank sends a fraud alert as an interactive RCS card with “Yes, it was me” and “Block my card” buttons — customers respond instantly, without calling support.",
    demo: {
      channel: "rcs",
      contact: "Meridian Bank",
      messages: [
        { from: "event", text: "Verified sender · RCS" },
        {
          from: "business",
          card: {
            title: "KYC update pending",
            body: "Upload your PAN to keep your account active.",
            actions: ["Upload securely", "Call me"],
          },
        },
        { from: "customer", text: "Upload securely" },
        { from: "business", text: "Thank you — your document is received and under review." },
      ],
    },
  },
  {
    slug: "automotive",
    name: "Automotive",
    label: "Automotive",
    tile: "Test drives, service reminders, lead follow-up",
    onHome: false,
    priority: "P3",
    seo: seo(
      "Automotive — Dealers & Service",
      "Automated service reminders and lead qualification before a sales rep ever calls.",
    ),
    hero: {
      sub: "Qualify leads and book test drives in chat, and send service reminders automatically — before a sales rep ever picks up the phone.",
    },
    pains: ["Test-drive scheduling", "Service reminders", "Lead follow-up"],
    solve: "Automated service reminders and lead qualification before a sales rep ever calls.",
    uses: [
      { product: "no-code-chatbot", how: "Qualifies leads and books test drives before a rep calls." },
      { product: "campaigns", how: "Service reminders and offers sent on schedule." },
      { product: "unified-team-inbox", how: "Sales and service teams share every customer conversation." },
    ],
    example:
      "A dealership’s bot asks new leads about model, budget and timeline, books a test drive and passes a qualified lead to sales — while service reminders go out automatically as each car comes due.",
    demo: {
      channel: "whatsapp",
      contact: "Prime Motors",
      messages: [
        { from: "business", text: "Hi Karan, your car is due for its 10,000 km service.", replies: ["Book service", "Remind me later"] },
        { from: "customer", text: "Book service" },
        { from: "business", card: { title: "Service booked · Saturday 10 am", body: "Pickup from home included", actions: ["Reschedule"] } },
      ],
    },
  },
  {
    slug: "salons-wellness",
    name: "Salons & Wellness",
    label: "Salons & Wellness",
    tile: "Bookings, reminders, loyalty offers",
    onHome: false,
    priority: "P3",
    seo: seo("Salons & Wellness", "Booking, reminders and loyalty broadcasts that keep the chair full."),
    hero: {
      sub: "Bookings, reminders and loyalty offers on WhatsApp that cut no-shows and bring regulars back.",
    },
    pains: ["Appointment booking", "No-shows", "Bringing regulars back"],
    solve: "Booking, reminders and loyalty broadcasts that keep the chair full.",
    uses: [
      { product: "no-code-chatbot", how: "Books appointments and answers price and timing questions 24/7." },
      { product: "campaigns", how: "Reminders and loyalty offers that bring regulars back." },
      { product: "ai-reviews-qr", how: "A QR code at the counter that turns happy clients into reviews." },
    ],
    example:
      "A salon’s WhatsApp bot books appointments, sends a reminder the day before, and invites regulars back with a loyalty offer six weeks after their last visit.",
    demo: {
      channel: "whatsapp",
      contact: "Studio Luxe",
      messages: [
        { from: "business", text: "Hi Nisha, it’s been six weeks since your last visit. Book your next one?", replies: ["Book now"] },
        { from: "customer", text: "Book now" },
        { from: "business", card: { title: "Thursday · 5:30 pm with Priya", body: "Haircut & styling", actions: ["Confirm"] } },
      ],
    },
  },
  {
    slug: "logistics-distribution",
    name: "Logistics & Distribution",
    label: "Logistics",
    tile: "Shipment status, proof of delivery",
    onHome: true,
    priority: "P3",
    seo: seo(
      "Logistics & Distribution",
      "Automated shipment tracking replies and proof-of-delivery confirmations at scale.",
    ),
    hero: {
      sub: "Shipment updates and proof-of-delivery confirmations sent automatically, so “where is my shipment?” stops flooding your support team.",
    },
    pains: ["Delivery-status queries flooding support", "Proof-of-delivery confirmations"],
    solve: "Automated shipment tracking replies and proof-of-delivery confirmations at scale.",
    uses: [
      { product: "whatsapp-business-api", how: "Shipment updates and delivery confirmations, sent automatically." },
      { product: "unified-team-inbox", how: "One inbox for every customer query, with assignment and SLA timers." },
      { product: "no-code-chatbot", how: "Answers “where is my shipment?” around the clock." },
      { product: "ivr-solutions", how: "Routes calls by shipment or region and follows up missed calls." },
    ],
    example:
      "A logistics company gets a driver-facing delivery app connected to the same backend as its WhatsApp customer bot — a status update in one place reflects instantly in the other.",
    demo: {
      channel: "whatsapp",
      contact: "SwiftRoute Logistics",
      messages: [
        { from: "customer", text: "Where is shipment 5521 9087?" },
        {
          from: "business",
          card: {
            title: "In transit · Hyderabad hub",
            body: "Out for delivery tomorrow",
            actions: ["Track live", "Change delivery slot"],
          },
        },
        { from: "event", text: "Next day · Delivered" },
        { from: "business", text: "Delivered at 2:14 pm and received by R. Kumar. Proof of delivery is attached." },
      ],
    },
  },
];
