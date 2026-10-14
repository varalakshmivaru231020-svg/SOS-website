"use client";

// The site's only motion: content fades up as it scrolls into view
// ([data-reveal], staggered by [data-delay]) and figures count up
// ([data-count]). Kept deliberately minimal. Markup stays in server
// components; this client component wires behaviour onto it and re-scans on
// every route change.

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function motionLevel() {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--motion"));
  return Number.isFinite(v) ? v : 1;
}

export default function EffectsProvider() {
  const pathname = usePathname();

  // Mark JS availability — reveal-hidden styles only apply under html.js,
  // so bots and no-JS visitors always see the full content.
  useEffect(() => {
    document.documentElement.classList.add("js");
  }, []);

  // Scroll reveals — re-scan per route.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (prefersReducedMotion() || motionLevel() === 0) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          const delay = parseFloat(el.dataset.delay ?? "0");
          el.style.setProperty("--reveal-delay", `${delay * motionLevel()}s`);
          el.classList.add("is-in");
          io.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  // Figures count up when they enter the frame. Parses the leading number
  // and keeps whatever suffix the copy uses (+, %, yrs); anything that
  // doesn't start with a digit ("Est. 2025") is left as written.
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-count]:not(.counted)"));
    if (!els.length) return;
    if (prefersReducedMotion() || motionLevel() === 0) {
      els.forEach((el) => el.classList.add("counted"));
      return;
    }
    const timers = new Set<number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          io.unobserve(el);
          el.classList.add("counted");
          const full = el.textContent ?? "";
          const match = /^([\d.,]+)([\s\S]*)$/.exec(full.trim());
          if (!match) continue;
          const target = parseFloat(match[1].replace(/,/g, ""));
          if (!Number.isFinite(target)) continue;
          const decimals = (match[1].split(".")[1] ?? "").length;
          const suffix = match[2];
          const dur = 1200 * motionLevel();
          const t0 = performance.now();
          const tick = (t: number) => {
            const raw = Math.min(1, (t - t0) / dur);
            const p = 1 - Math.pow(1 - raw, 3);
            el.textContent = (target * p).toFixed(decimals) + suffix;
            if (raw < 1) timers.add(requestAnimationFrame(tick));
            else el.textContent = full;
          };
          timers.add(requestAnimationFrame(tick));
        }
      },
      { threshold: 0.5 },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      timers.forEach((t) => cancelAnimationFrame(t));
    };
  }, [pathname]);

  return null;
}
