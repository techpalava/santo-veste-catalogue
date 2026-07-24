import { useState } from "react";
import { categories, type Category } from "@/lib/santo-veste-data";
import { requestCategory } from "@/lib/request-prefill";
import { ProductDetailSheet } from "./ProductDetailSheet";

function requestAndScroll(c: Category) {
  requestCategory(c);
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

function ProductCard({
  c,
  feature,
  onOpen,
}: {
  c: Category;
  feature?: boolean;
  onOpen: (c: Category) => void;
}) {
  return (
    <article
      onClick={() => onOpen(c)}
      className={`group flex cursor-pointer flex-col border-2 border-ink/15 bg-paper transition hover:-translate-y-1 hover:border-ink hover:shadow-[6px_6px_0_var(--ink)] ${
        feature ? "md:col-span-2" : ""
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={c.image}
          alt={c.name}
          className={`w-full object-cover transition duration-500 group-hover:scale-[1.03] ${
            feature ? "aspect-[16/10]" : "aspect-[4/5]"
          }`}
        />
        <span className="absolute left-3 top-3 bg-paper/95 px-2 py-1 font-display text-xs font-bold text-ink">
          {c.index}
        </span>
        {c.price && (
          <span className="absolute right-3 top-3 bg-ink px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-paper">
            {c.price.startsWith("Set") ? "Set price" : c.price}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5 md:p-6">
        <div>
          <h3 className="font-display text-2xl font-bold leading-tight text-ink">{c.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">{c.description}</p>
        </div>
        <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 border-t border-ink/10 pt-4 text-xs">
          <div className="col-span-2">
            <dt className="eyebrow text-ink/45">Fabrics</dt>
            <dd className="mt-1 text-ink/80">{c.fabrics}</dd>
          </div>
          <div className="col-span-2">
            <dt className="eyebrow text-ink/45">Features</dt>
            <dd className="mt-1 text-ink/80">{c.features}</dd>
          </div>
          {c.moq && (
            <div>
              <dt className="eyebrow text-ink/45">MOQ</dt>
              <dd className="mt-1 text-ink/80">{c.moq}</dd>
            </div>
          )}
          <div>
            <dt className="eyebrow text-ink/45">Sizes</dt>
            <dd className="mt-1 text-ink/80">{c.sizes}</dd>
          </div>
          {c.price && (
            <div className="col-span-2">
              <dt className="eyebrow text-ink/45">Base price</dt>
              <dd className="mt-1 text-ink/80">{c.price}</dd>
            </div>
          )}
        </dl>
        <div className="mt-2 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(c);
            }}
            className="inline-flex items-center gap-2 border-b border-ink/60 pb-1 text-xs font-semibold uppercase tracking-widest text-ink/70 transition hover:text-ink hover:border-ink"
          >
            View details
          </button>
          <a
            href={`#contact?category=${c.id}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              requestAndScroll(c);
            }}
            className="inline-flex items-center gap-2 border-b border-ink pb-1 text-xs font-semibold uppercase tracking-widest text-ink transition hover:gap-3 hover:text-ochre hover:border-ochre"
          >
            Request this →
          </a>
        </div>
      </div>
    </article>
  );
}

export function Catalogue() {
  const [active, setActive] = useState<Category | null>(null);
  const [open, setOpen] = useState(false);

  const openCategory = (c: Category) => {
    setActive(c);
    setOpen(true);
  };

  return (
    <section id="catalogue" className="sv-pattern border-b border-ink/15 bg-secondary">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-ink/50">02 — Product Categories</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">
              The catalogue.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink/60">
            Twelve categories, all offered ready-to-wear or fully custom.
            Prices are base prices — final quotes depend on fabric, print
            method and quantity.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <ProductCard key={c.id} c={c} feature={i === 4} onOpen={openCategory} />
          ))}
        </div>
      </div>
      <ProductDetailSheet
        category={active}
        open={open}
        onOpenChange={setOpen}
        onRequest={(c) => {
          setOpen(false);
          setTimeout(() => requestAndScroll(c), 150);
        }}
      />
    </section>
  );
}
