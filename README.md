# Supreme One Software — Website + Admin Panel

The Supreme One Software marketing site and admin panel, built on Next.js. Structure and copy
follow the **website content guide** (October 2026): a mega-menu header, the home page, one
product template (11 products + 2 services), one industry template (10 industries), and the
Customers, Pricing, About, Careers, Partners, FAQ, Contact, Book a Demo and legal pages.

## Where content lives

| Content | Where to edit it |
|---|---|
| Product, service and industry pages; home page, About and platform copy | `src/content/*.ts` (typed; live on the next deploy) |
| Proof-strip figures, testimonials, client logos | Admin → Site blocks |
| Case studies | Admin → Customers |
| Pricing plans (platform + custom engineering) | Admin → Pricing |
| FAQ answers (FAQ, Pricing and Contact pages) | Admin → FAQs |
| Team, milestones, registered office | Admin → About page |
| Contact details, CIN/GST, business hours, socials, logo, floating buttons | Admin → Brand & contact |

Anything the guide marks as still to be confirmed (testimonials, pricing, measured results,
the support-hours answer) stays **hidden until someone adds or publishes a real entry** — the
page sections simply don't render while empty. Benchmark claims the guide labels
"illustrative" are kept in `src/content/products.ts` with `illustrative: true` and not shown.
Product screenshots: add `src: "/products/<slug>/1.webp"` to a product's `shots` once the
designer's images are in `public/`; the gallery appears when all three are present.

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
| **Parallax** | Layers drift at their own rates as you scroll. | `data-par` |
| **Hero threads** | The phone / inbox / browser mockups play their conversation in, message by message. | `.chat` in `globals.css`, `DemoVisual.tsx` |
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
- **Contact details** — the sales, support and partnerships email addresses, the phone
  number and business hours. These feed the contact page, the footer, the partners page
  and the legal pages at once.
- **Company details & socials** — CIN, GST number and LinkedIn / Instagram / Facebook /
  YouTube links. Each appears in the footer (and CIN/GST on Contact and About) once filled in.
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
3. `npm run db:deploy && npm run db:seed` — run these **before** deploying new code: the
   build reads the database, and new code expects the new columns. `db:seed` replaces the
   content tables (FAQs, proof strip, pricing, case studies, team, testimonials, SEO); it
   keeps users, enquiries and Brand & contact settings.
4. Deploy to Vercel (recommended): import the repo, add the env vars
   (`DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`,
   `NEXT_PUBLIC_SITE_URL`, optional `RESEND_API_KEY`, `EMAIL_FROM`, `NEXT_PUBLIC_GA_ID`,
   `NEXT_PUBLIC_CHAT_WIDGET_SRC`). Cached DB reads outlive deployments — after a re-seed,
   bump `CACHE_VERSION` in `src/lib/content.ts`.
5. Email: add a Resend API key and verify your sending domain (SPF + DKIM) so enquiry
   notifications reach the inbox. Without a key, enquiries are still stored and visible
   in the admin Inbox — nothing is lost.

## What's where

```
prisma/schema.prisma      # content + operational models (some pre-revamp tables now unused)
prisma/seed.mjs           # loads the DB-managed content + first admin
prisma/seed-data.json     # that content (also a content backup)
src/content/              # product, service, industry and site copy — the templates' data
src/app/(site)/           # public pages; [slug] routes for products, services, industries
src/components/site/      # OfferingPage + IndustryPage templates, header, mockups, form
src/app/admin/            # admin panel (dynamic, session-gated)
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

`name` 2–100 · valid email · optional `phone`, `company` ≤120 and message ≤2000 ·
interest ∈ the products/services list, plus a hidden honeypot field, a <2.5s time-trap,
and a 5/hour/IP rate limit. Each enquiry records the page the visitor came from (shown in
the Inbox and the CSV export). The enquiry is stored **before** email is attempted, so an
email outage can never lose a lead.

## Analytics & chat widget

Both are off until configured. `NEXT_PUBLIC_GA_ID` loads Google Analytics 4 — page views,
plus `book_demo_click` (every Book a Demo link, with the page and its location) and
`book_demo_submit` / `enquiry_submit` events. `NEXT_PUBLIC_CHAT_WIDGET_SRC` loads the live
chat widget script. The privacy and cookie policies describe analytics only when it's on.

## Deliberate v1 scope

No rich-text editor (plain text), no draft preview (published toggle), no i18n, no blog,
drag-reorder via position numbers. Team photos are a URL field awaiting an upload pipeline.
No cookie-consent banner yet — add one before switching on analytics if you need consent.
