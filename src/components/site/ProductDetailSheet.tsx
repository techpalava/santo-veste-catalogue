import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, MessageCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import type { Category, ProductGalleryImage } from "@/lib/santo-veste-data";

const WHATSAPP_NUMBER = "2348102205566";

type Props = {
  category: Category | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRequest: (c: Category) => void;
  isFavourite: boolean;
  onToggleFavourite: (id: string) => void;
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

function parseMoq(moq?: string): number {
  if (!moq) return 30;
  const match = moq.match(/(\d+)/);
  return match ? Math.max(1, parseInt(match[1], 10)) : 30;
}

function formatNgn(n: number): string {
  return `NGN ${n.toLocaleString("en-NG")}`;
}

export function ProductDetailSheet({
  category,
  open,
  onOpenChange,
  onRequest,
  isFavourite,
  onToggleFavourite,
}: Props) {
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

  function openWhatsApp() {
    if (!c) return;
    const text = `Hello Santo Veste, I'm interested in ${c.name}${c.moq ? ` (MOQ: ${c.moq})` : ""}. Please send me a quote.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
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
              <div className="flex items-start justify-between gap-4">
                <SheetTitle className="font-display text-3xl font-extrabold leading-tight text-ink">
                  {c.name}
                </SheetTitle>
                <button
                  type="button"
                  onClick={() => onToggleFavourite(c.id)}
                  aria-label={isFavourite ? "Remove from saved" : "Save for later"}
                  aria-pressed={isFavourite}
                  className={`grid size-10 shrink-0 place-items-center border-2 transition ${
                    isFavourite
                      ? "border-ochre bg-ochre text-paper"
                      : "border-ink/15 text-ink/60 hover:border-ink hover:text-ink"
                  }`}
                >
                  <Heart className={`size-5 ${isFavourite ? "fill-current" : ""}`} />
                </button>
              </div>
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

              {c.pricing && <QuoteEstimator category={c} />}
            </div>

            <div className="sticky bottom-0 flex flex-col gap-2 border-t border-ink/10 bg-paper px-6 py-4">
              <div className="flex gap-3">
                <button
                  onClick={() => onRequest(c)}
                  className="flex-1 bg-ink px-4 py-3 text-xs font-semibold uppercase tracking-widest text-paper transition hover:bg-ochre"
                >
                  Request this →
                </button>
                <button
                  onClick={openWhatsApp}
                  className="inline-flex items-center justify-center gap-2 border border-ink px-4 py-3 text-xs font-semibold uppercase tracking-widest text-ink transition hover:bg-ink hover:text-paper"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </button>
              </div>
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

function QuoteEstimator({ category }: { category: Category }) {
  const pricing = category.pricing;
  const [quantity, setQuantity] = useState(parseMoq(category.moq));
  const [tierId, setTierId] = useState(pricing?.tiers[0]?.id ?? "standard");
  const [methodId, setMethodId] = useState(pricing?.methods[0]?.id ?? "none");

  const estimate = useMemo(() => {
    if (!pricing) return null;
    const tier = pricing.tiers.find((t) => t.id === tierId);
    const method = pricing.methods.find((m) => m.id === methodId);
    const unitBase = pricing.baseUnit * (tier?.multiplier ?? 1);
    const unitAddOn = method?.addOn ?? 0;
    let unit = unitBase + unitAddOn;

    const discount = pricing.discounts
      .filter((d) => quantity >= d.threshold)
      .reduce((max, d) => Math.max(max, d.rate), 0);
    unit *= 1 - discount;

    return { unit, total: unit * quantity, discount };
  }, [pricing, tierId, methodId, quantity]);

  if (!pricing || !estimate) return null;

  return (
    <div className="border-2 border-ink/10 bg-secondary p-4">
      <p className="eyebrow text-ink/50">Instant estimate</p>
      <p className="mt-1 text-[11px] leading-relaxed text-ink/50">
        Indicative only — final quote depends on artwork, deadlines and availability.
      </p>

      <div className="mt-4 grid gap-3">
        <label className="grid gap-1.5">
          <span className="eyebrow text-ink/60">Quantity</span>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 0))}
            className="h-10 border border-ink/20 bg-paper px-3 text-sm text-ink focus:border-ink focus:outline-none"
          />
        </label>
        <label className="grid gap-1.5">
          <span className="eyebrow text-ink/60">Fabric tier</span>
          <select
            value={tierId}
            onChange={(e) => setTierId(e.target.value)}
            className="h-10 border border-ink/20 bg-paper px-3 text-sm text-ink focus:border-ink focus:outline-none"
          >
            {pricing.tiers.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-1.5">
          <span className="eyebrow text-ink/60">Decoration</span>
          <select
            value={methodId}
            onChange={(e) => setMethodId(e.target.value)}
            className="h-10 border border-ink/20 bg-paper px-3 text-sm text-ink focus:border-ink focus:outline-none"
          >
            {pricing.methods.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-5 border-t border-ink/10 pt-4">
        <div className="flex items-baseline justify-between">
          <span className="eyebrow text-ink/50">Estimated unit</span>
          <span className="font-display text-lg font-bold text-ink">
            {formatNgn(Math.round(estimate.unit))}
          </span>
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <span className="eyebrow text-ink/50">Estimated total</span>
          <span className="font-display text-2xl font-bold text-ochre">
            {formatNgn(Math.round(estimate.total))}
          </span>
        </div>
        {estimate.discount > 0 && (
          <p className="mt-2 text-right text-[11px] text-ink/50">
            Includes {Math.round(estimate.discount * 100)}% bulk discount
          </p>
        )}
      </div>
    </div>
  );
}
