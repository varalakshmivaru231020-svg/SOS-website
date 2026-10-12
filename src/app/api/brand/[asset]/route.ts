import { NextRequest } from "next/server";
import { getSettings } from "@/lib/content";

/**
 * Serves the logo and favicon uploaded in the admin panel.
 * Both are stored as data URIs on SiteSettings. Without an uploaded logo we
 * draw the wordmark as SVG; without an uploaded favicon we redirect to the
 * brand mark in /public, so the site always has a logo and a tab icon.
 * Callers append ?v=<settings.updatedAt> so a new upload busts the cache.
 */
export async function GET(_req: NextRequest, { params }: { params: Promise<{ asset: string }> }) {
  const { asset } = await params;
  if (asset !== "logo" && asset !== "favicon") {
    return new Response("Not found", { status: 404 });
  }

  const settings = await getSettings();
  const stored = asset === "logo" ? settings.logoData : settings.faviconData;

  if (stored) {
    const match = /^data:([^;,]+);base64,([\s\S]+)$/.exec(stored);
    if (match) {
      const [, mime, b64] = match;
      return new Response(Buffer.from(b64, "base64") as unknown as BodyInit, {
        headers: {
          "Content-Type": mime,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    }
  }

  // No upload: the brand mark in /public is the favicon. A relative Location
  // keeps the redirect on the public host behind the proxy.
  if (asset === "favicon") {
    return new Response(null, { status: 307, headers: { Location: "/icon-192.png" } });
  }

  return new Response(fallbackLogoSvg(settings.wordmark, settings.accentColor), {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=31536000, immutable" },
  });
}

/** Generated logo: the wordmark set in serif with its accent full stop. */
function fallbackLogoSvg(wordmark: string, accent: string): string {
  const safeAccent = /^#[0-9a-fA-F]{3,8}$/.test(accent) ? accent : "#b8502a";
  const text = (wordmark || "Supreme One Software").trim();
  const escaped = text.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]!);

  const width = Math.max(120, escaped.length * 17 + 20);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 40">
<text x="0" y="30" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="currentColor">${escaped}<tspan fill="${safeAccent}">.</tspan></text>
</svg>`;
}
