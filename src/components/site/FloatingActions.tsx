import { FileText, Heart, MessageCircle } from "lucide-react";
import { categories } from "@/lib/santo-veste-data";
import { useFavourites } from "@/lib/favourites";
import { requestCategories } from "@/lib/request-prefill";

const WHATSAPP_NUMBER = "2348102205566";

export function FloatingActions() {
  const { ids: favouriteIds, clear } = useFavourites();
  const count = favouriteIds.length;
  const favouriteCategories = categories.filter((c) => favouriteIds.includes(c.id));

  function requestSaved() {
    if (favouriteCategories.length === 0) return;
    requestCategories(favouriteCategories);
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  }

  function startNewRequest() {
    clear();
    requestCategories([]);
  }

  return (
    <aside
      className="fixed inset-x-4 bottom-4 z-50 flex flex-wrap items-center justify-end gap-2 sm:inset-x-auto sm:right-5"
      aria-label="Quick contact actions"
    >
      {count > 0 && (
        <button
          type="button"
          onClick={requestSaved}
          className="flex items-center justify-center gap-2 border-2 border-ink bg-paper px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-ink shadow-[4px_4px_0_var(--ochre)] transition hover:-translate-y-1"
        >
          <Heart className="size-4 fill-ochre text-ochre" />
          Request saved ({count})
        </button>
      )}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          "Hello Santo Veste, I'd like to make an enquiry."
        )}`}
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
        onClick={startNewRequest}
        className="flex flex-1 items-center justify-center gap-2 border-2 border-ink bg-ochre px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-paper shadow-[4px_4px_0_var(--ink)] transition hover:-translate-y-1 hover:bg-ink sm:flex-none"
      >
        <FileText className="size-4" />
        Request quote
      </a>
    </aside>
  );
}
