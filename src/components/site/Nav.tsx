import { useState } from "react";
import { Menu, X } from "lucide-react";
import { BrandMark } from "./BrandMark";

const links = [
  { href: "#about", label: "About" },
  { href: "#catalogue", label: "Catalogue" },
  { href: "#customization", label: "Customization" },
  { href: "#process", label: "Process" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-paper/15 bg-ink/95 text-paper backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 md:px-8">
        <a href="#top" className="flex items-center gap-3">
          <BrandMark inverse />
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-paper/55 sm:inline">
            Products Catalogue
          </span>
        </a>
        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-semibold uppercase tracking-[0.16em] text-paper/65 transition-colors hover:text-paper"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="border border-ochre bg-ochre px-5 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-paper transition hover:bg-transparent"
          >
            Request quote
          </a>
        </nav>
        <button
          onClick={() => setOpen((v) => !v)}
          className="border border-paper/20 p-2 text-paper md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-paper/15 bg-ink md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-5 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-paper/10 px-1 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-paper/75"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-4 bg-ochre px-4 py-3 text-center text-xs font-bold uppercase tracking-[0.16em] text-paper"
            >
              Request quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
