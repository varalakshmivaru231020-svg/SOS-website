import Accent from "./Accent";
import Breadcrumbs, { type Crumb } from "./Breadcrumbs";

/**
 * The page-opening band: off-white with a peach glow and the faint grid
 * (the grid comes from the fixed overlay in the site layout), eyebrow, one H1
 * with its italic accent, lede and actions. With a `visual` it splits into
 * copy + mockup; without, the headline gets the full measure.
 */
export default function PageHero({
  eyebrow,
  title,
  accent,
  lede,
  actions,
  note,
  visual,
  crumbs,
  size = "md",
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  lede?: string;
  actions?: React.ReactNode;
  note?: string;
  visual?: React.ReactNode;
  crumbs?: Crumb[];
  size?: "lg" | "md";
}) {
  return (
    <section className="hero" data-scrub>
      <div className="glow glow-accent" data-par="0.07" aria-hidden="true" />
      <div className="glow glow-peach" data-par="0.11" aria-hidden="true" />
      <div className="container">
        {crumbs && <Breadcrumbs trail={crumbs} />}
        <div className={visual ? "hero-grid" : undefined}>
          <div className="hero-copy">
            {eyebrow && (
              <span className="eyebrow" data-reveal>
                {eyebrow}
              </span>
            )}
            <h1 className={`display${size === "md" ? " display-md" : ""}`} data-lines data-reveal data-delay="0.06">
              <Accent text={title} accent={accent} />
            </h1>
            {lede && (
              <p className="lede" data-reveal data-delay="0.14">
                {lede}
              </p>
            )}
            {actions && (
              <div className="hero-actions" data-reveal data-delay="0.2">
                {actions}
              </div>
            )}
            {note && (
              <p className="hero-note" data-reveal data-delay="0.24">
                {note}
              </p>
            )}
          </div>
          {visual && <div className="hero-visual">{visual}</div>}
        </div>
      </div>
    </section>
  );
}
