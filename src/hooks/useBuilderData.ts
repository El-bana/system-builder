import { use } from "react";
import { getSnapshot, setCart } from "../stores/cartStore";
import type { BuilderData, MockApiResponse, Product } from "../types";

// A global cache for the promise to ensure it doesn't get recreated on re-renders.
// as it's static data that won't change in the same session so calculating it once
// storing it in a var and only refetching when it's null is the reasonable choice
// no need for invalidation logic too

let builderDataPromise: Promise<{
  data: BuilderData;
  productLookup: Record<string, Product>;
}> | null = null;

function fetchBuilderData() {
  if (!builderDataPromise) {
    builderDataPromise = fetch("/api/builder")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch builder data");
        return res.json();
      })
      .then((response: MockApiResponse) => {
        const { builderData, initialCart } = response;

        // this dictionary will be used for the review panel to quickly get the product from the cart item, we could change the data in the cart to store
        // the full product but this will hurt in some scenarios like if theoratically the user saved the system and later on the backend's price changed
        // it will either keep it with the old price in the cart, that will lose company money, or add logic to verify everytime that the cart is up-to-date
        // with the backend's products, so normalizing the data only having the necessary data for the cart on the cartItem, and fetching the rest of
        // the dynamic data is the much better pattern
        const lookup: Record<string, Product> = {};
        Object.values(builderData)
          .flat()
          .forEach((product) => {
            lookup[product.id] = product as unknown as Product;
          });

        // prepopulate the cart with the initial cart from the figma that we have in our db.json if local storage is empty
        if (
          getSnapshot().length === 0 &&
          initialCart &&
          initialCart.length > 0
        ) {
          setCart(initialCart);
        }

        return { data: builderData, productLookup: lookup };
      });
  }
  return builderDataPromise;
}

export function useBuilderData() {
  return use(fetchBuilderData());
}
