import { useSyncExternalStore, type ReactNode } from "react";
import { getSnapshot, setCart, subscribe } from "../stores/cartStore";
import { CartContext } from "./cartContext";

export function CartProvider({ children }: { children: ReactNode }) {
  // useSyncExternalStore wires localStorage into React's render cycle without flickering:
  // snapshot is read synchronously before paint so the initial render already has persisted cart.
  const cart = useSyncExternalStore(subscribe, getSnapshot);

  const updateQuantity = (
    productId: string,
    variantId: string | null,
    delta: number,
  ) => {
    const next = [...cart];
    const idx = next.findIndex(
      (item) => item.productId === productId && item.variantId === variantId,
    );

    if (idx === -1) {
      if (delta > 0) next.push({ productId, variantId, quantity: delta });
    } else if (next[idx].quantity + delta <= 0) {
      next.splice(idx, 1);
    } else {
      next[idx] = { ...next[idx], quantity: next[idx].quantity + delta };
    }

    setCart(next);
  };

  return <CartContext value={{ cart, updateQuantity }}>{children}</CartContext>;
}
