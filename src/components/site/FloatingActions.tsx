import { FileText, MessageCircle } from "lucide-react";

const whatsappUrl =
  "https://wa.me/2348102205566?text=Hello%20Santo%20Veste%2C%20I%27d%20like%20to%20make%20an%20enquiry.";

export function FloatingActions() {
  return (
    <aside
      className="fixed inset-x-4 bottom-4 z-50 flex gap-2 sm:inset-x-auto sm:right-5"
      aria-label="Quick contact actions"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="flex flex-1 items-center justify-center gap-2 border-2 border-paper bg-ink px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-paper shadow-[4px_4px_0_var(--ochre)] transition hover:-translate-y-1 hover:bg-ochre sm:flex-none"
        aria-label="Chat with Santo Veste on WhatsApp"
      >
        <MessageCircle className="size-4" />
        WhatsApp
      </a>
      <a
        href="#contact"
        className="flex flex-1 items-center justify-center gap-2 border-2 border-ink bg-ochre px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-paper shadow-[4px_4px_0_var(--ink)] transition hover:-translate-y-1 hover:bg-ink sm:flex-none"
      >
        <FileText className="size-4" />
        Request quote
      </a>
    </aside>
  );
}
