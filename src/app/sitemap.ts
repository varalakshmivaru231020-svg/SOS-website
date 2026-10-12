import type { MetadataRoute } from "next";
import { INDUSTRIES, OFFERINGS, industryHref, offeringHref } from "@/content";
import { SITE_URL } from "@/lib/site-url";

const PAGES = [
  "/products",
  "/services",
  "/industries",
  "/customers",
  "/pricing",
  "/about",
  "/careers",
  "/partners",
  "/contact",
  "/book-a-demo",
  "/faq",
  "/legal/privacy",
  "/legal/terms",
  "/legal/cookies",
  "/legal/acceptable-use",
];

const PRIORITY = { P1: 0.9, P2: 0.8, P3: 0.7 } as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...PAGES.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path.startsWith("/legal") ? 0.3 : 0.7,
    })),
    ...OFFERINGS.map((o) => ({
      url: `${SITE_URL}${offeringHref(o)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: PRIORITY[o.priority],
    })),
    ...INDUSTRIES.map((i) => ({
      url: `${SITE_URL}${industryHref(i.slug)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: PRIORITY[i.priority],
    })),
  ];
}
