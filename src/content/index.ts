// Lookups and URL helpers over the page content. Server-side only in practice:
// client components receive the slices they need as props, so the full copy
// never ships in the browser bundle.
import { PRODUCTS } from "./products";
import { SERVICES } from "./services";
import { INDUSTRIES } from "./industries";
import type { Industry, IndustrySlug, Offering, Product, ProductSlug, Service, ServiceSlug } from "./types";

export { PRODUCTS, SERVICES, INDUSTRIES };
export type * from "./types";

export const OFFERINGS: Offering[] = [...PRODUCTS, ...SERVICES];

export const PRODUCT_GROUPS = [
  { key: "messaging", label: "Messaging & voice" },
  { key: "automation", label: "Automation & growth" },
] as const;

export function productsIn(group: Product["group"]): Product[] {
  return PRODUCTS.filter((p) => p.group === group);
}

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
export function getIndustry(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
export function getOffering(slug: string): Offering | undefined {
  return OFFERINGS.find((o) => o.slug === slug);
}

export function offeringHref(o: Pick<Offering, "kind" | "slug">): string {
  return o.kind === "product" ? `/products/${o.slug}` : `/services/${o.slug}`;
}
export function productHref(slug: ProductSlug): string {
  return `/products/${slug}`;
}
export function serviceHref(slug: ServiceSlug): string {
  return `/services/${slug}`;
}
export function industryHref(slug: IndustrySlug): string {
  return `/industries/${slug}`;
}

/** Book a Demo, optionally pre-selecting what the visitor came for. */
export function demoHref(interest?: string): string {
  return interest ? `/book-a-demo?interest=${interest}` : "/book-a-demo";
}
/** The enquiry form on the contact page. */
export function contactHref(interest?: string): string {
  return `/contact${interest ? `?interest=${interest}` : ""}#enquiry`;
}

// ── Enquiry form ─────────────────────────────────────────────────────

export type InterestGroup = { label: string; options: { value: string; label: string }[] };

const OTHER_INTERESTS = [
  { value: "platform", label: "The full platform" },
  { value: "partnership", label: "Partnership" },
  { value: "other", label: "Something else" },
];

export const INTEREST_GROUPS: InterestGroup[] = [
  ...PRODUCT_GROUPS.map((g) => ({
    label: g.label,
    options: productsIn(g.key).map((p) => ({ value: p.slug, label: p.name })),
  })),
  { label: "Custom engineering", options: SERVICES.map((s) => ({ value: s.slug, label: s.name })) },
  { label: "Other", options: OTHER_INTERESTS },
];

export const INTEREST_LABELS: Record<string, string> = Object.fromEntries(
  INTEREST_GROUPS.flatMap((g) => g.options.map((o) => [o.value, o.label])),
);

// ── Header menu ──────────────────────────────────────────────────────
// Plain serialisable data, built on the server and handed to the header.

export type MenuLink = { href: string; label: string; note?: string };
export type MenuEntry =
  | { kind: "link"; label: string; href: string }
  | {
      kind: "menu";
      label: string;
      /** Paths that mark this entry active. */
      match: string[];
      columns: { heading?: string; links: MenuLink[] }[];
      footer?: MenuLink;
      wide?: boolean;
    };

export function buildMenu(): MenuEntry[] {
  return [
    { kind: "link", label: "Home", href: "/" },
    {
      kind: "menu",
      label: "About Us",
      match: ["/about", "/careers", "/contact", "/partners", "/faq"],
      columns: [
        {
          links: [
            { href: "/about", label: "Our Story" },
            { href: "/careers", label: "Careers" },
            { href: "/contact", label: "Contact" },
            { href: "/partners", label: "Partner With Us" },
          ],
        },
      ],
    },
    {
      kind: "menu",
      label: "Products",
      match: ["/products"],
      wide: true,
      columns: PRODUCT_GROUPS.map((g) => ({
        heading: g.label,
        links: productsIn(g.key).map((p) => ({ href: offeringHref(p), label: p.name, note: p.tagline })),
      })),
      footer: { href: "/products", label: "Platform overview" },
    },
    {
      kind: "menu",
      label: "Industries",
      match: ["/industries"],
      columns: [
        { links: INDUSTRIES.slice(0, 5).map((i) => ({ href: industryHref(i.slug), label: i.label })) },
        { links: INDUSTRIES.slice(5).map((i) => ({ href: industryHref(i.slug), label: i.label })) },
      ],
      footer: { href: "/industries", label: "All industries" },
    },
    {
      kind: "menu",
      label: "Services",
      match: ["/services"],
      columns: [{ links: SERVICES.map((s) => ({ href: offeringHref(s), label: s.name, note: s.tagline })) }],
    },
    // Customers is linked from the footer only (Company column).
    { kind: "link", label: "Pricing", href: "/pricing" },
  ];
}
