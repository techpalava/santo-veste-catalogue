import { BrandMark } from "./BrandMark";

export function Footer() {
  return (
    <footer className="sv-pattern border-t border-paper/15 bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.5fr_1fr_auto] md:items-end md:px-8">
        <div>
          <BrandMark inverse />
          <p className="mt-5 font-display text-3xl font-bold">Wear your convictions.</p>
          <p className="mt-3 max-w-sm text-sm text-paper/60">
            Ready-to-wear and custom-fitted apparel for individuals, teams and organizations.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs font-semibold uppercase tracking-[0.14em] text-paper/65">
          <li><a href="#about" className="hover:text-ochre">About</a></li>
          <li><a href="#catalogue" className="hover:text-ochre">Catalogue</a></li>
          <li><a href="#customization" className="hover:text-ochre">Customization</a></li>
          <li><a href="#process" className="hover:text-ochre">Process</a></li>
          <li><a href="#contact" className="hover:text-ochre">Contact</a></li>
          <li><a href="#top" className="hover:text-ochre">Back to top</a></li>
        </ul>
        <p className="text-xs text-paper/40">© {new Date().getFullYear()} Santo Veste.<br />All rights reserved.</p>
      </div>
    </footer>
  );
}
