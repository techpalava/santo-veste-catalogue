import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import type { Category } from "@/lib/santo-veste-data";

type Props = {
  category: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequest: (c: Category) => void;
};

export function ProductDetailSheet({ category, open, onOpenChange, onRequest }: Props) {
  const c = category;
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-l-2 border-ink bg-paper p-0 sm:max-w-lg"
      >
        {c && (
          <div className="flex flex-col">
            <div className="relative">
              <img src={c.image} alt={c.name} className="aspect-[4/5] w-full object-cover" />
              <span className="absolute left-4 top-4 bg-paper/95 px-2 py-1 font-display text-xs font-bold text-ink">
                {c.index}
              </span>
              {c.price && (
                <span className="absolute right-4 top-4 bg-ink px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-paper">
                  {c.price.startsWith("Set") ? "Set price" : c.price}
                </span>
              )}
            </div>

            <SheetHeader className="space-y-3 px-6 pt-6 text-left">
              <p className="eyebrow text-ink/50">Category {c.index}</p>
              <SheetTitle className="font-display text-3xl font-extrabold leading-tight text-ink">
                {c.name}
              </SheetTitle>
              <SheetDescription className="text-sm leading-relaxed text-ink/70">
                {c.description}
              </SheetDescription>
            </SheetHeader>

            <div className="space-y-5 px-6 py-6">
              <Row label="Fabrics" value={c.fabrics} />
              <div>
                <p className="eyebrow text-ink/45">Features</p>
                <ul className="mt-2 space-y-1.5 text-sm text-ink/80">
                  {c.features.split(",").map((f, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-ochre">—</span>
                      <span>{f.trim()}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-ink/10 pt-5">
                {c.moq && <Row label="MOQ" value={c.moq} />}
                <Row label="Sizes" value={c.sizes} />
              </div>
              {c.price && (
                <div className="border-t border-ink/10 pt-5">
                  <Row label="Base price" value={c.price} />
                </div>
              )}
            </div>

            <div className="sticky bottom-0 flex gap-3 border-t border-ink/10 bg-paper px-6 py-4">
              <button
                onClick={() => onRequest(c)}
                className="flex-1 bg-ink px-4 py-3 text-xs font-semibold uppercase tracking-widest text-paper transition hover:bg-ochre"
              >
                Request this →
              </button>
              <button
                onClick={() => onOpenChange(false)}
                className="border border-ink/20 px-4 py-3 text-xs font-semibold uppercase tracking-widest text-ink transition hover:border-ink"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="eyebrow text-ink/45">{label}</p>
      <p className="mt-1 text-sm text-ink/80">{value}</p>
    </div>
  );
}
