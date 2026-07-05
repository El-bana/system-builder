import type { CartItem } from "../types";

const STORAGE_KEY = "cart";

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

let snapshot: CartItem[] = parse();

function parse(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function getSnapshot(): CartItem[] {
  return snapshot;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setCart(next: CartItem[]): void {
  snapshot = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch (e) {
    console.warn("[cartStore] Failed to persist cart to localStorage:", e);
  }
  notify();
}
