import type { Category } from "./santo-veste-data";

type Listener = (c: Category) => void;
const listeners = new Set<Listener>();

export function requestCategory(c: Category) {
  listeners.forEach((fn) => fn(c));
}

export function subscribeRequest(fn: Listener) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

export function buildBrief(c: Category): string {
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
