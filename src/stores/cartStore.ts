import { useSyncExternalStore } from "react";
import type { CartItem } from "../types";

const STORAGE_KEY = "cart";

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

// initial cart loading
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
  notify();
}

export function saveCartToStorage(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch (e) {
    console.warn("[cartStore] Failed to persist cart to localStorage:", e);
  }
}

// Atomic hooks to prevent full re-renders and make
// sure that only the updated card gets rerendered
// a bit over engineering for a basic product catalogue
// but still it's the best to prevent unnecessary rerenders
// it's basically zustand's little clone replacing our
// context api store

export function useVariantQuantity(
  productId: string,
  variantId: string | null,
) {
  return useSyncExternalStore(subscribe, () => {
    const item = getSnapshot().find(
      (i) => i.productId === productId && i.variantId === variantId,
    );
    return item ? item.quantity : 0;
  });
}

export function useTotalQuantity(productId: string) {
  return useSyncExternalStore(subscribe, () => {
    return getSnapshot()
      .filter((i) => i.productId === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  });
}

export function useCategoryTotal(productIds: string[]) {
  return useSyncExternalStore(subscribe, () => {
    return getSnapshot()
      .filter((i) => productIds.includes(i.productId))
      .reduce((sum, item) => sum + item.quantity, 0);
  });
}

const SENSE_HUB_ID = "wyze-sense-hub";
const SENSOR_IDS = new Set(["wyze-sense-motion-sensor"]);

export function setQuantity(
  productId: string,
  variantId: string | null,
  quantity: number,
) {
  const next = [...snapshot];
  const idx = next.findIndex(
    (item) => item.productId === productId && item.variantId === variantId,
  );

  if (quantity <= 0) {
    if (idx !== -1) next.splice(idx, 1);
  } else {
    if (idx === -1) {
      next.push({ productId, variantId, quantity });
    } else {
      next[idx] = { ...next[idx], quantity };
    }
  }

  // automatically add the Sense Hub when any sensor is in cart, remove when none are there
  if (SENSOR_IDS.has(productId)) {
    const hasSensors = next.some((item) => SENSOR_IDS.has(item.productId));
    const hubIdx = next.findIndex((item) => item.productId === SENSE_HUB_ID);

    if (hasSensors && hubIdx === -1) {
      next.push({ productId: SENSE_HUB_ID, variantId: null, quantity: 1 });
    } else if (!hasSensors && hubIdx !== -1) {
      next.splice(hubIdx, 1);
    }
  }

  setCart(next);
}
