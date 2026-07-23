import { orderSteps } from "@/lib/santo-veste-data";
import process from "@/assets/catalogue/process.jpg";

export function Process() {
  return (
    <section id="process" className="border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-ink/50">04 — Order Process</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">
              From brief to boxed.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink/60">
            Five clear steps. No surprises — every quote and timeline is
            agreed before we cut a single piece of fabric.
          </p>
        </div>

        <ol className="grid gap-px bg-ink/10 md:grid-cols-5">
          {orderSteps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-4 bg-paper p-6">
              <div className="flex items-baseline justify-between">
                <span className="font-display text-4xl font-extrabold text-ochre">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/40">
                  Step
                </span>
              </div>
              <h3 className="font-display text-lg font-bold text-ink">{s.title}</h3>
              <p className="text-sm leading-relaxed text-ink/70">{s.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
          <img
            src={process}
            alt="Santo Veste production — swatches, sketches and sewing"
            className="aspect-[16/9] w-full object-cover"
          />
          <blockquote className="font-display text-2xl font-medium italic leading-snug text-ink md:text-3xl">
            "Each Santo Veste creation tells a story of confidence — allowing
            wearers to stand out, inspire others, and remain true to their
            beliefs."
          </blockquote>
        </div>
      </div>
    </section>
  );
}
