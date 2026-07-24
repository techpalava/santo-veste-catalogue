export function BrandMark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span
      className={`inline-grid border-2 px-2 py-1 font-display text-[10px] font-bold uppercase leading-[0.78] tracking-[-0.08em] ${
        inverse ? "border-paper text-paper" : "border-ink text-ink"
      }`}
      aria-label="Santo Veste"
    >
      <span>Santo</span>
      <span>Veste</span>
    </span>
  );
}
