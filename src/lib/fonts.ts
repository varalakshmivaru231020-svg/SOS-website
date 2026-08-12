import localFont from "next/font/local";

export const instrumentSerif = localFont({
  src: [
    { path: "../fonts/instrument-serif-regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-serif",
  display: "swap",
});

export const spaceGrotesk = localFont({
  src: [{ path: "../fonts/space-grotesk-var.woff2", weight: "300 700", style: "normal" }],
  variable: "--font-sans",
  display: "swap",
});
