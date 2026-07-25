import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "sv-favourites";
const CHANGE_EVENT = "sv-favourites-change";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function write(ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function getFavourites(): string[] {
  return read();
}

export function addFavourite(id: string) {
  const current = new Set(read());
  current.add(id);
  write([...current]);
}

export function removeFavourite(id: string) {
  const current = new Set(read());
  current.delete(id);
  write([...current]);
}

export function isFavourite(id: string): boolean {
  return read().includes(id);
}

export function toggleFavourite(id: string): boolean {
  const current = new Set(read());
  const next = !current.has(id);
  if (next) {
    current.add(id);
  } else {
    current.delete(id);
  }
  write([...current]);
  return next;
}

export function clearFavourites() {
  write([]);
}

export function useFavourites() {
  const [ids, setIds] = useState<string[]>(read);

  useEffect(() => {
    const handler = () => setIds(read());
    window.addEventListener(CHANGE_EVENT, handler);
    return () => window.removeEventListener(CHANGE_EVENT, handler);
  }, []);

  const toggle = useCallback((id: string) => {
    const next = toggleFavourite(id);
    setIds(read());
    return next;
  }, []);

  const clear = useCallback(() => {
    clearFavourites();
    setIds(read());
  }, []);

  return {
    ids,
    toggle,
    clear,
    isFavourite: useCallback((id: string) => ids.includes(id), [ids]),
  };
}
