import Image from "next/image";

/**
 * The picture half of a split section: a framed render that slides in from
 * its own side, floats gently and zooms on hover. Purely visual — it carries
 * no information the text doesn't — so it is hidden from assistive tech.
 * `pos` is the object-position; the renders put their subject on the right.
 */
export default function Cinematic({
  src,
  from = "right",
  pos = "72% 50%",
  preload = false,
}: {
  src: string;
  from?: "left" | "right";
  pos?: string;
  preload?: boolean;
}) {
  return (
    <figure className="cine" data-reveal={from} aria-hidden="true">
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 960px) 100vw, 50vw"
        style={{ objectPosition: pos }}
        preload={preload}
      />
    </figure>
  );
}
