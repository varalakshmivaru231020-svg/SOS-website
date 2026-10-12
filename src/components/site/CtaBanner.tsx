import Link from "next/link";
import Accent from "./Accent";
import { contactHref, demoHref } from "@/content";

/**
 * The closing "Book a Demo" banner every page ends on. Pages pass their own
 * line; the action is always the demo booking, pre-filled with what the
 * visitor was looking at when there is something to pre-fill.
 */
export default function CtaBanner({
  heading,
  accent,
  sub,
  cta = "Book a Demo",
  interest,
  href = demoHref(interest),
  secondary = { label: "Talk to sales", href: contactHref(interest) },
}: {
  heading: string;
  accent?: string;
  sub?: string;
  cta?: string;
  interest?: string;
  /** Defaults to the demo booking; services point "Start a project" at the enquiry form. */
  href?: string;
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section className="cta-band">
      <div className="container">
        <h2 className="h2" data-reveal>
          <Accent text={heading} accent={accent} />
        </h2>
        {sub && (
          <p className="cta-sub" data-reveal data-delay="0.08">
            {sub}
          </p>
        )}
        <div className="cta-actions" data-reveal data-delay="0.12">
          <Link href={href} className="btn btn-accent">
            {cta}
          </Link>
          {secondary && (
            <Link href={secondary.href} className="btn btn-line-light">
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
