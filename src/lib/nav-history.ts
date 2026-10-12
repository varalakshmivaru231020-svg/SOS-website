// Remembers the page a visitor was on before the current one, so an enquiry
// can record where it came from. `document.referrer` can't do this on its own:
// client-side navigations never update it.

let current: string | null = null;
let previous: string | null = null;

export function recordPath(path: string) {
  if (path === current) return;
  previous = current;
  current = path;
}

/** The previous in-site page, else the external referrer's host, else "direct". */
export function enquirySource(): string {
  if (previous) return previous;
  try {
    if (!document.referrer) return "direct";
    const ref = new URL(document.referrer);
    return ref.origin === window.location.origin ? ref.pathname : ref.hostname;
  } catch {
    return "";
  }
}
