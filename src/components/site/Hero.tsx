import hero from "@/assets/catalogue/hero.jpg";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-ink/10 bg-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-10 md:grid-cols-[1.05fr_1fr] md:gap-14 md:px-8 md:pb-24 md:pt-16">
        <div className="flex flex-col justify-between gap-10">
          <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/50">
            <span className="inline-block h-px w-10 bg-ink/40" />
            Products Catalogue · 2026
          </div>
          <div>
            <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-ink sm:text-6xl md:text-[5.5rem]">
              Faith,<br />
              tailored to<br />
              <span className="italic text-ochre">every thread.</span>
            </h1>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink/70">
              Santo Veste crafts ready-to-wear and custom-fitted unisex clothing —
              premium materials, exceptional tailoring, garments that let you wear
              your convictions boldly.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#catalogue"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-widest text-paper transition hover:bg-ink/85"
              >
                Explore catalogue <ArrowRight className="size-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-ink transition hover:bg-ink hover:text-paper"
              >
                Request a quote
              </a>
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-6 border-t border-ink/10 pt-8 text-ink">
            <div>
              <dt className="eyebrow text-ink/50">MOQ</dt>
              <dd className="mt-2 font-display text-2xl font-bold">30 pcs</dd>
            </div>
            <div>
              <dt className="eyebrow text-ink/50">Categories</dt>
              <dd className="mt-2 font-display text-2xl font-bold">12</dd>
            </div>
            <div>
              <dt className="eyebrow text-ink/50">Fit</dt>
              <dd className="mt-2 font-display text-2xl font-bold">Unisex</dd>
            </div>
          </dl>
        </div>
        <div className="relative">
          <div className="absolute -left-4 -top-4 hidden h-full w-full border border-ochre/60 md:block" />
          <img
            src={hero}
            alt="Santo Veste hoodies in blue, maroon and yellow on a rack"
            className="relative aspect-[4/5] w-full object-cover md:aspect-auto md:h-full"
          />
          <span className="absolute bottom-4 right-4 rounded-sm bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-paper">
            Ready · Custom · Bulk
          </span>
        </div>
      </div>
    </section>
  );
}
