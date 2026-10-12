import Link from "next/link";
import type { Item } from "@/content/types";

/** A product, service or industry as a linked card: name, one line, arrow. */
export function LinkCard({
  href,
  title,
  note,
  kicker,
  delay = 0,
}: {
  href: string;
  title: string;
  note: string;
  kicker?: string;
  delay?: number;
}) {
  return (
    <Link href={href} className="l-card" data-reveal data-delay={delay}>
      {kicker && <span className="l-kicker">{kicker}</span>}
      <span className="l-title">{title}</span>
      <span className="l-note">{note}</span>
      <span className="l-arrow" aria-hidden="true">
        →
      </span>
    </Link>
  );
}

/** Numbered steps on a connecting rule — "How it works", "How we work". */
export function Steps({ steps }: { steps: Item[] }) {
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <li key={s.title} className="step" data-reveal data-delay={0.07 * i}>
          <span className="step-n" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="step-title">{s.title}</span>
          <span className="step-copy">{s.copy}</span>
        </li>
      ))}
    </ol>
  );
}

/** Ticked feature list. */
export function Features({ items }: { items: Item[] }) {
  return (
    <ul className="features">
      {items.map((f, i) => (
        <li key={f.title} className="feature" data-reveal data-delay={0.05 * i}>
          <span className="tick" aria-hidden="true">
            <svg viewBox="0 0 16 16" width="14" height="14">
              <path d="M3.5 8.4l3 3 6-6.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span>
            <b>{f.title}</b>
            <span>{f.copy}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
