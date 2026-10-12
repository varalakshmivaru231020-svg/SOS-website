import "server-only";
import type { Metadata } from "next";
import { getSeo } from "@/lib/content";

/**
 * Page metadata: an override saved in Admin → SEO wins; otherwise the page's
 * own title and description from code. Every page gets a canonical URL and one
 * title + description, as the content guide asks.
 */
export async function pageMetadata(
  path: string,
  fallback: { title: string; description?: string },
): Promise<Metadata> {
  const seo = await getSeo(path);
  const title = seo?.title || fallback.title;
  const description = seo?.description || fallback.description;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: seo?.noindex ? { index: false } : undefined,
    openGraph: {
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      url: path,
      siteName: "Supreme One Software",
      type: "website",
    },
  };
}
