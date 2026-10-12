import type { Metadata } from "next";
import { inter } from "@/lib/fonts";
import { getSettings, getSeo } from "@/lib/content";
import { SITE_URL } from "@/lib/site-url";
import "./globals.css";

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
      // Browser extensions often add attributes to <html> before hydration.
      suppressHydrationWarning
      style={
        {
          "--accent": settings.accentColor,
          "--motion": settings.motionIntensity,
        } as React.CSSProperties
      }
      data-motion={settings.motionIntensity === 0 ? "0" : undefined}
    >
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}
