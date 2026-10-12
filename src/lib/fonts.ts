import { Inter } from "next/font/google";

// One clean sans for headings and text alike. Downloaded at build time and
// served from the site's own domain. latin-ext carries the ₹ sign.
export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});
