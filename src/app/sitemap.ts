import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://northmark.example.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/services", "/products", "/platform", "/work", "/about", "/contact", "/legal/privacy", "/legal/terms"];
  return routes.map((path) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
