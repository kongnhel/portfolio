import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

/**
 * The site speaks in three voices, each with its own family:
 *
 *  - Space Grotesk  --font-grotesk   display headings (h1–h3)
 *  - Inter          --font-inter     body prose
 *  - JetBrains Mono --font-jetbrains the terminal voice: prompts, meta
 *                                    labels, tags, buttons, form fields
 *
 * Inter and Space Grotesk load as variable fonts (one file each); JetBrains
 * Mono keeps three static weights so no reader waits on a heavier download.
 * Every page that renders its own <html> (locale layout, global 404) must put
 * `fontVars` on the <html> className, or the var() chains in globals.css
 * resolve to nothing and font-family silently falls back.
 */
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

/** Put this on <html> (or <body>) wherever globals.css is loaded. */
export const fontVars = [
  inter.variable,
  grotesk.variable,
  jetbrains.variable,
].join(" ");
