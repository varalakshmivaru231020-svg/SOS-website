"use client";

// Three cards in view, stepping one at a time. The track is a scroll-snap
// container, so touch and trackpad swiping work with no JS at all — the arrows
// only drive the same scroll for mouse and keyboard users. Cards themselves stay
// in the server component and arrive here as children.

import { useCallback, useEffect, useRef, useState } from "react";

export default function ServiceSlider({ children }: { children: React.ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    // 2px slack: fractional scroll positions never land exactly on the bound.
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      el.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [sync]);

  const step = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.children;
    // Distance between two card origins is width + gap, whatever the breakpoint.
    const amount =
      cards.length > 1
        ? (cards[1] as HTMLElement).offsetLeft - (cards[0] as HTMLElement).offsetLeft
        : el.clientWidth;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * amount, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="svc-slider">
      <div className="svc-track" ref={trackRef}>
        {children}
      </div>
      <div className="svc-nav">
        <button type="button" onClick={() => step(-1)} disabled={atStart} aria-label="Previous services">
          <span aria-hidden="true">←</span>
        </button>
        <button type="button" onClick={() => step(1)} disabled={atEnd} aria-label="Next services">
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  );
}
