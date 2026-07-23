import { useState } from "react";
import { Menu, X } from "lucide-react";

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
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <a href="#top" className="flex items-baseline gap-2">
          <span className="font-display text-xl font-extrabold tracking-tight text-ink">
            Santo Veste
          </span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.24em] text-ink/50 sm:inline">
            Catalogue
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-ink px-4 py-2 text-xs font-semibold uppercase tracking-widest text-paper transition hover:bg-ink/85"
          >
            Request quote
          </a>
        </nav>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-ink md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-ink/10 bg-paper md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded px-2 py-3 text-sm font-medium text-ink/80"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-ink px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest text-paper"
            >
              Request quote
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
