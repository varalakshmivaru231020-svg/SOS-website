import "server-only";
import type { Metadata } from "next";
import { getSeo } from "@/lib/content";

export async function pageMetadata(path: string, fallbackTitle: string): Promise<Metadata> {
  const seo = await getSeo(path);
  return {
    title: seo?.title ?? fallbackTitle,
    description: seo?.description ?? undefined,
    robots: seo?.noindex ? { index: false } : undefined,
    openGraph: {
      title: seo?.ogTitle ?? seo?.title ?? fallbackTitle,
      description: seo?.ogDescription ?? seo?.description ?? undefined,
      type: "website",
    },
  };
}
