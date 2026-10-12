import type { Metadata } from "next";
import { instrumentSerif, spaceGrotesk } from "@/lib/fonts";
import { getSettings, getSeo } from "@/lib/content";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

// Keep in sync with the 1.75s lift delay on .title-seq in globals.css.
const SEQUENCE_GATE = `(function(){try{
var d=document.documentElement;
var off=matchMedia('(prefers-reduced-motion: reduce)').matches
  ||parseFloat(getComputedStyle(d).getPropertyValue('--motion'))===0
  ||sessionStorage.getItem('nm_seen')==='1';
if(off){d.setAttribute('data-seq','off');}
else{sessionStorage.setItem('nm_seen','1');d.setAttribute('data-seq','on');window.__nmSeqUntil=performance.now()+1750;}
}catch(e){document.documentElement.setAttribute('data-seq','off');}})();`;

export async function generateMetadata(): Promise<Metadata> {
  const [seo, settings] = await Promise.all([getSeo("/"), getSettings()]);
  // A favicon uploaded in Admin → Brand & contact wins (?v= busts the cache on
  // re-upload); otherwise the brand mark set in /public, cut from the logo.
  const uploaded = settings.faviconData ? `/api/brand/favicon?v=${settings.assetVersion}` : null;
  return {
    metadataBase: new URL(SITE_URL),
    title: seo?.title || "Supreme One Software — Every customer conversation, in one place",
    description: seo?.description || undefined,
    icons: uploaded
      ? { icon: [{ url: uploaded }], shortcut: [uploaded], apple: [{ url: uploaded }] }
      : {
          icon: [
            { url: "/favicon.ico", sizes: "16x16 32x32 48x48" },
            { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
            { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
          ],
          apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
        },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();
  return (
    <html
      lang="en"
      // The sequence gate below stamps data-seq on this element before React
      // hydrates — deliberate, and the only way to avoid a curtain flash on
      // repeat visits. Without this, hydration reports the extra attribute.
      suppressHydrationWarning
      style={
        {
          "--accent": settings.accentColor,
          "--motion": settings.motionIntensity,
        } as React.CSSProperties
      }
      data-motion={settings.motionIntensity === 0 ? "0" : undefined}
    >
      <body className={`${instrumentSerif.variable} ${spaceGrotesk.variable}`}>
        {/* Runs before the curtain markup below is parsed, so a repeat visit
            never flashes a title card. Also publishes the moment the curtain
            starts lifting, which is when the scroll reveals are released. */}
        <script dangerouslySetInnerHTML={{ __html: SEQUENCE_GATE }} />
        {children}
      </body>
    </html>
  );
}
