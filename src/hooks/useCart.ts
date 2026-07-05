import { use } from "react";
import { CartContext, type CartContextType } from "../context/cartContext";

/** Fails if used outside <CartProvider> */
export function useCart(): CartContextType {
  const ctx = use(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
