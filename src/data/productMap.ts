import type { Product } from "../types";
import db from "./db.json";

// this is used so we don't keep looking through arrays, just flatten it on initial load and that's it
// it's outside of any react code so it will be evaluated once, we don't need to update it as
// the product's data won't actually update after initial render

export const productLookup: Record<string, Product> = Object.values(
  db.builderData,
)
  .flat()
  .reduce(
    (acc, product) => {
      acc[product.id] = product as unknown as Product;
      return acc;
    },
    {} as Record<string, Product>,
  );
