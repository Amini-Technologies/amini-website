/**
 * One source of truth for the values that end up in metadata, JSON-LD,
 * the sitemap and robots.txt. Anything a crawler reads should come from here
 * so the site never disagrees with itself.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://amini.ng"
).replace(/\/$/, "");

export const SITE_NAME = "Amini";

export const LEGAL_NAME = "Amini Technologies Ltd";

export const SITE_TAGLINE = "Save, Send & Pay — All in One App";

export const SITE_DESCRIPTION =
  "Amini is the savings and payments app built for Nigeria. Set a savings plan, run Adashi with people you trust, send money instantly, and pay bills — in Hausa or English.";

export const SUPPORT_EMAIL = "hello@amini.ng";

export const SOCIAL_PROFILES = [
  "https://www.facebook.com",
  "https://www.instagram.com",
  "https://x.com",
  "https://www.linkedin.com",
  "https://www.youtube.com",
];

/** Absolute URL for a site-relative path — crawlers reject relative ones in JSON-LD. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
