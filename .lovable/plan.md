# Standout Feature Roadmap — Santo Veste Catalogue

Based on the current one-page catalogue (hero, about, 12-category grid, detail sheet, contact form with PDF download), here are the features that would most clearly differentiate the experience and drive real inquiries.

## 1. Quick wins — ship fast, visible impact

### A. Live quote estimator on every category card
Add a small calculator inside the product sheet that lets visitors enter quantity and pick a print/embroidery method, then shows an estimated price range instantly. This turns browsing into action and reduces back-and-forth emails.

- Inputs: quantity, fabric tier (standard / premium), print method (screen / DTF / embroidery / none).
- Output: estimated per-unit and total price, with a disclaimer that final pricing requires confirmation.
- Tech: extend `Category` type with pricing rules; compute client-side in the sheet.

### B. One-tap WhatsApp inquiry
Replace the demo-form-only flow with a WhatsApp button that opens a pre-filled message containing the selected category, MOQ, fabrics and the user’s brief. This matches how many Nigerian customers actually prefer to close orders.

- Keep the existing contact form for email inquiries.
- Add a secondary "Chat on WhatsApp" action that uses `https://wa.me/` with encoded text.

### C. Category search and filters
A sticky filter bar above the catalogue lets users narrow by MOQ, price band, fabric type or customization option. With 12 categories this already saves time; it also signals a professional, searchable catalogue.

- Filters: price range, MOQ threshold, fabric keyword, customization type.
- Search: category name and feature keywords.

## 2. Differentiators — medium effort, high business value

### D. Saved favourites / mood board
Let visitors "heart" categories and build a shortlist. The shortlist persists in `localStorage`, can be shared via a URL hash, and can be sent as one combined inquiry. This is especially useful for corporate buyers comparing several products.

- Heart toggle on cards and sheet.
- Floating summary badge showing saved count.
- Prefill contact form with all saved categories when requesting a quote.

### E. Multi-image lookbook per category
Upgrade each category from a single image to a small gallery (2–4 shots: front, detail, fabric close-up, worn context). This is the single biggest visual upgrade for a fashion catalogue and justifies the "premium" positioning.

- Add `gallery: ProductGalleryImage[]` to the `Category` type.
- Use Embla carousel (already in `package.json`) inside the product sheet.

### F. Interactive size guide
Add a size tab in the product sheet with a measurement diagram and a simple calculator: user enters chest / waist / height and gets a recommended size. Reduces fit anxiety and returns.

- Static size chart + simple recommendation logic.
- Optional: visual SVG body diagram with measurement points.

## 3. Premium features — bigger builds

### G. Real inquiry backend with status tracking
Move the contact form from demo to production by storing inquiries in Lovable Cloud (Supabase). Each submission gets a reference number; customers can return to a `/track/:id` page to see quote status (received → reviewing → quoted → in production → delivered).

- Requires Lovable Cloud enabled.
- Admin view optional for Santo Veste staff to update status.

### H. Branded shareable quote page
After form submission, generate a public or password-lite quote page (`/quote/:id`) that shows the selected items, specs and estimated pricing in a clean, shareable layout. Buyers can forward it to procurement teams or finance.

- Builds on (G) but can also be generated from the existing PDF flow.

## Recommended first slice

If you want one release that stands out immediately, combine **A (quote estimator) + B (WhatsApp) + D (favourites)**. These three together make the catalogue feel like a working sales tool rather than a brochure, without requiring a backend.

## Open questions before building

1. Do you want to keep this as a purely frontend/demo site, or should we connect real inquiry storage and notifications?
2. Do you have additional product photography for a lookbook gallery, or should we work with the existing 12 images?
3. Which channel matters most for closing leads: email, WhatsApp, or both equally?
