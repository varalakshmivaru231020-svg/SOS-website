import { NextRequest } from "next/server";
import { getSettings } from "@/lib/content";

/**
 * Serves the logo and favicon uploaded in the admin panel.
 * Both are stored as data URIs on SiteSettings; when one is missing we fall
 * back to a generated SVG mark so the site always has a logo and a tab icon.
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

  return new Response(fallbackSvg(settings.wordmark, settings.accentColor, asset === "favicon"), {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=31536000, immutable" },
  });
}

/** Generated mark: the wordmark's initial on the accent colour (favicon), or the wordmark set in serif (logo). */
function fallbackSvg(wordmark: string, accent: string, isFavicon: boolean): string {
  const safeAccent = /^#[0-9a-fA-F]{3,8}$/.test(accent) ? accent : "#b8502a";
  const text = (wordmark || "Supreme One Software").trim();
  const escaped = text.replace(/[<>&"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" })[c]!);

  if (isFavicon) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
<rect width="64" height="64" rx="14" fill="${safeAccent}"/>
<text x="32" y="45" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-size="40" fill="#ffffff">${escaped.charAt(0).toUpperCase()}</text>
</svg>`;
  }

  const width = Math.max(120, escaped.length * 17 + 20);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} 40">
<text x="0" y="30" font-family="Georgia, 'Times New Roman', serif" font-size="30" fill="currentColor">${escaped}<tspan fill="${safeAccent}">.</tspan></text>
</svg>`;
}
