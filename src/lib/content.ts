import "server-only";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import type { PricingSet, Prisma } from "@prisma/client";

// One tag per content family. Admin save actions call revalidateTag() with
// these — keep every tag here so an action can never miss a path.
export const TAGS = {
  services: "services",
  products: "products",
  work: "work",
  team: "team",
  offices: "offices",
  timeline: "timeline",
  stack: "stack",
  quality: "quality",
  faqs: "faqs",
  pricing: "pricing",
  blocks: "blocks",
  settings: "settings",
  seo: "seo",
} as const;

export const getServices = unstable_cache(
  () =>
    db.service.findMany({
      where: { published: true },
      orderBy: { position: "asc" },
      include: { features: { orderBy: { position: "asc" } } },
    }),
  ["services"],
  { tags: [TAGS.services] },
);

export const getProducts = unstable_cache(
  () => db.product.findMany({ where: { published: true }, orderBy: { position: "asc" } }),
  ["products"],
  { tags: [TAGS.products] },
);

export const getCaseStudies = unstable_cache(
  () => db.caseStudy.findMany({ where: { published: true }, orderBy: { position: "asc" } }),
  ["case-studies"],
  { tags: [TAGS.work] },
);

export const getTeam = unstable_cache(
  () => db.teamMember.findMany({ where: { published: true }, orderBy: { position: "asc" } }),
  ["team"],
  { tags: [TAGS.team] },
);

export const getOffices = unstable_cache(
  () => db.office.findMany({ where: { published: true }, orderBy: { position: "asc" } }),
  ["offices"],
  { tags: [TAGS.offices] },
);

export const getTimeline = unstable_cache(
  () => db.timelineEntry.findMany({ where: { published: true }, orderBy: { position: "asc" } }),
  ["timeline"],
  { tags: [TAGS.timeline] },
);

export const getStack = unstable_cache(
  () => db.techStackItem.findMany({ where: { published: true }, orderBy: { position: "asc" } }),
  ["stack"],
  { tags: [TAGS.stack] },
);

export const getQualityGates = unstable_cache(
  () => db.qualityGate.findMany({ where: { published: true }, orderBy: { position: "asc" } }),
  ["quality"],
  { tags: [TAGS.quality] },
);

export const getFaqGroups = unstable_cache(
  () =>
    db.faqGroup.findMany({
      orderBy: { position: "asc" },
      include: { items: { where: { published: true }, orderBy: { position: "asc" } } },
    }),
  ["faq-groups"],
  { tags: [TAGS.faqs] },
);

export async function getFaqGroup(key: string) {
  const groups = await getFaqGroups();
  return groups.find((g) => g.key === key) ?? null;
}

export const getPricingTiers = unstable_cache(
  () => db.pricingTier.findMany({ where: { published: true }, orderBy: [{ set: "asc" }, { position: "asc" }] }),
  ["pricing"],
  { tags: [TAGS.pricing] },
);

export async function getPricing(set: PricingSet) {
  const tiers = await getPricingTiers();
  return tiers.filter((t) => t.set === set);
}

export const getHeroStats = unstable_cache(
  () => db.heroStat.findMany({ orderBy: { position: "asc" } }),
  ["hero-stats"],
  { tags: [TAGS.blocks] },
);

export const getClientLogos = unstable_cache(
  () => db.clientLogo.findMany({ orderBy: { position: "asc" } }),
  ["client-logos"],
  { tags: [TAGS.blocks] },
);

export const getIndustries = unstable_cache(
  () => db.industry.findMany({ orderBy: { position: "asc" } }),
  ["industries"],
  { tags: [TAGS.blocks] },
);

export const getUseCases = unstable_cache(
  () => db.useCase.findMany({ orderBy: { position: "asc" } }),
  ["use-cases"],
  { tags: [TAGS.blocks] },
);

export const getComparisonRows = unstable_cache(
  () => db.comparisonRow.findMany({ orderBy: { position: "asc" } }),
  ["comparison-rows"],
  { tags: [TAGS.blocks] },
);

export const getTrustBadges = unstable_cache(
  () => db.trustBadge.findMany({ orderBy: { position: "asc" } }),
  ["trust-badges"],
  { tags: [TAGS.blocks] },
);

export const getTestimonial = unstable_cache(
  () => db.testimonial.findFirst({ where: { featured: true } }),
  ["testimonial"],
  { tags: [TAGS.blocks] },
);

export const getSettings = unstable_cache(
  async () => {
    const s = await db.siteSettings.findUnique({ where: { id: 1 } });
    // assetVersion busts the browser cache on /api/brand/* after an upload.
    // It is a number, not the Date: this cache serializes its value, so a Date
    // would come back as a string on every read but the first.
    if (s) return { ...s, assetVersion: s.updatedAt.getTime() };
    return (
      {
        id: 1,
        accentPreset: "terracotta",
        accentColor: "#b8502a",
        motionIntensity: 1,
        cursorEffects: true,
        orgName: "Supreme One Software Pvt Ltd",
        tagline: "",
        contactEmail: "hello@supremeonesoftware.com",
        socialLinks: [] as unknown as Prisma.JsonValue,
        footerNote: "",
        wordmark: "Supreme One Software",
        logoData: null,
        logoAlt: null,
        faviconData: null,
        phone: "+91 20 4890 2200",
        supportEmail: "support@supremeonesoftware.com",
        partnersEmail: "partners@supremeonesoftware.com",
        whatsappNumber: "",
        whatsappMessage: "",
        whatsappEnabled: false,
        callEnabled: false,
        floatingScope: "mobile",
        updatedAt: new Date(0),
        assetVersion: 0,
      }
    );
  },
  ["settings"],
  { tags: [TAGS.settings] },
);

export const getAllSeo = unstable_cache(
  () => db.pageSeo.findMany(),
  ["page-seo"],
  { tags: [TAGS.seo] },
);

export async function getSeo(path: string) {
  const all = await getAllSeo();
  return all.find((p) => p.path === path) ?? null;
}

/** Typed helpers for Json columns. */
export function asStringArray(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}
export type Metric = { value: string; label: string };
export function asMetrics(v: unknown): Metric[] {
  if (!Array.isArray(v)) return [];
  return v.filter(
    (x): x is Metric =>
      !!x && typeof x === "object" && typeof (x as Metric).value === "string" && typeof (x as Metric).label === "string",
  );
}
