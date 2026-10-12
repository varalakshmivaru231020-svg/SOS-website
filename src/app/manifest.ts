import type { MetadataRoute } from "next";

/** Web app manifest: the name and icons Android and Chrome use for shortcuts. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Supreme One Software",
    short_name: "Supreme One",
    description:
      "WhatsApp, Instagram, Facebook, RCS and cloud voice — automated, unified in one team inbox, and measured end to end.",
    start_url: "/",
    display: "browser",
    background_color: "#f6f4f0",
    theme_color: "#f6f4f0",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
