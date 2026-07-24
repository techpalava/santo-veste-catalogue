import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import type { Category, ProductGalleryImage } from "@/lib/santo-veste-data";

type Props = {
  category: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequest: (c: Category) => void;
};

function buildGallery(c: Category): ProductGalleryImage[] {
  if (c.gallery?.length) return c.gallery;

  return [
    {
      src: c.image,
      alt: `${c.name} full product view`,
      label: "Full view",
    },
    {
      src: c.image,
      alt: `${c.name} upper garment and construction detail`,
      label: "Detail",
      objectPosition: "50% 28%",
      scale: 1.4,
    },
    {
      src: c.image,
      alt: `${c.name} fit and silhouette detail`,
      label: "Fit",
      objectPosition: "50% 72%",
      scale: 1.3,
    },
  ];
}

export function ProductDetailSheet({ category, open, onOpenChange, onRequest }: Props) {
  const c = category;
  const [activeIndex, setActiveIndex] = useState(0);
  const gallery = c ? buildGallery(c) : [];

  useEffect(() => {
    setActiveIndex(0);
  }, [c?.id]);

  const activeImage = gallery[activeIndex] ?? gallery[0];

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + gallery.length) % gallery.length);
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % gallery.length);
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full overflow-y-auto border-l-2 border-ink bg-paper p-0 sm:max-w-lg"
      >
        {c && activeImage && (
          <div className="flex flex-col">
            <div className="relative overflow-hidden bg-secondary">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="h-full w-full object-cover transition-transform duration-500"
                  style={{
                    objectPosition: activeImage.objectPosition ?? "50% 50%",
                    transform: `scale(${activeImage.scale ?? 1})`,
                  }}
                />
              </div>
              <span className="absolute left-4 top-4 bg-paper/95 px-2 py-1 font-display text-xs font-bold text-ink">
                {c.index}
              </span>
              {c.price && (
                <span className="absolute right-4 top-4 bg-ink px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-paper">
                  {c.price.startsWith("Set") ? "Set price" : c.price}
                </span>
              )}
              <div className="absolute inset-x-4 bottom-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={showPrevious}
                  className="grid size-10 place-items-center border border-paper/30 bg-ink/90 text-paper transition hover:bg-ochre"
                  aria-label="Show previous product image"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <span className="bg-ink/90 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-paper">
                  {activeIndex + 1} / {gallery.length} · {activeImage.label ?? "View"}
                </span>
                <button
                  type="button"
                  onClick={showNext}
                  className="grid size-10 place-items-center border border-paper/30 bg-ink/90 text-paper transition hover:bg-ochre"
                  aria-label="Show next product image"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 border-b border-ink/10 bg-paper p-3">
              {gallery.map((image, index) => (
                <button
                  key={`${image.label ?? "view"}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show ${image.label ?? `image ${index + 1}`}`}
                  aria-pressed={activeIndex === index}
                  className={`relative aspect-[4/3] overflow-hidden border-2 transition ${
                    activeIndex === index
                      ? "border-ochre"
                      : "border-transparent opacity-65 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.src}
                    alt=""
                    className="h-full w-full object-cover"
                    style={{
                      objectPosition: image.objectPosition ?? "50% 50%",
                      transform: `scale(${image.scale ?? 1})`,
                    }}
                  />
                  <span className="absolute inset-x-0 bottom-0 bg-ink/85 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-paper">
                    {image.label ?? `View ${index + 1}`}
                  </span>
                </button>
              ))}
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
