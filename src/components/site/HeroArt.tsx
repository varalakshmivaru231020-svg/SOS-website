"use client";

import { useEffect, useRef } from "react";

/**
 * The abstract 3D composition behind the hero: a lit sphere, a metallic ring,
 * a glass slab and a few small orbs, all drawn with CSS gradients and
 * transforms — no WebGL, no asset download. The group tilts a few degrees
 * toward the pointer and drifts with scroll (parallax); both stop under
 * reduced motion or when the site's motion level is 0.
 */
export default function HeroArt() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const still =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--motion")) === 0 ||
      !window.matchMedia("(pointer: fine)").matches;
    if (still) return;

    let rx = 0,
      ry = 0,
      sy = 0,
      raf = 0;
    const paint = () => {
      raf = 0;
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
      el.style.setProperty("--sy", `${sy}px`);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      rx = -y * 10;
      ry = x * 12;
      queue();
    };
    const onLeave = () => {
      rx = ry = 0;
      queue();
    };
    const onScroll = () => {
      sy = window.scrollY * 0.12;
      queue();
    };
    const host = el.closest("section") ?? el;
    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="art" ref={ref} aria-hidden="true">
      <div className="art-scene">
        <span className="art-glow" />
        <span className="art-ring" />
        <span className="art-sphere" />
        <span className="art-glass" />
        <span className="art-orb art-orb-1" />
        <span className="art-orb art-orb-2" />
        <span className="art-orb art-orb-3" />
      </div>
    </div>
  );
}
