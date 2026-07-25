import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Mail, Phone, MessageCircle, Instagram, MapPin, X, Download } from "lucide-react";
import { categories, type Category } from "@/lib/santo-veste-data";
import { subscribeRequest, buildBriefForCategories } from "@/lib/request-prefill";
import { downloadRequestPdf } from "@/lib/request-pdf";
import { useFavourites, clearFavourites } from "@/lib/favourites";

const contactRows = [
  {
    icon: Mail,
    label: "Email",
    value: "timtropiks@gmail.com",
    href: "mailto:timtropiks@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+234 810 220 5566",
    href: "tel:+2348102205566",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+234 810 220 5566",
    href: "https://wa.me/2348102205566",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@SantoVeste",
    href: "https://instagram.com/SantoVeste",
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "2C Fagba, off Clegg Street, Surulere, Lagos",
    href: "https://www.google.com/maps/search/?api=1&query=2C+Fagba%2C+off+Clegg+Street%2C+Surulere%2C+Lagos",
  },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  quantity: "",
  category: "",
  message: "",
};

const WHATSAPP_NUMBER = "2348102205566";

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [selected, setSelected] = useState<Category[]>([]);
  const { ids: favouriteIds, clear } = useFavourites();

  const favouriteCategories = useMemo(
    () => categories.filter((c) => favouriteIds.includes(c.id)),
    [favouriteIds]
  );

  const applyCategories = useCallback((items: Category[]) => {
    setSelected(items);
    setForm((prev) => ({
      ...prev,
      category: items.length === 1 ? items[0].id : "",
      quantity:
        items.length === 1 ? items[0].moq?.replace(/\D/g, "") ?? prev.quantity : prev.quantity,
      message: buildBriefForCategories(items),
    }));
  }, []);

  useEffect(() => subscribeRequest(applyCategories), [applyCategories]);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function selectCategory(value: string) {
    const category = categories.find((c) => c.id === value) ?? null;
    if (category) {
      applyCategories([category]);
      return;
    }

    setSelected([]);
    setForm((prev) => ({ ...prev, category: value }));
  }

  function removeCategory(id: string) {
    const next = selected.filter((c) => c.id !== id);
    applyCategories(next);
  }

  function clearReference() {
    setSelected([]);
    setForm((prev) => ({
      ...prev,
      category: "",
      quantity: "",
      message: "",
    }));
  }

  function validateRequest() {
    if (!form.name.trim() || !form.email.trim() || !form.category || !form.message.trim()) {
      toast.error("Complete the required fields", {
        description: "Add your name, email, product category and brief first.",
      });
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      toast.error("Enter a valid email address");
      return false;
    }

    return true;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thanks — this is a demo form.", {
        description: "We'd normally reply within one business day.",
      });
      setForm(emptyForm);
      setSelected([]);
      clear();
      setSubmitting(false);
    }, 500);
  }

  function downloadPdf() {
    if (!validateRequest()) return;
    downloadRequestPdf(form, selected);
    toast.success("PDF downloaded", {
      description: "Share it with the Santo Veste team.",
    });
  }

  function openWhatsApp() {
    const items = selected.length > 0 ? selected : favouriteCategories;
    const text = buildWhatsAppText(form, items);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  }

  return (
    <section id="contact" className="sv-pattern border-b border-ink/15 bg-secondary">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div className="space-y-8">
            <p className="eyebrow text-ink/50">05 — Contact</p>
            <h2 className="font-display text-4xl font-extrabold leading-tight text-ink md:text-5xl">
              Tell us what you need. <span className="italic text-ochre">We'll tailor the rest.</span>
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-ink/70">
              Send us a brief with quantities, sizes and any reference imagery.
              We'll reply with fabric options, a mock-up and a written
              quotation.
            </p>
            <dl className="divide-y divide-ink/10 border-y border-ink/10">
              {contactRows.map((r) => (
                <div key={r.label} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4">
                  <r.icon className="size-4 text-ochre" />
                  <dt className="eyebrow text-ink/50">{r.label}</dt>
                  <dd className="text-right text-sm font-medium text-ink">
                    <a
                      href={r.href}
                      target={r.href.startsWith("http") ? "_blank" : undefined}
                      rel={r.href.startsWith("http") ? "noreferrer" : undefined}
                      className="transition hover:text-ochre hover:underline"
                    >
                      {r.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <form
            onSubmit={onSubmit}
            className="grid gap-5 border-2 border-ink bg-paper p-6 shadow-[8px_8px_0_var(--ink)] md:p-10"
          >
            {selected.length > 0 && (
              <div className="relative border border-ink/15 bg-secondary p-4 pr-10">
                <p className="eyebrow text-ink/50">
                  Requesting {selected.length > 1 ? `(${selected.length} items)` : ""}
                </p>
                <div className="mt-2 space-y-2">
                  {selected.map((c) => (
                    <div key={c.id} className="flex items-start justify-between gap-3">
                      <p className="font-display text-base font-bold text-ink">{c.name}</p>
                      <button
                        type="button"
                        onClick={() => removeCategory(c.id)}
                        aria-label={`Remove ${c.name}`}
                        className="shrink-0 p-1 text-ink/40 transition hover:text-ink"
                      >
                        <X className="size-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-ink/70">
                  {selected.length === 1 && selected[0].moq && (
                    <div>
                      <dt className="inline eyebrow text-ink/45">MOQ · </dt>
                      <dd className="inline">{selected[0].moq}</dd>
                    </div>
                  )}
                  {selected.length === 1 && selected[0].price && (
                    <div>
                      <dt className="inline eyebrow text-ink/45">Base · </dt>
                      <dd className="inline">{selected[0].price}</dd>
                    </div>
                  )}
                  {selected.length === 1 && (
                    <div className="col-span-2">
                      <dt className="inline eyebrow text-ink/45">Fabrics · </dt>
                      <dd className="inline">{selected[0].fabrics}</dd>
                    </div>
                  )}
                </dl>
                <button
                  type="button"
                  onClick={clearReference}
                  aria-label="Clear reference"
                  className="absolute right-2 top-2 p-1 text-ink/40 transition hover:text-ink"
                >
                  <X className="size-4" />
                </button>
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" required value={form.name} onChange={(v) => update("name", v)} />
              <Field label="Email" name="email" type="email" required value={form.email} onChange={(v) => update("email", v)} />
              <Field label="Phone / WhatsApp" name="phone" value={form.phone} onChange={(v) => update("phone", v)} />
              <Field label="Quantity" name="quantity" placeholder="e.g. 60 pieces" value={form.quantity} onChange={(v) => update("quantity", v)} />
            </div>
            <label className="grid gap-2">
              <span className="eyebrow text-ink/60">Product category *</span>
              <select
                id="category-select"
                name="category"
                required
                value={form.category}
                onChange={(e) => selectCategory(e.target.value)}
                className="h-11 border border-ink/20 bg-paper px-3 text-sm text-ink focus:border-ink focus:outline-none"
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
                <option value="other">Something else / custom</option>
              </select>
            </label>
            <label className="grid gap-2">
              <span className="eyebrow text-ink/60">Brief *</span>
              <textarea
                name="message"
                rows={8}
                required
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Tell us about sizes, fabric preferences, printing or embroidery, deadlines..."
                className="border border-ink/20 bg-paper p-3 text-sm text-ink focus:border-ink focus:outline-none"
              />
            </label>
            <div className="mt-2 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={downloadPdf}
                  className="inline-flex items-center justify-center gap-2 border border-ink/30 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-ink transition hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <Download className="size-4" />
                  Download PDF
                </button>
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="inline-flex items-center justify-center gap-2 border border-ink/30 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-ink transition hover:border-ink hover:bg-ink hover:text-paper"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </button>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-widest text-paper transition hover:bg-ochre hover:text-ink disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send inquiry"}
              </button>
            </div>
            <p className="text-[11px] text-ink/45">
              Demo form — no data is stored or sent.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="grid gap-2">
      <span className="eyebrow text-ink/60">
        {label}
        {required ? " *" : ""}
      </span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 border border-ink/20 bg-paper px-3 text-sm text-ink focus:border-ink focus:outline-none"
      />
    </label>
  );
}

function buildWhatsAppText(form: typeof emptyForm, items: Category[]): string {
  let text = "Hello Santo Veste, I'd like to request a quote";
  if (items.length > 0) {
    text += " for:\n\n";
    text += items.map((c) => `- ${c.name}${c.moq ? ` (MOQ: ${c.moq})` : ""}`).join("\n");
  }
  text += "\n\nMy details:";
  if (form.name) text += `\nName: ${form.name}`;
  if (form.email) text += `\nEmail: ${form.email}`;
  if (form.phone) text += `\nPhone: ${form.phone}`;
  if (form.quantity) text += `\nQuantity: ${form.quantity}`;
  if (form.message) text += `\n\nBrief:\n${form.message}`;
  return text;
}
