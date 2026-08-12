// In-memory sliding-window rate limiter.
// Per-instance only: on serverless each warm instance keeps its own window,
// which is acceptable here because the honeypot + time-trap carry the main
// anti-spam load. Swap for @upstash/ratelimit if global limits are needed.

type Window = { times: number[] };
const buckets = new Map<string, Window>();
const MAX_BUCKETS = 5000;

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  let w = buckets.get(key);
  if (!w) {
    if (buckets.size >= MAX_BUCKETS) {
      const oldest = buckets.keys().next().value;
      if (oldest !== undefined) buckets.delete(oldest);
    }
    w = { times: [] };
    buckets.set(key, w);
  }
  w.times = w.times.filter((t) => now - t < windowMs);
  if (w.times.length >= limit) return false;
  w.times.push(now);
  return true;
}
