# Supreme One Software — Website + Admin Panel

The Supreme One Software site rebuilt as a fully functional Next.js application: real URLs and SEO,
a working contact form (validated, spam-guarded, stored + emailed), and a complete admin
panel where every piece of content — services, products, case studies, pricing, FAQs,
team, appearance, SEO — is editable without touching code.

Built per the plan in `../Northmark-Website-Plan.md`. Content was originally transcribed from `Northmark Website.html`.

## Stack

- **Next.js 16** (App Router, static generation + on-demand revalidation) · React 19 · TypeScript
- **PostgreSQL + Prisma 7** — Supabase in production, embedded local Postgres in development
- **Auth**: signed JWT session cookie (jose) + bcrypt, roles ADMIN / EDITOR
- **Zod** validation · **Resend** email (optional) · zero UI dependencies — hand-rolled CSS on the original design tokens

## Run it locally

Three terminals the first time (or run them one after another):

```bash
# 1. Start the local database (keeps running; data persists in .pgdata/)
npm run db:local

# 2. First time only: apply schema + load all site content
npm run db:deploy
npm run db:seed

# 3. Start the site
npm run dev
```

- Site: http://localhost:3000
- Admin: http://localhost:3000/admin — sign in with `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`
  (defaults: `admin@northmark.local` / `change-me-northmark-2026` — **change these**).

## The cinematic layer

The site is directed, not just animated. Motion responds continuously to the
viewer instead of playing once and going still.

| Piece | What it does | Where |
|---|---|---|
| **Title sequence** | Ink curtain, wordmark rising out of its mask, hairline rule drawing, then the curtain lifts. Once per session. Server-rendered and CSS-driven so it is up before the first paint — no flash. | `TitleSequence.tsx`, gate script in `app/layout.tsx` |
| **Masked type** | Headlines split into per-word masks that rise line by line, like a title card. Masks are per word, so reflow can never break them. | `data-lines` → `EffectsProvider` |
| **Scrubbed dissolve** | Heroes recede — scale, lift, fade — continuously as you scroll past, driven by a live `--p` variable. | `data-scrub` |
| **Atmosphere** | Film grain, vignette, and a warm key light that drifts on its own and leans toward the pointer. | `Atmosphere.tsx` |
| **Counting figures** | Stats roll up when they enter frame and land on the exact copy. | `data-count` |
| **Velocity** | The marquee skews with scroll speed; layers parallax at their own rates. | `--vel`, `data-par` |
| **Cuts** | Navigation plays an ink wipe while the incoming page settles up underneath. | `(site)/template.tsx` |

**Timing is released, not guessed.** Scroll reveals wait for the curtain's own
`animationstart`, so the hero is caught mid-motion as the frame opens rather
than finishing behind it.

**Everything collapses gracefully.** Under `prefers-reduced-motion`, or with the
Appearance motion slider at 0, headings are never split, grain and key light are
removed, the curtain never appears, and the page renders as plain legible
content. Reveal-hidden styles are gated behind `html.js`, so search engines and
no-JS visitors always receive the full text.

## Brand, contact details & floating buttons

Everything below is managed in **Admin → Brand & contact** — no code changes needed.

- **Logo** — upload a PNG, SVG, JPEG or WebP (up to 512 KB). It replaces the text
  wordmark in the header and footer. Remove it to go back to the wordmark.
- **Browser icon (favicon)** — upload a square PNG, SVG or ICO. Without one the site
  generates an icon from the wordmark's initial on the current accent colour, so there
  is always a proper tab icon.
- **Contact details** — the new-projects, support and partnerships email addresses plus
  the phone number. These feed the contact page's three routes, the footer, and the
  privacy/terms pages at once.
- **Floating buttons** — a WhatsApp and a call button pinned bottom-right. Each has its
  own on/off switch, and "Show buttons on" chooses **mobile only** (default), **all
  screen sizes**, or **hidden**. On phones they sit side by side above the thumb as
  compact circles; on desktop they expand to show their label on hover.

Both images are stored in the database and served from `/api/brand/logo` and
`/api/brand/favicon` with a cache-busting version, so an upload appears immediately
without a redeploy.

## Going live with Supabase

1. Create a free project at supabase.com → Project Settings → Database → Connection string.
2. In `.env` (or your host's environment variables) set:
   - `DATABASE_URL` — the **Transaction pooler** string (port 6543) with `?pgbouncer=true&connection_limit=1`
   - `DIRECT_URL` — the **Session pooler / direct** string (port 5432)
3. `npm run db:deploy && npm run db:seed`
4. Deploy to Vercel (recommended): import the repo, add the env vars
   (`DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
   optional `RESEND_API_KEY`, `EMAIL_FROM`, `NEXT_PUBLIC_SITE_URL`).
5. Email: add a Resend API key and verify your sending domain (SPF + DKIM) so enquiry
   notifications reach the inbox. Without a key, enquiries are still stored and visible
   in the admin Inbox — nothing is lost.

## What's where

```
prisma/schema.prisma      # ~24 models — the full content inventory
prisma/seed.mjs           # loads every row of original site content + first admin
prisma/seed-data.json     # the transcribed content (also a content backup)
src/app/(site)/           # 7 public pages + legal, static, served from CDN
src/app/admin/            # 12-screen admin panel (dynamic, session-gated)
src/lib/content.ts        # cached DB readers — admin saves revalidate these tags
src/lib/actions/          # server actions: contact form, auth, admin CRUD
src/components/motion/    # the ported animation engine (reveals, tilt, cursor, orbs)
src/proxy.ts              # auth gate for /admin/*
scripts/dev-db.mjs        # embedded local PostgreSQL
```

## How publishing works

Public pages are pre-rendered and cached. When an editor saves in the admin panel, the
action writes to Postgres and calls `updateTag()` for that content family — the affected
pages regenerate on the next request. Visitors never wait on the database.

## Contact form protection

`name` 2–100 · valid email · `company` ≤120 · need ∈ 6 categories · `brief` 20–2000,
plus a hidden honeypot field, a <2.5s time-trap, and a 5/hour/IP rate limit. The enquiry
is stored **before** email is attempted, so an email outage can never lose a lead.

## Deliberate v1 scope

No rich-text editor (plain text), no draft preview (published toggle), no i18n, no blog
or careers pages (URL space reserved), drag-reorder via position numbers. Team photos are
a nullable field awaiting an upload pipeline.
