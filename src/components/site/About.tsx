import about from "@/assets/catalogue/about.jpg";

const pillars = [
  { n: "01", title: "Faith meets fashion", body: "A movement that turns steadfast beliefs into bold, wearable statements." },
  { n: "02", title: "Quality & comfort", body: "Stylish garments with unmatched comfort — for everyday wear or the pulpit." },
  { n: "03", title: "Unisex by design", body: "Inclusive silhouettes and sizing that cater to all wearers, S through XXXL." },
  { n: "04", title: "Tailored to you", body: "Ready-to-wear or bespoke — every piece is crafted with precision to your fit." },
  { n: "05", title: "A testament in every thread", body: "Each creation tells a story of confidence, conviction and craft." },
];

export function About() {
  return (
    <section id="about" className="border-b border-ink/10 bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div className="space-y-8">
            <p className="eyebrow text-ink/50">01 — About Santo Veste</p>
            <h2 className="font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">
              We don't just make clothing. We craft statements of
              <span className="text-ochre"> faith and authenticity.</span>
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-ink/70">
              At Santo Veste we combine traditional and modern tailoring
              techniques with premium materials to produce impeccably finished
              ready-to-wear and custom-fitted apparel. Every garment is made to
              look good, feel good and empower you to showcase your faith with
              confidence and style.
            </p>
            <img
              src={about}
              alt="Group of men wearing Santo Veste apparel"
              className="aspect-[4/3] w-full border-2 border-ink object-cover"
            />
          </div>
          <ol className="space-y-8 md:pt-16">
            {pillars.map((p) => (
              <li
                key={p.n}
                className="grid grid-cols-[auto_1fr] gap-6 border-b border-ink/10 pb-8 last:border-none last:pb-0"
              >
                <span className="font-display text-2xl font-bold text-ochre">{p.n}</span>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
