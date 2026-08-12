// Page-level copy (headings, heroes, micro-copy) transcribed verbatim from the
// original site. Structured content (services, products, FAQs…) lives in the
// database; this module carries the copy that belongs to the page templates
// themselves.
import raw from "./site-copy.json";

type Hero = { eyebrow: string; heading: string; sub: string };

export const COPY = raw as typeof raw & {
  homeHero: Hero & { ctaPrimary: string; ctaSecondary: string };
  servicesHero: Hero;
  productsHero: Hero & { codeSample: string };
  workHero: Hero;
  contactHero: Hero;
  aboutHero: { eyebrow: string; heading: string; story: string };
};

/** Splits a heading so one word can carry the serif-italic accent, matching the
 * original design's emphasis device. `accentWord` is matched case-insensitively;
 * falls back to the last word. */
export function emphasize(heading: string, accentWord?: string): { pre: string; em: string; post: string } {
  const words = heading.split(" ");
  let idx = -1;
  if (accentWord) idx = words.findIndex((w) => w.toLowerCase().replace(/[^a-z]/g, "") === accentWord.toLowerCase());
  if (idx === -1) idx = words.length - 1;
  return {
    pre: words.slice(0, idx).join(" ") + (idx > 0 ? " " : ""),
    em: words[idx],
    post: (idx < words.length - 1 ? " " : "") + words.slice(idx + 1).join(" "),
  };
}
