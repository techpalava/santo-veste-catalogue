export function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-[1.5fr_1fr_auto] md:items-end md:px-8">
        <div>
          <p className="font-display text-3xl font-extrabold tracking-tight">Santo Veste</p>
          <p className="mt-3 max-w-sm text-sm text-paper/60">
            Ready-to-wear and custom-fitted unisex clothing. Faith. Tailoring. Craft.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-2 text-sm text-paper/70">
          <li><a href="#about" className="hover:text-ochre">About</a></li>
          <li><a href="#catalogue" className="hover:text-ochre">Catalogue</a></li>
          <li><a href="#customization" className="hover:text-ochre">Customization</a></li>
          <li><a href="#process" className="hover:text-ochre">Process</a></li>
          <li><a href="#contact" className="hover:text-ochre">Contact</a></li>
          <li><a href="#top" className="hover:text-ochre">Back to top</a></li>
        </ul>
        <p className="text-xs text-paper/40">© {new Date().getFullYear()} Santo Veste. All rights reserved.</p>
      </div>
    </footer>
  );
}
