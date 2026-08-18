"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Brandmark from "./Brandmark";

const LINKS = [
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/platform", label: "Platform" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
];

export default function Header({
  wordmark = "Supreme One Software",
  logoSrc,
  logoAlt,
}: {
  wordmark?: string;
  logoSrc?: string | null;
  logoAlt?: string | null;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // An open menu with no keyboard escape is a trap: Escape closes it and
  // returns focus to the button that opened it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Close on navigation — the panel is fixed, so it would otherwise stay
  // open over the new page.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="site-header">
      <div className="container bar">
        <Link href="/" className="wordmark" aria-label={`${wordmark} — home`}>
          {/* 30px suited a text wordmark; the uploaded lockup is a wide 3.6:1
              horizontal logo whose "SOFTWARE PVT LTD" second line goes mushy
              when it gets small. 52 is as tall as the 68px bar takes before the
              mark crowds the rule under it — 190px wide, inside .brand-logo's
              220px cap — and it reads clearly where 40 did not. */}
          <Brandmark wordmark={wordmark} logoSrc={logoSrc} logoAlt={logoAlt} height={logoSrc ? 52 : 30} />
        </Link>
        <nav className={`site-nav${open ? " open" : ""}`} aria-label="Main">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname.startsWith(l.href) ? "active" : undefined}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-accent nav-cta" data-magnet onClick={() => setOpen(false)}>
            Start a project
          </Link>
        </nav>
        <button
          ref={toggleRef}
          className="nav-toggle"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
