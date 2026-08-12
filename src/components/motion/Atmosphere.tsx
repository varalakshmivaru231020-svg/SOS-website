"use client";

// The room the site is shot in: film grain, a vignette, and a warm key
// light that drifts on its own and leans toward the pointer. None of it
// is content — it is the difference between a screenshot and a held shot.
// Sits above the page background, below content, never takes clicks.

import { useEffect, useRef } from "react";

export default function Atmosphere() {
  const lightRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const light = lightRef.current;
    if (!root || !light) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const motion = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--motion"));
    if (reduced || motion === 0) {
      root.style.display = "none";
      return;
    }

    // The light breathes on a slow sine and is nudged by the pointer, so
    // the frame keeps moving even when the visitor does not.
    let raf = 0;
    let t = Math.random() * 100;
    let px = 0.5;
    let py = 0.5;
    let cx = 0.5;
    let cy = 0.5;
    const fine = window.matchMedia("(pointer: fine)").matches;

    const onMove = (e: PointerEvent) => {
      px = e.clientX / window.innerWidth;
      py = e.clientY / window.innerHeight;
    };
    if (fine) window.addEventListener("pointermove", onMove, { passive: true });

    const loop = () => {
      t += 0.0016;
      // Base drift, then a gentle lean toward the cursor.
      const bx = 32 + Math.cos(t) * 16;
      const by = 24 + Math.sin(t * 0.8) * 14;
      cx += (px - cx) * 0.02;
      cy += (py - cy) * 0.02;
      light.style.setProperty("--kx", `${(bx + (cx - 0.5) * 14).toFixed(2)}%`);
      light.style.setProperty("--ky", `${(by + (cy - 0.5) * 12).toFixed(2)}%`);
      raf = requestAnimationFrame(loop);
    };

    const onVis = () => {
      cancelAnimationFrame(raf);
      if (document.visibilityState === "visible") raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      if (fine) window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="atmosphere" ref={rootRef} aria-hidden="true">
      <div className="keylight" ref={lightRef} />
      <div className="vignette" />
      <div className="grain" />
    </div>
  );
}
