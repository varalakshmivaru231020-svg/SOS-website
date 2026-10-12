"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * A thin bar across the top from the moment an internal link is clicked until
 * the new page arrives, so a click is never met with nothing. Production pages
 * are prebuilt and usually arrive at once; it matters most on slow networks
 * and in development, where a page compiles on its first visit.
 */
export default function NavProgress() {
  const pathname = usePathname();
  const [pending, setPending] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Arrived: clear the bar during render rather than in an effect.
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setPending(false);
  }

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Same page (or an in-page #anchor) — no navigation to wait for.
      if (url.pathname === window.location.pathname) return;
      setPending(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Never leave a bar stuck if a navigation is abandoned.
  useEffect(() => {
    if (!pending) return;
    const t = window.setTimeout(() => setPending(false), 30000);
    return () => window.clearTimeout(t);
  }, [pending]);

  return <div className={`nav-progress${pending ? " on" : ""}`} role="progressbar" aria-hidden={!pending} aria-label="Loading page" />;
}
