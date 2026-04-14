import { Manrope } from "next/font/google";

/**
 * Single marketing `Manrope` instance for the public site.
 * Importing this module everywhere avoids multiple `next/font` loaders for the same family
 * (duplicate preconnect/CSS and redundant subset requests).
 */
export const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  adjustFontFallback: true,
});
