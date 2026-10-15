"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Demo } from "@/content/types";
import Accent from "./Accent";
import DemoVisual from "./DemoVisual";
import HeroArt from "./HeroArt";

export type HeroSlide = {
  tab: string;
  eyebrow: string;
  headline: string;
  accent?: string;
  sub: string;
  cta: { href: string; label: string };
  secondary: { href: string; label: string };
  demo: Demo;
};

/**
 * The home page's opening band as a product carousel: tabs along the bottom,
 * copy crossfading on the left, the product's mockup on the right. It advances
 * when the active tab's progress bar finishes filling (a CSS animation), so
 * pausing on hover or focus is just pausing that animation — and with reduced
 * motion there's no animation, so no autoplay.
 */
export default function HeroSlider({
  slides,
  badge,
  note,
}: {
  slides: HeroSlide[];
  badge?: { href: string; label: string };
  note?: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const visualRef = useRef<HTMLDivElement>(null);

  // A freshly mounted mockup is invisible until revealed; the site's scroll
  // observer only sees the first one, so reveal each new one here.
  useEffect(() => {
    visualRef.current?.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-in"));
  }, [active]);

  const go = (i: number) => setActive((i + slides.length) % slides.length);

  return (
    <section
      className="hero hero-saas"
      aria-roledescription="carousel"
      aria-label="Products"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget as Node | null) && setPaused(false)}
    >
      <div className="hero-glow" aria-hidden="true" />
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            {badge && (
              <Link href={badge.href} className="hero-badge" data-reveal>
                <span className="hero-badge-new">New</span>
                {badge.label}
                <span aria-hidden="true">→</span>
              </Link>
            )}
            <div className="slides">
              {slides.map((s, i) => {
                const H = i === 0 ? "h1" : "h2";
                return (
                  <div
                    key={s.tab}
                    id={`hero-slide-${i}`}
                    role="tabpanel"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${slides.length}: ${s.tab}`}
                    className={`slide${i === active ? " on" : ""}`}
                    aria-hidden={i !== active}
                    inert={i !== active}
                  >
                    <span className="eyebrow">{s.eyebrow}</span>
                    <H className="display">
                      <Accent text={s.headline} accent={s.accent} />
                    </H>
                    <p className="lede">{s.sub}</p>
                    <div className="hero-actions">
                      <Link href={s.cta.href} className="btn btn-accent">
                        {s.cta.label}
                      </Link>
                      <Link href={s.secondary.href} className="btn btn-ghost">
                        {s.secondary.label}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            {note && <p className="hero-note">{note}</p>}
          </div>
          <div className="hero-visual hero-stage" ref={visualRef}>
            <HeroArt />
            <DemoVisual key={active} demo={slides[active].demo} />
          </div>
        </div>

        <div className="slide-tabs" role="tablist" aria-label="Choose a product">
          {slides.map((s, i) => (
            <button
              key={s.tab}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-controls={`hero-slide-${i}`}
              className={`slide-tab${i === active ? " on" : ""}`}
              onClick={() => go(i)}
            >
              {s.tab}
              {i === active && (
                <span
                  className="slide-bar"
                  aria-hidden="true"
                  style={{ animationPlayState: paused ? "paused" : "running" }}
                  onAnimationEnd={() => go(active + 1)}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
