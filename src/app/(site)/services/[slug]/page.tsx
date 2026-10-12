import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, getService } from "@/content";
import { pageMetadata } from "@/lib/seo";
import OfferingPage from "@/components/site/OfferingPage";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return pageMetadata(`/services/${s.slug}`, s.seo);
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  return <OfferingPage o={s} />;
}
