/** Canonical origin for sitemap, robots and structured data. No trailing slash. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://supremeonesoftware.com").replace(/\/$/, "");
