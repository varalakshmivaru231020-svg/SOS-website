"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Brandmark from "./Brandmark";
import type { MenuEntry } from "@/content";

// Dropdowns open on hover with a mouse and on click/tap/Enter otherwise. Hover
// is gated on pointerType so a tap — which also fires pointerenter — doesn't
// open the panel and then immediately toggle it shut again.
const CLOSE_DELAY = 140;

function Chevron() {
  return (
    <svg className="chev" viewBox="0 0 12 12" width="10" height="10" aria-hidden="true">
      <path d="M2.5 4.5L6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function isActive(pathname: string, e: MenuEntry): boolean {
  // "/" is a prefix of every path, so Home only lights up on the home page.
  if (e.kind === "link") return e.href === "/" ? pathname === "/" : pathname.startsWith(e.href);
  return e.match.some((m) => pathname === m || pathname.startsWith(`${m}/`));
}

export default function Header({
  menu,
  wordmark = "Supreme One Software",
  logoSrc,
  logoAlt,
}: {
  menu: MenuEntry[];
  wordmark?: string;
  logoSrc?: string | null;
  logoAlt?: string | null;
}) {
  const pathname = usePathname();
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<number | null>(null);
  const [lastPath, setLastPath] = useState(pathname);
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);
  // A hover-opened panel shouldn't snap shut when the same mouse then clicks
  // its trigger — the first click confirms it instead.
  const hoverOpened = useRef(false);

  // Navigating closes everything — the header persists across routes.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenIdx(null);
    setMobileOpen(false);
    setMobileSection(null);
  }

  const openNow = (i: number) => {
    window.clearTimeout(closeTimer.current);
    setOpenIdx(i);
  };
  const closeSoon = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenIdx(null), CLOSE_DELAY);
  };
  useEffect(() => () => window.clearTimeout(closeTimer.current), []);

  // Escape closes whichever menu is open and hands focus back to its trigger;
  // a click anywhere outside the nav closes a dropdown.
  useEffect(() => {
    if (openIdx === null && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (mobileOpen) {
        setMobileOpen(false);
        toggleRef.current?.focus();
      } else if (openIdx !== null) {
        navRef.current?.querySelector<HTMLButtonElement>(`[data-trigger="${openIdx}"]`)?.focus();
        setOpenIdx(null);
      }
    };
    const onDown = (e: PointerEvent) => {
      if (openIdx !== null && navRef.current && !navRef.current.contains(e.target as Node)) setOpenIdx(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [openIdx, mobileOpen]);

  // The mobile sheet covers the page; stop the page scrolling underneath it.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  return (
    <header className="site-header">
      <div className="container bar">
        <Link href="/" className="wordmark" aria-label={`${wordmark} — home`}>
          <Brandmark wordmark={wordmark} logoSrc={logoSrc} logoAlt={logoAlt} height={logoSrc ? 52 : 30} priority />
        </Link>

        <nav className="site-nav" aria-label="Main" ref={navRef}>
          <ul className="nav-list">
            {menu.map((e, i) =>
              e.kind === "link" ? (
                <li key={e.label}>
                  <Link href={e.href} className={`nav-link${isActive(pathname, e) ? " active" : ""}`}>
                    {e.label}
                  </Link>
                </li>
              ) : (
                <li
                  key={e.label}
                  className="nav-item"
                  data-open={openIdx === i}
                  onPointerEnter={(ev) => {
                    if (ev.pointerType !== "mouse") return;
                    hoverOpened.current = openIdx !== i;
                    openNow(i);
                  }}
                  onPointerLeave={(ev) => ev.pointerType === "mouse" && closeSoon()}
                  onBlur={(ev) => {
                    if (!ev.currentTarget.contains(ev.relatedTarget as Node | null)) setOpenIdx((v) => (v === i ? null : v));
                  }}
                >
                  <button
                    type="button"
                    className={`nav-link nav-trigger${isActive(pathname, e) ? " active" : ""}`}
                    aria-expanded={openIdx === i}
                    aria-controls={`menu-${i}`}
                    data-trigger={i}
                    onClick={() => {
                      if (hoverOpened.current && openIdx === i) {
                        hoverOpened.current = false;
                        return;
                      }
                      setOpenIdx((v) => (v === i ? null : i));
                    }}
                  >
                    {e.label}
                    <Chevron />
                  </button>
                  <div id={`menu-${i}`} className={`mega${e.wide ? " wide" : ""}`}>
                    <div className="mega-cols">
                      {e.columns.map((col, c) => (
                        <div key={c} className="mega-col">
                          {col.heading && <p className="mega-h">{col.heading}</p>}
                          <ul>
                            {col.links.map((l) => (
                              <li key={l.href}>
                                <Link
                                  href={l.href}
                                  className={`mega-link${pathname === l.href ? " active" : ""}`}
                                  aria-current={pathname === l.href ? "page" : undefined}
                                  onClick={() => setOpenIdx(null)}
                                >
                                  <span>{l.label}</span>
                                  {l.note && <small>{l.note}</small>}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    {e.footer && (
                      <Link href={e.footer.href} className="mega-foot" onClick={() => setOpenIdx(null)}>
                        {e.footer.label} <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="bar-end">
          <Link href="/book-a-demo" className="btn btn-accent nav-cta">
            Book a Demo
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="nav-toggle"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav id="mobile-menu" className="m-panel" aria-label="Main">
          <ul className="m-list">
            {menu.map((e, i) =>
              e.kind === "link" ? (
                <li key={e.label}>
                  <Link href={e.href} className="m-link" onClick={() => setMobileOpen(false)}>
                    {e.label}
                  </Link>
                </li>
              ) : (
                <li key={e.label}>
                  <button
                    type="button"
                    className="m-link m-trigger"
                    aria-expanded={mobileSection === i}
                    aria-controls={`m-sub-${i}`}
                    onClick={() => setMobileSection((v) => (v === i ? null : i))}
                  >
                    {e.label}
                    <Chevron />
                  </button>
                  <div id={`m-sub-${i}`} className="m-sub" hidden={mobileSection !== i}>
                    {e.columns.map((col, c) => (
                      <div key={c}>
                        {col.heading && <p className="mega-h">{col.heading}</p>}
                        <ul>
                          {col.links.map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} onClick={() => setMobileOpen(false)}>
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {e.footer && (
                      <Link href={e.footer.href} className="mega-foot" onClick={() => setMobileOpen(false)}>
                        {e.footer.label} <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                </li>
              ),
            )}
          </ul>
          <Link href="/book-a-demo" className="btn btn-accent m-cta" onClick={() => setMobileOpen(false)}>
            Book a Demo
          </Link>
        </nav>
      )}
    </header>
  );
}
