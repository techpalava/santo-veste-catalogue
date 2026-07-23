## Product detail drawer

Add a click-to-open detail view for each catalogue card that surfaces the full spec in a scannable layout, without leaving the page.

### Behaviour

- Clicking anywhere on a `ProductCard` (image, title, or a new "View details" affordance) opens the drawer for that category. The existing "Request this →" link keeps its current behaviour (scroll to contact + prefill) and stops propagation so it doesn't also open the drawer.
- Drawer opens as a right-side sheet on `md+` screens and as a bottom sheet on mobile, using shadcn's `Sheet` primitive (already available in the project). Closes via overlay click, ESC, or an explicit close button.
- Only one drawer open at a time; state lives in `Catalogue.tsx` (`const [active, setActive] = useState<Category | null>(null)`).
- "Request this" inside the drawer closes the drawer, prefills the contact category, and smooth-scrolls to `#contact` (reuses the existing handler).

### Layout inside the drawer

Editorial, matches the current card styling (serif display, uppercase eyebrows, thin dividers on `border-ink/10`).

```text
┌─────────────────────────────────────┐
│  [hero image, 4/5 or 16/10]         │
│  index chip · price chip overlay    │
├─────────────────────────────────────┤
│  EYEBROW: Category 0X               │
│  H2 Name (font-display)             │
│  Full description paragraph         │
├─────────────────────────────────────┤
│  Fabrics                            │
│  ─ value                            │
│  Features                           │
│  ─ value (rendered as bullet list   │
│           by splitting on ", ")     │
│  MOQ            Sizes               │
│  ─ value        ─ value             │
│  Base price                         │
│  ─ value                            │
├─────────────────────────────────────┤
│  [ Request this → ]  [ Close ]      │
└─────────────────────────────────────┘
```

Features string is split on commas into a compact bulleted list so it scans faster than the current inline text. Missing fields (`moq`, `price`) are omitted, matching current card logic.

### Files touched

- `src/components/site/Catalogue.tsx` — add drawer state, make card clickable, render `<ProductDetailSheet>`.
- `src/components/site/ProductDetailSheet.tsx` — new component, receives `category` + `open` + `onOpenChange` + `onRequest`.
- No changes to data, routing, styles, or contact logic.

### Out of scope

Image gallery, related products, deep-linking the drawer via URL, and any data-model changes.
