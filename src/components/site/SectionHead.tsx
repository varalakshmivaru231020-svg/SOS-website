import Accent from "./Accent";

/** Eyebrow + serif heading (+ optional lede) — the opening of every section. */
export default function SectionHead({
  eyebrow,
  heading,
  accent,
  sub,
  center = false,
  as: Tag = "h2",
}: {
  eyebrow?: string;
  heading: string;
  accent?: string;
  sub?: string;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  return (
    <div className={`sec-head${center ? " center" : ""}`}>
      {eyebrow && (
        <span className="eyebrow" data-reveal>
          {eyebrow}
        </span>
      )}
      <Tag className="h2" data-lines data-reveal data-delay="0.06">
        <Accent text={heading} accent={accent} />
      </Tag>
      {sub && (
        <p className="sec-sub" data-reveal data-delay="0.12">
          {sub}
        </p>
      )}
    </div>
  );
}
