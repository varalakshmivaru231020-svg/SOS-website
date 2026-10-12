import Link from "next/link";
import PageHero from "./PageHero";

export type LegalSection = { title: string; body: React.ReactNode[] };

const LEGAL_LINKS = [
  { href: "/legal/privacy", label: "Privacy Policy" },
  { href: "/legal/terms", label: "Terms & Conditions" },
  { href: "/legal/cookies", label: "Cookie Policy" },
  { href: "/legal/acceptable-use", label: "Acceptable Use" },
];

/** Shared layout for the legal pages: hero, numbered sections, links to the others. */
export default function LegalPage({
  path,
  title,
  accent,
  lede,
  updated,
  sections,
}: {
  path: string;
  title: string;
  accent: string;
  lede: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero
        crumbs={[{ label: title, href: path }]}
        eyebrow="Legal"
        title={title}
        accent={accent}
        lede={lede}
        note={`Last updated: ${updated}`}
      />
      <section className="section section-line">
        <div className="container narrow">
          <ol className="legal">
            {sections.map((s, i) => (
              <li key={s.title} data-reveal data-delay={0.03 * i}>
                <span className="legal-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="h3 serif">{s.title}</h2>
                  {s.body.map((p, k) => (
                    <p key={k}>{p}</p>
                  ))}
                </div>
              </li>
            ))}
          </ol>
          <nav className="legal-nav" aria-label="Legal pages" data-reveal>
            {LEGAL_LINKS.filter((l) => l.href !== path).map((l) => (
              <Link key={l.href} href={l.href} className="btn btn-ghost">
                {l.label} →
              </Link>
            ))}
          </nav>
        </div>
      </section>
    </>
  );
}
