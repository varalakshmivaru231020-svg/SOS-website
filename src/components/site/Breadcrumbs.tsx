import Link from "next/link";
import JsonLd from "./JsonLd";
import { SITE_URL } from "@/lib/site-url";

export type Crumb = { label: string; href: string };

/** Visible trail plus the matching BreadcrumbList for search results. */
export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  const all = [{ label: "Home", href: "/" }, ...trail];
  return (
    <>
      <nav className="crumbs" aria-label="Breadcrumb" data-reveal>
        <ol>
          {all.map((c, i) => (
            <li key={c.href}>
              {i < all.length - 1 ? <Link href={c.href}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: `${SITE_URL}${c.href === "/" ? "" : c.href}`,
          })),
        }}
      />
    </>
  );
}
