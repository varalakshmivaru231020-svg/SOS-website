import Image from "next/image";

/**
 * Full-bleed picture behind a hero. The subject sits on the right of every
 * render, so the CSS fades the left and bottom edges into the midnight band
 * and the headline stays legible on top. Above the fold on every page that
 * uses it, hence preloaded.
 */
export default function HeroBackdrop({ src }: { src: string }) {
  return (
    <div className="hero-bg" aria-hidden="true">
      <Image src={src} alt="" fill preload sizes="100vw" />
    </div>
  );
}
