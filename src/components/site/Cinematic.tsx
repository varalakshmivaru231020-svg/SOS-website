import Image from "next/image";

/**
 * A wide, decorative picture inside a section — the brand's cinematic
 * renders. Purely visual: it carries no information the text doesn't, so it
 * is hidden from assistive tech. `wide` is for the 3:1 banners.
 */
export default function Cinematic({ src, wide = false, delay = 0 }: { src: string; wide?: boolean; delay?: number }) {
  return (
    <figure className={`cine${wide ? " wide" : ""}`} data-reveal data-delay={delay} aria-hidden="true">
      <Image src={src} alt="" fill sizes="(max-width: 1240px) 100vw, 1240px" />
    </figure>
  );
}
