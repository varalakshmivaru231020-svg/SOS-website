import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    // /api/brand/ serves the logo and any uploaded favicon; Google's favicon
    // crawler obeys robots.txt, so it must stay fetchable (longest match wins).
    rules: [{ userAgent: "*", allow: ["/", "/api/brand/"], disallow: ["/admin", "/api"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
