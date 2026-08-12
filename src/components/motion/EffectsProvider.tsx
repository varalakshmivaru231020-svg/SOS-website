"use client";

// Ports the original site's attribute-driven animation engine:
// [data-reveal]/[data-delay] scroll reveals, [data-par] parallax,
// [data-card] 3D tilt + sheen, [data-magnet] magnetic buttons, custom cursor,
// scroll progress bar and the ambient canvas orb field. Markup stays in server
// components; this single client component wires behaviour onto it and
// re-scans on every route change.

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function finePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}
function motionLevel() {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--motion"));
  return Number.isFinite(v) ? v : 1;
}

export default function EffectsProvider() {
  const pathname = usePathname();
  const cursorRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mark JS availability — reveal-hidden styles only apply under html.js,
  // so bots and no-JS users always see full content.
  useEffect(() => {
    document.documentElement.classList.add("js");
  }, []);

  // ── Split headings into per-word masks ──────────────────────────
  // Each word gets its own overflow-hidden wrapper so it can rise out of
  // the mask like a title card. Stagger is line-aware: words on a new
  // visual line get an extra beat, so a headline reads line by line.
  // Splitting happens before the reveal observer runs, and preserves
  // inline elements (the <em> accent word) by recursing into them.
  useEffect(() => {
    if (prefersReducedMotion() || motionLevel() === 0) return;
    const heads = Array.from(document.querySelectorAll<HTMLElement>("[data-lines]:not(.is-split)"));

    const wrapWords = (node: Node, out: HTMLElement[]) => {
      const kids = Array.from(node.childNodes);
      for (const kid of kids) {
        if (kid.nodeType === Node.TEXT_NODE) {
          const text = kid.textContent ?? "";
          if (!text.trim()) continue;
          const frag = document.createDocumentFragment();
          // Keep the original spacing: split on whitespace but re-emit it.
          for (const part of text.split(/(\s+)/)) {
            if (!part) continue;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
              continue;
            }
            const mask = document.createElement("span");
            mask.className = "w";
            const inner = document.createElement("span");
            inner.className = "w-i";
            inner.textContent = part;
            mask.appendChild(inner);
            frag.appendChild(mask);
            out.push(inner);
          }
          node.replaceChild(frag, kid);
        } else if (kid.nodeType === Node.ELEMENT_NODE) {
          wrapWords(kid, out);
        }
      }
    };

    for (const head of heads) {
      const words: HTMLElement[] = [];
      wrapWords(head, words);
      if (!words.length) continue;
      // Group by visual line, then stagger: 0.055s per word, plus a
      // 0.09s beat whenever a new line starts.
      let lineTop: number | null = null;
      let step = 0;
      for (const w of words) {
        const top = w.getBoundingClientRect().top;
        if (lineTop === null) lineTop = top;
        else if (Math.abs(top - lineTop) > 4) {
          lineTop = top;
          step += 1.6;
        }
        w.style.setProperty("--wd", `${(step * 0.055 * motionLevel()).toFixed(3)}s`);
        step += 1;
      }
      head.classList.add("is-split");
    }
  }, [pathname]);

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
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            const delay = parseFloat(el.dataset.delay ?? "0");
            el.style.setProperty("--reveal-delay", `${delay * motionLevel()}s`);
            el.classList.add("is-in");
            io.unobserve(el);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    // Hold everything while the title card is on screen, so the hero plays
    // *as* the curtain lifts instead of finishing behind it. The inline gate
    // in the root layout publishes when the lift begins.
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      els.forEach((el) => io.observe(el));
    };

    // Prefer the curtain's own animationstart — that is exactly the frame the
    // lift begins, and it can't drift from the CSS the way a timestamp can.
    // The timer is the fallback for when hydration lands after the lift has
    // already started (so the event will never fire again).
    const seq = document.querySelector<HTMLElement>(".title-seq");
    const playing =
      document.documentElement.dataset.seq === "on" && seq && getComputedStyle(seq).display !== "none";
    let timer = 0;
    if (playing && seq) {
      seq.addEventListener("animationstart", start, { once: true });
      const until = (window as unknown as { __nmSeqUntil?: number }).__nmSeqUntil ?? 0;
      timer = window.setTimeout(start, Math.max(0, until - performance.now()) + 250);
    } else {
      start();
    }
    return () => {
      window.clearTimeout(timer);
      seq?.removeEventListener("animationstart", start);
      io.disconnect();
    };
  }, [pathname]);

  // ── The continuous loop ─────────────────────────────────────────
  // Scroll progress, parallax, scrubbed sections and marquee velocity all
  // share one rAF pass. This is what separates "animates once on entry"
  // from "responds the whole way down": [data-scrub] elements publish a
  // 0→1 progress var that CSS reads every frame.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let raf = 0;
    let ticking = false;
    let lastY = window.scrollY;
    let vel = 0;

    const run = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }

      const m = motionLevel();
      if (m > 0) {
        // Depth: layers drift at their own rate.
        document.querySelectorAll<HTMLElement>("[data-par]").forEach((el) => {
          const speed = parseFloat(el.dataset.par ?? "0.1");
          const rect = el.getBoundingClientRect();
          const mid = rect.top + rect.height / 2 - window.innerHeight / 2;
          el.style.transform = `translateY(${(-mid * speed * m).toFixed(1)}px)`;
        });

        // Scrubbed sections: progress from "fully in frame" to "fully gone".
        document.querySelectorAll<HTMLElement>("[data-scrub]").forEach((el) => {
          const r = el.getBoundingClientRect();
          const travel = Math.max(1, r.height * 0.85);
          const p = Math.min(1, Math.max(0, -r.top / travel));
          el.style.setProperty("--p", (p * m).toFixed(3));
        });

        // Scroll velocity, smoothed — drives the marquee skew.
        const raw = Math.max(-60, Math.min(60, y - lastY));
        vel += (raw - vel) * 0.18;
        doc.style.setProperty("--vel", (vel * m).toFixed(2));
      }
      lastY = y;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        raf = requestAnimationFrame(run);
      }
    };
    // Velocity has to decay back to rest even after scrolling stops.
    const settle = window.setInterval(() => {
      if (Math.abs(vel) > 0.05) {
        vel *= 0.8;
        document.documentElement.style.setProperty("--vel", vel.toFixed(2));
      }
    }, 90);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    run();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.clearInterval(settle);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  // ── Numbers that count into frame ───────────────────────────────
  // A static "2.4B" is a fact; one that rolls up is a reveal. Parses the
  // leading figure and keeps whatever suffix the copy uses (B, %, +, yrs).
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
          const dur = 1400 * motionLevel();
          const t0 = performance.now();
          const tick = (t: number) => {
            const raw = Math.min(1, (t - t0) / dur);
            // Ease-out cubic: fast start, long settle — matches --ease.
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

  // 3D card tilt (delegated).
  useEffect(() => {
    if (prefersReducedMotion() || !finePointer()) return;
    const strength = 7;
    const onMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-card]");
      if (!card) return;
      const m = motionLevel();
      if (m === 0) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(900px) rotateX(${(-py * strength * m).toFixed(2)}deg) rotateY(${(px * strength * m).toFixed(2)}deg) translateZ(0)`;
    };
    const onLeave = (e: PointerEvent) => {
      const card = (e.target as HTMLElement).closest<HTMLElement>("[data-card]");
      if (card) card.style.transform = "";
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerout", onLeave, { passive: true });
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerout", onLeave);
    };
  }, []);

  // Magnetic buttons (delegated) + cursor grow.
  useEffect(() => {
    if (prefersReducedMotion() || !finePointer()) return;
    const onMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      const magnet = target.closest<HTMLElement>("[data-magnet]");
      document.querySelectorAll<HTMLElement>("[data-magnet].is-pulled").forEach((el) => {
        if (el !== magnet) {
          el.classList.remove("is-pulled");
          el.style.transform = "";
        }
      });
      const cursor = cursorRef.current;
      if (cursor) {
        const interactive = target.closest("a, button, [data-magnet]");
        cursor.classList.toggle("grow", !!interactive);
      }
      if (magnet) {
        const m = motionLevel();
        if (m === 0) return;
        const r = magnet.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        magnet.classList.add("is-pulled");
        magnet.style.transform = `translate(${(dx * 0.22 * m).toFixed(1)}px, ${(dy * 0.28 * m).toFixed(1)}px)`;
      }
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  // Custom cursor follower (lerped).
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || prefersReducedMotion() || !finePointer()) return;
    if (document.documentElement.dataset.cursor !== "on") return;
    let x = -100, y = -100, tx = -100, ty = -100;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.17;
      y += (ty - y) * 0.17;
      cursor.style.transform = `translate(${x - 15}px, ${y - 15}px)`;
      raf = requestAnimationFrame(loop);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      document.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Ambient orb field — lazy-init after paint, DPR-capped, paused off-tab.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion() || motionLevel() === 0) return;
    let raf = 0;
    let running = true;
    let cleanup = () => {};
    const init = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const accent =
        getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#b8502a";
      const colors = [accent, "#2b3a8f"];
      type Orb = { x: number; y: number; r: number; a: number; s: number; p: number; c: string };
      let orbs: Orb[] = [];
      const size = () => {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        // Fewer, softer orbs than the original: the atmosphere layer's key
        // light now carries the ambient colour, and running both at full
        // strength read as smudges rather than depth.
        orbs = Array.from({ length: 13 }, (_, i) => ({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: (30 + Math.random() * 90) * dpr,
          a: Math.random() * Math.PI * 2,
          s: 0.08 + Math.random() * 0.22,
          p: Math.random() * Math.PI * 2,
          c: colors[i % 2],
        }));
      };
      size();
      const onResize = () => size();
      window.addEventListener("resize", onResize);
      let t = 0;
      const draw = () => {
        if (!running) return;
        t += 0.004;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (const o of orbs) {
          o.x += Math.cos(o.a) * o.s * dpr;
          o.y += Math.sin(o.a) * o.s * dpr;
          if (o.x < -o.r) o.x = canvas.width + o.r;
          if (o.x > canvas.width + o.r) o.x = -o.r;
          if (o.y < -o.r) o.y = canvas.height + o.r;
          if (o.y > canvas.height + o.r) o.y = -o.r;
          const alpha = 0.03 + 0.028 * (1 + Math.sin(t * 2 + o.p));
          const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r);
          g.addColorStop(0, o.c);
          g.addColorStop(1, "transparent");
          ctx.globalAlpha = alpha;
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        raf = requestAnimationFrame(draw);
      };
      raf = requestAnimationFrame(draw);
      const onVis = () => {
        running = document.visibilityState === "visible";
        if (running) raf = requestAnimationFrame(draw);
      };
      document.addEventListener("visibilitychange", onVis);
      cleanup = () => {
        window.removeEventListener("resize", onResize);
        document.removeEventListener("visibilitychange", onVis);
      };
    };
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle ? window.requestIdleCallback(init) : window.setTimeout(init, 300);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      cleanup();
      if (hasIdle) window.cancelIdleCallback(idle as number);
      else window.clearTimeout(idle as number);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="ambient-canvas" aria-hidden="true" />
      <div ref={progressRef} className="scroll-progress" aria-hidden="true" />
      <div ref={cursorRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
