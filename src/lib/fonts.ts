import { Inter, Space_Grotesk } from "next/font/google";

// Space Grotesk for headings, Inter for text. Both downloaded at build time
// and served from the site's own domain. latin-ext carries the ₹ sign.
export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
