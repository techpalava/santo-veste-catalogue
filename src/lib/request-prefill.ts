import type { Category } from "./santo-veste-data";

type Listener = (categories: Category[]) => void;
const listeners = new Set<Listener>();

export function requestCategories(categories: Category[]) {
  listeners.forEach((fn) => fn(categories));
}

export function requestCategory(c: Category) {
  requestCategories([c]);
}

export function subscribeRequest(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function buildBrief(c: Category): string {
  return buildBriefForCategories([c]);
}

export function buildBriefForCategories(categories: Category[]): string {
  if (categories.length === 0) return "";

  if (categories.length === 1) {
    const c = categories[0];
    const lines = [
      `Hi — I'd like a quote for ${c.name}${c.moq ? ` (min. ${c.moq})` : ""}.`,
      "",
      `Fabrics of interest: ${c.fabrics}`,
      `Options: ${c.features}`,
      `Base price reference: ${c.price ?? "on request"}`,
      "",
      "My details:",
      "- Quantity:",
      "- Sizes needed:",
      "- Print / embroidery:",
      "- Deadline:",
    ];
    return lines.join("\n");
  }

  const lines = [
    "Hi — I'd like a quote for the following items:",
    "",
    ...categories.map(
      (c) => `- ${c.name}${c.moq ? ` (min. ${c.moq})` : ""}`
    ),
    "",
    "Details for each:",
    ...categories.flatMap((c) => [
      "",
      `* ${c.name}`,
      `  Fabrics of interest: ${c.fabrics}`,
      `  Options: ${c.features}`,
      `  Base price reference: ${c.price ?? "on request"}`,
    ]),
    "",
    "My details:",
    "- Quantities per item:",
    "- Sizes needed:",
    "- Print / embroidery:",
    "- Deadline:",
  ];
  return lines.join("\n");
}
