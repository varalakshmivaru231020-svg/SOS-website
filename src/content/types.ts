// Shapes for the page content that lives in code: the product, service and
// industry pages are one template each, filled from these records. Anything
// marketing still has to confirm (prices, testimonials, measured results) lives
// in the database instead, behind the admin panel.

export type Item = { title: string; copy: string };
export type Faq = { q: string; a: string };

export type ProductSlug =
  | "whatsapp-business-api"
  | "rcs"
  | "ivr-solutions"
  | "facebook-automation"
  | "instagram-automation"
  | "no-code-chatbot"
  | "campaigns"
  | "unified-team-inbox"
  | "ecommerce-solutions"
  | "form-builder"
  | "ai-reviews-qr"
  | "erp"
  | "website-builder"
  | "crm";

export type ServiceSlug = "mobile-app-development" | "website-development";

export type IndustrySlug =
  | "retail-e-commerce"
  | "healthcare"
  | "education"
  | "real-estate"
  | "hospitality-travel"
  | "restaurants-food-delivery"
  | "bfsi"
  | "automotive"
  | "salons-wellness"
  | "logistics-distribution";

// ── The phone / browser mockups ──────────────────────────────────────

export type ChatChannel = "whatsapp" | "instagram" | "messenger" | "rcs" | "voice" | "web";

export type ChatMessage = {
  /** "event" is a centred system line: "Missed call · 10:42". */
  from: "customer" | "business" | "event";
  text?: string;
  /** Quick replies / suggested actions shown under the bubble. */
  replies?: string[];
  /** A rich card — an RCS card, an order summary, a form step. */
  card?: { title: string; body?: string; actions?: string[] };
  /** A product carousel. */
  catalog?: { name: string; price: string }[];
};

export type ChatDemo = {
  channel: ChatChannel;
  /** Who the customer is talking to, shown in the header. */
  contact: string;
  messages: ChatMessage[];
};

export type InboxDemo = {
  channel: "inbox";
  /** Window title and filter tabs; default to the team inbox's. */
  title?: string;
  tabs?: string[];
  /** What the figure shows, for assistive tech. */
  label?: string;
  rows: { name: string; channel: string; preview: string; tag: string }[];
};

export type Demo = ChatDemo | InboxDemo;

// ── Product & service pages ──────────────────────────────────────────

export type Shot = {
  /** What the image shows — doubles as the brief for the designer. */
  title: string;
  /** Path under /public. The gallery stays hidden until every shot has one. */
  src?: string;
};

export type Benefit = {
  text: string;
  /**
   * The guide marks some benchmark claims as placeholders. They stay hidden
   * until someone replaces them with a measured figure and drops this flag.
   */
  illustrative?: boolean;
};

export type Testimonial = { quote: string; name: string; role: string; company: string };

type OfferingBase = {
  name: string;
  /** One line for menus and cards. */
  tagline: string;
  priority: "P1" | "P2" | "P3";
  seo: { title: string; description: string };
  hero: { headline: string; accent: string; sub: string };
  problem: string;
  steps: Item[];
  features: Item[];
  shots: Shot[];
  benefits: Benefit[];
  useCase: string;
  builtFor: IndustrySlug[];
  worksWith: string[];
  testimonial?: Testimonial;
  faqs: Faq[];
  closing: { headline: string; accent?: string; sub?: string; cta: string };
  demo: Demo;
};

export type Product = OfferingBase & {
  kind: "product";
  slug: ProductSlug;
  group: "messaging" | "automation" | "business";
};

export type Service = OfferingBase & {
  kind: "service";
  slug: ServiceSlug;
  group: "engineering";
};

export type Offering = Product | Service;

// ── Industry pages ───────────────────────────────────────────────────

export type Industry = {
  slug: IndustrySlug;
  /** Full name, used in the H1 ("Built for …"). */
  name: string;
  /** Shorter label for menus and tiles where the guide uses one. */
  label: string;
  /** One line for the home-page tile and the industries index. */
  tile: string;
  onHome: boolean;
  priority: "P1" | "P2" | "P3";
  seo: { title: string; description: string };
  hero: { sub: string };
  pains: string[];
  solve: string;
  uses: { product: ProductSlug; how: string }[];
  /** A representative scenario — labelled as an example on the page. */
  example: string;
  demo: ChatDemo;
};
