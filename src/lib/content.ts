import "server-only";
import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import type { PricingSet, Prisma } from "@prisma/client";

// Part of every cache key below. Bump it when a release changes what the
// database holds (e.g. after re-seeding), so the new deployment can't be
// served entries cached by the previous one — the data cache outlives deploys.
const CACHE_VERSION = "2026-10-revamp";

// One tag per content family. Admin save actions call revalidateTag() with
// these — keep every tag here so an action can never miss a path.
export const TAGS = {
  work: "work",
  team: "team",
  offices: "offices",
  timeline: "timeline",
  faqs: "faqs",
  pricing: "pricing",
  blocks: "blocks",
  settings: "settings",
  seo: "seo",
} as const;

export const getCaseStudies = unstable_cache(
  () => db.caseStudy.findMany({ where: { published: true }, orderBy: { position: "asc" } }),
  ["case-studies", CACHE_VERSION],
  { tags: [TAGS.work] },
);

export const getTeam = unstable_cache(
  () => db.teamMember.findMany({ where: { published: true }, orderBy: { position: "asc" } }),
  ["team", CACHE_VERSION],
  { tags: [TAGS.team] },
);

export const getOffices = unstable_cache(
  () => db.office.findMany({ where: { published: true }, orderBy: { position: "asc" } }),
  ["offices", CACHE_VERSION],
  { tags: [TAGS.offices] },
);

export const getTimeline = unstable_cache(
  () => db.timelineEntry.findMany({ where: { published: true }, orderBy: { position: "asc" } }),
  ["timeline", CACHE_VERSION],
  { tags: [TAGS.timeline] },
);

export const getFaqGroups = unstable_cache(
  () =>
    db.faqGroup.findMany({
      orderBy: { position: "asc" },
      include: { items: { where: { published: true }, orderBy: { position: "asc" } } },
    }),
  ["faq-groups", CACHE_VERSION],
  { tags: [TAGS.faqs] },
);

export async function getFaqGroup(key: string) {
  const groups = await getFaqGroups();
  return groups.find((g) => g.key === key) ?? null;
}

export const getPricingTiers = unstable_cache(
  () => db.pricingTier.findMany({ where: { published: true }, orderBy: [{ set: "asc" }, { position: "asc" }] }),
  ["pricing", CACHE_VERSION],
  { tags: [TAGS.pricing] },
);

export async function getPricing(set: PricingSet) {
  const tiers = await getPricingTiers();
  return tiers.filter((t) => t.set === set);
}

export const getHeroStats = unstable_cache(
  () => db.heroStat.findMany({ orderBy: { position: "asc" } }),
  ["hero-stats", CACHE_VERSION],
  { tags: [TAGS.blocks] },
);

export const getClientLogos = unstable_cache(
  () => db.clientLogo.findMany({ orderBy: { position: "asc" } }),
  ["client-logos", CACHE_VERSION],
  { tags: [TAGS.blocks] },
);

export const getTestimonials = unstable_cache(
  () => db.testimonial.findMany({ orderBy: [{ featured: "desc" }, { id: "asc" }] }),
  ["testimonials", CACHE_VERSION],
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
        contactEmail: "sales@supremeonesoftware.com",
        socialLinks: [] as unknown as Prisma.JsonValue,
        footerNote: "",
        wordmark: "Supreme One Software",
        logoData: null,
        logoAlt: null,
        faviconData: null,
        phone: "+91 91641 61611",
        supportEmail: "support@supremeonesoftware.com",
        partnersEmail: "partners@supremeonesoftware.com",
        cin: "",
        gst: "",
        businessHours: "",
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
  ["settings", CACHE_VERSION],
  { tags: [TAGS.settings] },
);

export const getAllSeo = unstable_cache(
  () => db.pageSeo.findMany(),
  ["page-seo", CACHE_VERSION],
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
export type SocialLink = { label: string; url: string };
export function asSocialLinks(v: unknown): SocialLink[] {
  if (!Array.isArray(v)) return [];
  return v.filter(
    (x): x is SocialLink =>
      !!x && typeof x === "object" && typeof (x as SocialLink).label === "string" && typeof (x as SocialLink).url === "string",
  );
}
export type Metric = { value: string; label: string };
export function asMetrics(v: unknown): Metric[] {
  if (!Array.isArray(v)) return [];
  return v.filter(
    (x): x is Metric =>
      !!x && typeof x === "object" && typeof (x as Metric).value === "string" && typeof (x as Metric).label === "string",
  );
}
