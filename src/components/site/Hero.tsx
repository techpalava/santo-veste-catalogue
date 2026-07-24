import hero from "@/assets/catalogue/hero.jpg";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "./BrandMark";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-paper/15 bg-ink text-paper">
      <div className="sv-pattern absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-12 md:grid-cols-[1.02fr_0.98fr] md:gap-16 md:px-8 md:pb-24 md:pt-20">
        <div className="flex flex-col justify-between gap-12">
          <div className="flex items-center gap-4">
            <BrandMark inverse />
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-paper/55">
              Products Catalogue · 2026
            </span>
          </div>
          <div>
            <p className="eyebrow mb-5 text-ochre">Ready-to-wear · Custom · Bulk</p>
            <h1 className="font-display text-5xl font-bold leading-[0.88] text-paper sm:text-6xl md:text-[5.7rem]">
              Faith.<br />
              Tailored into<br />
              <span className="text-ochre">Every thread.</span>
            </h1>
            <p className="mt-8 max-w-lg text-base leading-relaxed text-paper/68">
              Premium ready-to-wear and custom-fitted unisex clothing for
              individuals, teams and organizations—designed with conviction,
              finished with precision.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#catalogue"
                className="inline-flex items-center gap-2 border border-paper bg-paper px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-ink transition hover:border-ochre hover:bg-ochre hover:text-paper"
              >
                Explore catalogue <ArrowRight className="size-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 border border-paper/35 px-6 py-3 text-sm font-bold uppercase tracking-[0.14em] text-paper transition hover:border-ochre hover:text-ochre"
              >
                Request a quote
              </a>
            </div>
          </div>
          <dl className="grid grid-cols-3 border-y border-paper/15 text-paper">
            <div className="border-r border-paper/15 py-6">
              <dt className="eyebrow text-paper/45">Bulk MOQ</dt>
              <dd className="mt-2 font-display text-2xl font-bold">30 pcs</dd>
            </div>
            <div className="border-r border-paper/15 px-5 py-6">
              <dt className="eyebrow text-paper/45">Categories</dt>
              <dd className="mt-2 font-display text-2xl font-bold">12</dd>
            </div>
            <div className="pl-5 py-6">
              <dt className="eyebrow text-paper/45">Sizing</dt>
              <dd className="mt-2 font-display text-2xl font-bold">S–XXXL</dd>
            </div>
          </dl>
        </div>
        <div className="relative self-stretch">
          <div className="absolute -right-3 -top-3 h-full w-full border-2 border-ochre" />
          <img
            src={hero}
            alt="Santo Veste hoodies in blue, maroon and yellow on a rack"
            className="relative h-full min-h-[34rem] w-full object-cover"
          />
          <span className="absolute bottom-0 right-0 bg-ink px-4 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-paper">
            Style · Comfort · Identity
          </span>
        </div>
      </div>
    </section>
  );
}
