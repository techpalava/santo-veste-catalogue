
# Santo Veste — Catalogue Website (UI only)

A polished, mobile-first one-page site built entirely from the attached catalogue. No backend, no auth, no cart, no real form submissions — pure presentation.

## Content source (from the PDF)

- Brand: **Santo Veste** — ready-to-wear and custom-fitted unisex clothing; faith-meets-fashion positioning; premium materials, tailoring, comfort.
- 11 product categories with descriptions, fabrics, features, MOQ and base prices verbatim from the catalogue (round-neck tees, layered tees, polos, sweatshirts, hoodies & joggers, jerseys, uniforms, medical scrubs, mandarin/collared shirts, jackets, shorts).
- Customization: printing (screen, DTF, DTG, sublimation), embroidery/monogramming, logo/slogan/team-name branding, buttons/zippers/collars, branded packaging for bulk.
- Order process: 5 steps as listed in the catalogue.
- Contact: catalogue's contact page wasn't in the parsed text — I'll show a clean contact block with placeholder handles (email, phone, WhatsApp, Instagram) clearly marked so you can swap in real details in one edit.

## Design direction

Bold editorial black-and-white base — big serif display headings, small uppercase eyebrows, generous whitespace, thin dividers, catalogue-style page numbers and section labels. Accent color pulled from the garment palette (deep olive + a warm ochre) used sparingly on rules, hover states, and CTA. Real catalogue imagery used throughout; garments carry the color.

## Page structure (single route `/`)

1. **Top nav** — thin, sticky, wordmark left, anchor links right (About / Catalogue / Customization / Process / Contact), mobile sheet.
2. **Hero** — full-bleed catalogue image, wordmark, tagline ("Faith. Tailoring. Ready-to-wear."), short value prop, two CTAs (Explore catalogue / Request a quote — both scroll anchors).
3. **About** — catalogue's About + "How we're unique" condensed into 5 numbered principles + expertise strip.
4. **Product catalogue** — 11 category cards in an editorial magazine grid (asymmetric, not a uniform 3-col). Each card: hero image, category name, short description, fabrics, features, MOQ, base price, sizes. "Request this" button scrolls to contact with the category prefilled in the form UI (client-side only).
5. **Customization services** — 6 tiles (printing, DTF/DTG/sublimation, embroidery, branding, hardware, branded packaging) with icon + short blurb.
6. **Order process** — 5 numbered steps as a horizontal editorial timeline on desktop, vertical on mobile.
7. **Contact** — split layout: contact details block (email / phone / WhatsApp / Instagram placeholders) + non-functional inquiry form UI (name, email, phone, category select prefilled from step 4, quantity, message). Submit shows a toast "Thanks — this is a demo form" and resets.
8. **Footer** — wordmark, tagline, small print, back-to-top.

## Assets

- Copy the relevant catalogue page images from `parsed-documents://.../images/` into `src/assets/catalogue/` (hero, one per category, process/customization support shots). Reference via ES imports so Vite fingerprints them.
- No generated stock images — catalogue photography only.

## Technical

- New file: `src/routes/index.tsx` replaces the placeholder with the composed page.
- Section components under `src/components/site/` (Hero, About, Catalogue, ProductCard, Customization, Process, Contact, Footer, Nav).
- Product data in `src/lib/santo-veste-data.ts` (categories array + services + steps).
- Design tokens: extend `src/styles.css` with an editorial serif + clean sans font pair (loaded via `<link>` in `__root.tsx`), plus `--accent-olive` and `--accent-ochre` semantic tokens mapped through `@theme inline`.
- SEO: unique `head()` on `/` — title "Santo Veste — Custom & Ready-to-Wear Apparel", description from the About copy, og/twitter tags with hero image URL.
- Form is `useState` only; submit handler calls `toast()` and resets.
- Fully responsive: single column mobile → editorial grid ≥ md.

## Explicitly out of scope

Auth, payments, database, real email/WhatsApp sending, cart/checkout, admin, image uploads.
