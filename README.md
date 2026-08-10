# Al Maha National Company — Corporate Website

Production-ready bilingual (English/Arabic) corporate website for
**Al Maha National Company for General Trading & Contracting**, built with
Next.js (App Router), React, TypeScript and Tailwind CSS.

---

## ⚠️ Before you start — please read

This codebase was written in a sandboxed environment **without internet
access**, so `npm install` and a live `npm run build` could not be executed
or verified there. The code follows correct, current Next.js 15 / React 19
App Router conventions throughout, but **you must run the install and build
steps yourself** (see below) before deploying, and fix anything your
toolchain flags — most likely minor dependency-version resolution, nothing
architectural.

Specific things worth double-checking on your machine:

1. `npm install` resolves cleanly (package.json pins modern major versions —
   adjust exact versions if npm resolves peer-dependency conflicts).
2. `npm run build` completes with no TypeScript errors.
3. `next/font/google` (Playfair Display, Inter, Noto Kufi Arabic) downloads
   successfully at build time — this requires internet access during build.
4. The Google Maps embed and SMTP email sending are inactive until you add
   the relevant environment variables (see `.env.example`) — this is
   intentional, not a bug.

---

## Tech Stack

- **Next.js 15** (App Router, Server Components)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS** (custom navy/gold corporate palette)
- **Nodemailer** for transactional form-notification emails
- Node.js runtime for API routes (`app/api/*`)

## Getting Started (Local Development)

```bash
# 1. Install dependencies
npm install

# 2. Copy environment variables and fill in real values
cp .env.example .env.local

# 3. Run the development server
npm run dev
```

Visit `http://localhost:3000` — you'll be redirected automatically to
`/en` (or `/ar` based on your browser's `Accept-Language` header).

## Production Build

```bash
npm run lint       # ESLint (next/core-web-vitals ruleset)
npm run typecheck   # tsc --noEmit
npm run build       # Production build
npm start           # Serve the production build locally on :3000
```

All three commands should complete without errors before deploying.

## Project Structure

```
app/
  [locale]/                  # All localized routes (en | ar)
    layout.tsx                # Root layout: <html>, fonts, header, footer
    page.tsx                  # Home
    about/                     ├─ 25 core pages total
    ceo-message/
    vision/
    mission/
    services/
      page.tsx                 # Services index
      [slug]/page.tsx           # Dynamic template → all 13 service pages
    projects/
    gallery/
    clients/
    licenses/
    careers/
    contact/
    quote/
    privacy-policy/
    terms-conditions/
    not-found.tsx
  api/
    contact/route.ts          # Contact form handler
    quote/route.ts             # Quote request handler (multipart + file)
    careers/route.ts           # Career application handler (multipart + file)
  sitemap.ts                  # Dynamic sitemap (all pages × both locales)
  robots.ts
  manifest.ts
  globals.css

components/
  layout/    Header, MobileMenu, Footer, Logo, LanguageSwitcher, WhatsAppButton
  sections/  Hero, PageHero, Breadcrumbs, ServiceCard/Grid, FAQ, CTA, etc.
  forms/     ContactForm, QuoteForm, CareerForm
  ui/        Button, Input, Select, Textarea, FileUpload, Container, etc.

data/
  company.ts      # Single source of truth: name, address, phone, email...
  navigation.ts    # Header/footer nav structure (bilingual)
  services.ts      # All 13 services — full bilingual content

lib/
  i18n.ts            # Locale helpers
  dictionary.ts       # Loads /locales/en.json or ar.json
  seo.ts               # Metadata builder (canonical, OG, hreflang)
  structuredData.ts     # JSON-LD builders (Organization, LocalBusiness, etc.)
  validation.ts          # Shared form validation (client + server)
  mailer.ts               # SMTP email sending (env-configurable)

locales/
  en.json, ar.json    # Shared UI strings (buttons, forms, footer, etc.)

public/
  brand/    # Official supplied logo + derived favicons/app icons/OG image
  images/
```

## How the 25 Pages Are Delivered

The brief's 25-page requirement is met as follows:

- **5 company pages**: Home, About, CEO Message, Vision, Mission — each its
  own file with unique bilingual content.
- **13 service pages**: Construction & Contracting, Building Construction,
  Infrastructure Projects, Aluminum Works, Steel & Metal Works, Scrap
  Trading, Recycling Services, Import & Export, Used Vehicle Spare Parts,
  Heavy Equipment Parts, Logistics & Transportation, Industrial Solutions,
  Warehouse & Storage — all rendered through **one** reusable template
  (`app/[locale]/services/[slug]/page.tsx`) driven by structured data in
  `data/services.ts`. This is intentional: it satisfies the "no duplicated
  hardcoded data" architecture requirement while giving every service page
  a genuine hero, overview, capabilities, industries served, process,
  why-choose-us, FAQ, related services and CTA — not a thin placeholder.
- **7 remaining pages**: Projects, Gallery, Clients & Partners, Licenses &
  Certifications, Careers, Contact, Request a Quote.

That totals 25 distinct routes × 2 languages = 50 localized pages, plus the
Privacy Policy and Terms & Conditions pages linked from the footer.

## Production Polish Notes (this revision)

This revision replaced every visual placeholder across the site with real
generated imagery, fixed a logo-legibility issue, and rewrote the Clients
& Partners page copy. Specifics:

- **Imagery**: `scripts/generate-images.py` produces a full set of
  brand-consistent navy/gold line-art illustrations (one per service
  category, plus Home hero, About, CEO monogram, Projects and Gallery
  sets) into `public/images/`. These are original generated graphics, not
  stock photography — nothing on the site claims to depict a real
  completed Al Maha project. Every image is wired in via `next/image`
  with proper `sizes`, `alt` text, and `fill`/lazy-loading behavior.
  Re-run the script (`python3 scripts/generate-images.py`, requires
  Pillow) if you want to regenerate or restyle this set — or simply
  replace any file under `public/images/` with real photography at the
  same path once available; every reference is centralized in
  `data/services.ts` (`heroImage` field) or the relevant page file.
- **CEO photo**: intentionally a monogram medallion, not a stock photo
  presented as Mohammad Hussain — replace
  `public/images/general/ceo-monogram.jpg` with his real portrait when
  available; the `alt` text is already correctly written for that swap.
- **Logo sizing fixed**: the approved logo is a stacked square lockup
  (icon + "AL MAHA" + subtitle). At the previous 56px header height the
  wordmark was nearly illegible. `components/layout/Logo.tsx` now renders
  at 76/92/140px (mobile nav & footer / header / large contexts) — larger
  display size only, the logo file itself is untouched.
- **Clients & Partners page**: removed "Coming Soon" wording per
  correction request; replaced with a "Sectors We Serve" grid and the
  neutral authorized-disclosure message.
- **Gallery**: rebuilt with a real accessible lightbox (Escape to close,
  arrow-key navigation that respects RTL reading direction, focus-visible
  states).
- **Arabic heading font**: fixed a bug where Arabic headings silently
  fell back to a system font because the Latin serif (Playfair Display)
  has no Arabic glyphs — `font-serif` now resolves to the Arabic display
  font under `dir="rtl"`.

## Content You Should Replace Before Launch

The brief explicitly asked that no invented data (client names, awards,
certifications, stats) be included. A few things are therefore
intentionally placeholder-architected and should be swapped for real
content:

- **Photography** — every image slot currently renders a brand-colored
  `<ImagePlaceholder />` (see `components/ui/ImagePlaceholder.tsx`) instead
  of stock photography, so nothing implies a real completed project that
  doesn't exist. Replace these with `next/image` calls to real photography
  as it becomes available — each usage is a single, obvious call site.
- **Projects page** — sample project names/locations are clearly
  illustrative; replace with real project data once available.
- **Clients & Partners page** — intentionally empty placeholder slots;
  populate only with clients/partners who have given permission to be
  named.
- **Licenses & Certifications page** — structured to display your actual
  commercial license number and certifications; add them once supplied.

## Environment Variables

See `.env.example` for the full list with explanations. At minimum for a
working contact/quote/careers flow in production, set:

```
NEXT_PUBLIC_SITE_URL=
SMTP_HOST=
SMTP_USER=
SMTP_PASSWORD=
NOTIFY_TO=
```

Without SMTP configured, form submissions are logged to the server console
instead of emailed (safe default for local development).

## SEO Notes

- Every page exports `generateMetadata` with a unique title, description,
  canonical URL and `hreflang` alternates (`en`/`ar`/`x-default`) via
  `lib/seo.ts`.
- `app/sitemap.ts` generates a complete sitemap across both locales.
- `app/robots.ts` points to the sitemap and disallows `/api/`.
- JSON-LD is included for Organization (site-wide), LocalBusiness (home),
  Service (each service page) and BreadcrumbList (service + contact pages).
- No fabricated ratings, review counts or statistics are included anywhere.

## Deployment

This is a standard Next.js App Router project and deploys cleanly to
Vercel, or any Node.js host that supports Next.js (Node 18.18+ required).

**Vercel:**
1. Push this repository to GitHub/GitLab/Bitbucket.
2. Import the repo in Vercel.
3. Add the environment variables from `.env.example` in Project Settings.
4. Deploy — Vercel runs `npm run build` automatically.

**Self-hosted / Node server:**
```bash
npm install
npm run build
npm start
```
Put a reverse proxy (nginx, Caddy) in front for TLS and put the required
environment variables in your process manager's environment.

## Manual QA Checklist Before Go-Live

- [ ] `npm run lint` passes
- [ ] `npm run typecheck` passes
- [ ] `npm run build` completes with no errors
- [ ] Every route loads in both `/en/...` and `/ar/...`
- [ ] Arabic pages render fully RTL with no mirrored-icon or overflow bugs
- [ ] Language switcher lands on the equivalent page in the other language
- [ ] Mobile menu opens/closes correctly and all links work
- [ ] Contact, Quote and Careers forms validate, submit, and show
      success/error states correctly
- [ ] WhatsApp floating button opens the correct number with a pre-filled
      message in the active language
- [ ] Logo displays correctly and at proper proportions in header, footer,
      and mobile nav
- [ ] `sitemap.xml`, `robots.txt` and `manifest.webmanifest` all resolve
