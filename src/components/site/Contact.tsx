import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Mail, Phone, MessageCircle, Instagram, MapPin } from "lucide-react";
import { categories } from "@/lib/santo-veste-data";

const contactRows = [
  { icon: Mail, label: "Email", value: "hello@santoveste.com" },
  { icon: Phone, label: "Phone", value: "+234 000 000 0000" },
  { icon: MessageCircle, label: "WhatsApp", value: "+234 000 000 0000" },
  { icon: Instagram, label: "Instagram", value: "@santoveste" },
  { icon: MapPin, label: "Studio", value: "Lagos, Nigeria" },
];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast.success("Thanks — this is a demo form.", {
        description: "We'd normally reply within one business day.",
      });
      (e.target as HTMLFormElement).reset();
      setSubmitting(false);
    }, 500);
  }

  return (
    <section id="contact" className="border-b border-ink/10 bg-[oklch(0.97_0.008_80)]">
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
                  <dd className="text-sm font-medium text-ink">{r.value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-ink/45">
              Contact details are placeholders — swap in your real handles when ready.
            </p>
          </div>

          <form
            onSubmit={onSubmit}
            className="grid gap-5 border border-ink/15 bg-paper p-6 md:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone / WhatsApp" name="phone" />
              <Field label="Quantity" name="quantity" placeholder="e.g. 60 pieces" />
            </div>
            <label className="grid gap-2">
              <span className="eyebrow text-ink/60">Product category</span>
              <select
                id="category-select"
                name="category"
                defaultValue=""
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
              <span className="eyebrow text-ink/60">Brief</span>
              <textarea
                name="message"
                rows={5}
                required
                placeholder="Tell us about sizes, fabric preferences, printing or embroidery, deadlines..."
                className="border border-ink/20 bg-paper p-3 text-sm text-ink focus:border-ink focus:outline-none"
              />
            </label>
            <button
              type="submit"
              disabled={submitting}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-widest text-paper transition hover:bg-ochre hover:text-ink disabled:opacity-60"
            >
              {submitting ? "Sending…" : "Send inquiry"}
            </button>
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
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
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
        className="h-11 border border-ink/20 bg-paper px-3 text-sm text-ink focus:border-ink focus:outline-none"
      />
    </label>
  );
}
