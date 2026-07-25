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

export function downloadRequestPdf(form: FormSnapshot, selected: Category[]) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentW = pageW - margin * 2;
  const footerY = pageH - 30;
  const contentBottom = footerY - 24;
  let y = margin;

  function ensureSpace(height: number): boolean {
    if (y + height <= contentBottom) return false;
    doc.addPage();
    y = margin;
    return true;
  }

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
  doc.text(`Generated ${new Date().toLocaleString()}`, margin, y);
  y += 22;

  // Selected categories block
  if (selected.length > 0) {
    doc.setFillColor(245, 241, 232);
    doc.rect(margin, y, contentW, 24, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(30);
    doc.text(
      selected.length === 1 ? "REQUESTED CATEGORY" : "REQUESTED CATEGORIES",
      margin + 10,
      y + 16
    );
    y += 34;

    selected.forEach((item, index) => {
      const descLines = doc.splitTextToSize(item.description, contentW) as string[];
      const specs: Array<[string, string | undefined]> = [
        ["Fabrics", item.fabrics],
        ["Options", item.features],
        ["MOQ", item.moq],
        ["Sizes", item.sizes],
        ["Base price", item.price],
      ];
      const specRows = specs.flatMap(([label, value]) =>
        value
          ? [
              {
                label,
                lines: doc.splitTextToSize(value, contentW - 90) as string[],
              },
            ]
          : []
      );
      const separatorHeight = index > 0 ? 14 : 0;
      const itemHeight =
        16 +
        descLines.length * 12 +
        8 +
        specRows.reduce((total, row) => total + row.lines.length * 12 + 3, 0) +
        6;
      const movedToNewPage = ensureSpace(separatorHeight + itemHeight);

      if (index > 0 && !movedToNewPage) {
        doc.setDrawColor(200);
        doc.setLineWidth(0.5);
        doc.line(margin, y, pageW - margin, y);
        y += 14;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(30);
      doc.text(`${item.index} · ${item.name}`, margin, y);
      y += 16;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(80);
      doc.text(descLines, margin, y);
      y += descLines.length * 12 + 8;

      specRows.forEach(({ label, lines }) => {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(30);
        doc.setFontSize(9);
        doc.text(`${label}:`, margin, y);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(60);
        doc.text(lines, margin + 90, y);
        y += lines.length * 12 + 3;
      });
      y += 6;
    });
    y += 10;
  }

  const categorySummary =
    selected.length > 0
      ? selected.map((item) => item.name).join(", ")
      : form.category || "—";
  const details: Array<[string, string]> = [
    ["Name", form.name || "—"],
    ["Email", form.email || "—"],
    ["Phone / WhatsApp", form.phone || "—"],
    ["Quantity", form.quantity || "—"],
    [selected.length > 1 ? "Categories" : "Category", categorySummary],
  ];
  const detailRows = details.map(([label, value]) => ({
    label,
    lines: doc.splitTextToSize(value, contentW - 110) as string[],
  }));
  const detailsHeight =
    34 +
    detailRows.reduce(
      (total, row) => total + Math.max(16, row.lines.length * 12 + 4),
      0
    ) +
    12;

  // Contact details
  ensureSpace(detailsHeight);
  doc.setFillColor(20, 20, 20);
  doc.rect(margin, y, contentW, 24, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(245);
  doc.text("YOUR DETAILS", margin + 10, y + 16);
  y += 34;

  detailRows.forEach(({ label, lines }) => {
    doc.setFont("helvetica", "bold");
    doc.setTextColor(30);
    doc.setFontSize(10);
    doc.text(`${label}:`, margin, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60);
    doc.text(lines, margin + 110, y);
    y += Math.max(16, lines.length * 12 + 4);
  });
  y += 12;

  // Brief
  ensureSpace(28);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(30);
  doc.text("BRIEF", margin, y);
  y += 14;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60);
  const briefLines = doc.splitTextToSize(form.message || "—", contentW) as string[];
  briefLines.forEach((line) => {
    ensureSpace(13);
    doc.text(line, margin, y);
    y += 13;
  });

  // Footer on every generated page
  const pageCount = doc.getNumberOfPages();
  for (let page = 1; page <= pageCount; page += 1) {
    doc.setPage(page);
    doc.setDrawColor(200);
    doc.line(margin, footerY - 10, pageW - margin, footerY - 10);
    doc.setFontSize(8);
    doc.setTextColor(140);
    doc.text(
      "Santo Veste · timtropiks@gmail.com · +234 810 220 5566",
      margin,
      footerY
    );
    doc.text(`${page} / ${pageCount}`, pageW - margin, footerY, {
      align: "right",
    });
  }

  const slug =
    selected.length === 1
      ? selected[0].id.replace(/[^a-z0-9-]/gi, "-")
      : `bundle-${selected.length}-items`;
  doc.save(`santo-veste-request-${slug}.pdf`);
}
