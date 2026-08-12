import type { Metadata } from "next";
import { instrumentSerif, spaceGrotesk } from "@/lib/fonts";
import { getSettings, getSeo } from "@/lib/content";
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
  // ?v= is the settings timestamp, so uploading a new icon busts the cache.
  const icon = `/api/brand/favicon?v=${settings.assetVersion}`;
  return {
    title: seo?.title ?? "Supreme One Software — Software studio & communication platform",
    description: seo?.description ?? "",
    icons: { icon: [{ url: icon }], shortcut: [icon], apple: [{ url: icon }] },
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
      data-cursor={settings.cursorEffects ? "on" : "off"}
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
