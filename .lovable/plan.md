## Prefill contact form from "Request this"

Extend the existing "Request this" flow so it also fills the Quantity, Brief message, and (as read-only reference) the selected category's MOQ / fabrics / base price — not just the category dropdown.

### Approach

Replace the current DOM-poke prefill (`document.getElementById("category-select").value = id`) with a shared, typed store. A tiny module-scope event bus in `src/lib/request-prefill.ts` exposes:

- `requestCategory(c: Category)` — called by `Catalogue.tsx` and `ProductDetailSheet.tsx`.
- `subscribeRequest(fn)` — used by `Contact.tsx` to hydrate the form.

Handlers in `Catalogue.tsx` / drawer switch from `prefillAndScroll(id)` to `requestCategory(c)` + smooth-scroll to `#contact`. The DOM lookup goes away.

### What gets prefilled in `Contact.tsx`

On subscription callback with a `Category`:

- **Category select** → `c.id` (unchanged behaviour).
- **Quantity input** → parsed from `c.moq` (e.g. `"30 pieces"` → `"30 pieces"`); empty if no MOQ.
- **Brief textarea** → templated, editable string:

  ```
  Hi — I'd like a quote for {c.name} (min. {c.moq}).

  Fabrics of interest: {c.fabrics}
  Options: {c.features}
  Base price reference: {c.price ?? "on request"}

  My details:
  - Quantity:
  - Sizes needed:
  - Print / embroidery:
  - Deadline:
  ```

  Missing lines (no MOQ / no price) are omitted so the message stays clean.

- **Reference summary chip** rendered above the form fields when a prefill is active: a small dismissible block showing `Name · MOQ · Base price · Fabrics` so the user sees the spec they requested without hunting through the brief. Dismissing it clears the chip only; form values stay put.

Form state moves to controlled inputs (`useState` for name/email/phone/quantity/category/message + `selected: Category | null`) so the subscription can update them and `reset()` still works on submit.

### Files touched

- `src/lib/request-prefill.ts` — new tiny pub/sub module (no deps).
- `src/components/site/Catalogue.tsx` — swap `prefillAndScroll` for `requestCategory` + scroll; drop the DOM id lookup.
- `src/components/site/ProductDetailSheet.tsx` — `onRequest` uses the new bus.
- `src/components/site/Contact.tsx` — controlled inputs, `useEffect` subscription, reference chip, template builder.

### Out of scope

Persistence across reloads, multi-category requests, backend submission, and any change to the demo toast behaviour.
