import customization from "@/assets/catalogue/customization.jpg";
import { services } from "@/lib/santo-veste-data";

export function Customization() {
  return (
    <section id="customization" className="border-b border-ink/10 bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:gap-16">
          <div className="space-y-6">
            <p className="eyebrow text-ochre">03 — Customization Services</p>
            <h2 className="font-display text-4xl font-extrabold leading-tight md:text-5xl">
              Make it undeniably <span className="italic text-ochre">yours.</span>
            </h2>
            <p className="max-w-md text-base leading-relaxed text-paper/70">
              From single embroidered monograms to full team kits and
              branded packaging for bulk orders — every finish is done
              in-house so quality never leaves our hands.
            </p>
            <img
              src={customization}
              alt="Fabric swatches, buttons and design references on a workshop table"
              className="mt-6 aspect-[4/3] w-full object-cover grayscale"
            />
          </div>
          <ul className="grid grid-cols-1 gap-px bg-paper/15 sm:grid-cols-2">
            {services.map((s, i) => (
              <li
                key={s.title}
                className="flex flex-col gap-3 bg-ink p-6"
              >
                <span className="font-display text-sm font-bold text-ochre">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-bold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-paper/70">{s.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
