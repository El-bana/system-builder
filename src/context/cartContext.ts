import { createContext } from "react";
import type { CartItem } from "../types";

export interface CartContextType {
  cart: CartItem[];
  updateQuantity: (
    productId: string,
    variantId: string | null,
    delta: number,
  ) => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);
