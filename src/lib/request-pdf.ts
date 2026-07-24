import { jsPDF } from "jspdf";
import type { Category } from "./santo-veste-data";

type FormSnapshot = {
  name: string;
  email: string;
  phone: string;
  quantity: string;
  category: string;
  message: string;
};

export function downloadRequestPdf(form: FormSnapshot, selected: Category | null) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentW = pageW - margin * 2;
  let y = margin;

  // Header
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("SANTO VESTE", margin, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(120);
  doc.text("Category request summary", pageW - margin, y, { align: "right" });
  y += 10;
  doc.setDrawColor(20);
  doc.setLineWidth(1);
  doc.line(margin, y, pageW - margin, y);
  y += 24;

  doc.setTextColor(30);
  doc.setFontSize(9);
  doc.text(
    `Generated ${new Date().toLocaleString()}`,
    margin,
    y,
  );
  y += 22;

  // Selected category block
  if (selected) {
    doc.setFillColor(245, 241, 232);
    doc.rect(margin, y, contentW, 24, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(30);
    doc.text("REQUESTED CATEGORY", margin + 10, y + 16);
    y += 34;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text(`${selected.index} · ${selected.name}`, margin, y);
    y += 18;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(80);
    const descLines = doc.splitTextToSize(selected.description, contentW);
    doc.text(descLines, margin, y);
    y += descLines.length * 13 + 10;

    const specs: Array<[string, string | undefined]> = [
      ["Fabrics", selected.fabrics],
      ["Options", selected.features],
      ["MOQ", selected.moq],
      ["Sizes", selected.sizes],
      ["Base price", selected.price],
    ];
    specs.forEach(([label, value]) => {
      if (!value) return;
      doc.setFont("helvetica", "bold");
      doc.setTextColor(30);
      doc.text(`${label}:`, margin, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60);
      const lines = doc.splitTextToSize(value, contentW - 80);
      doc.text(lines, margin + 80, y);
      y += lines.length * 13 + 4;
    });
    y += 10;
  }

  // Contact details
  doc.setFillColor(20);
  doc.rect(margin, y, contentW, 24, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(245);
  doc.text("YOUR DETAILS", margin + 10, y + 16);
  y += 34;

  const details: Array<[string, string]> = [
    ["Name", form.name || "—"],
    ["Email", form.email || "—"],
    ["Phone / WhatsApp", form.phone || "—"],
    ["Quantity", form.quantity || "—"],
    ["Category", form.category || "—"],
  ];
  details.forEach(([label, value]) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30);
    doc.setFontSize(10);
    doc.text(`${label}:`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60);
    doc.text(value, margin + 110, y);
    y += 16;
  });
  y += 12;

  // Brief
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(30);
  doc.text("BRIEF", margin, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60);
  const briefLines = doc.splitTextToSize(form.message || "—", contentW);
  briefLines.forEach((line: string) => {
    if (y > pageH - margin) {
      doc.addPage();
      y = margin;
    }
    doc.text(line, margin, y);
    y += 13;
  });

  // Footer
  const footerY = pageH - 30;
  doc.setDrawColor(200);
  doc.line(margin, footerY - 10, pageW - margin, footerY - 10);
  doc.setFontSize(8);
  doc.setTextColor(140);
  doc.text("Santo Veste · hello@santoveste.com · Lagos, Nigeria", margin, footerY);

  const slug = (selected?.id ?? "custom").replace(/[^a-z0-9-]/gi, "-");
  doc.save(`santo-veste-request-${slug}.pdf`);
}
