"use client";

import { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { recordPath } from "@/lib/nav-history";

// Third-party scripts, each switched on by an environment variable so nothing
// loads until it is configured:
//   NEXT_PUBLIC_GA_ID              Google Analytics 4 — page views (including
//                                  client-side navigations, via GA4's history
//                                  tracking) and a `book_demo_click` event per page.
//   NEXT_PUBLIC_CHAT_WIDGET_SRC    the live chat widget script, so the site's own
//                                  chat doubles as a product demo.
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CHAT_SRC = process.env.NEXT_PUBLIC_CHAT_WIDGET_SRC;

type Gtag = (...args: unknown[]) => void;

/** Sends a GA4 event when analytics is configured; a no-op otherwise. */
export function track(event: string, params: Record<string, string> = {}) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  gtag?.("event", event, { page_path: window.location.pathname, ...params });
}

export default function SiteScripts() {
  const pathname = usePathname();
  // Runs before the page's own effects on each navigation (this sits earlier in
  // the layout), so an enquiry form mounting on the new page already sees the
  // page the visitor came from.
  useEffect(() => recordPath(pathname), [pathname]);

  // One delegated listener catches every Book a Demo link — header, heroes,
  // banners — so "demo clicks per page" needs no per-button wiring.
  useEffect(() => {
    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href^="/book-a-demo"]');
      if (!link) return;
      const where = link.closest("header") ? "header" : link.closest("footer") ? "footer" : "page";
      track("book_demo_click", { link_text: link.textContent?.trim() ?? "", link_location: where });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      {GA_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)});`}
          </Script>
        </>
      )}
      {CHAT_SRC && <Script src={CHAT_SRC} strategy="lazyOnload" />}
    </>
  );
}
