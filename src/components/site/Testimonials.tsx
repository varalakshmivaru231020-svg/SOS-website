import type { Testimonial } from "@prisma/client";

/** Customer quotes as cards: the quote, then who said it. Managed in Admin → Site blocks. */
export default function Testimonials({ items }: { items: Testimonial[] }) {
  return (
    <div className="t-grid">
      {items.map((t, i) => {
        const byline = [t.role, t.company].filter(Boolean).join(", ");
        return (
          <figure key={t.id} className="t-card" data-reveal data-delay={0.06 * i}>
            <span className="t-mark" aria-hidden="true">
              “
            </span>
            <blockquote>
              <p>{t.quote}</p>
            </blockquote>
            <figcaption>
              <span className="t-avatar" aria-hidden="true">
                {t.author
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </span>
              <span>
                <b>{t.author}</b>
                {byline && <span className="t-role">{byline}</span>}
              </span>
            </figcaption>
          </figure>
        );
      })}
    </div>
  );
}
