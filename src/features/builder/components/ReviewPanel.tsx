import { useSyncExternalStore } from "react";
import { Button } from "../../../components/ui/Button";
import { QuantityStepper } from "../../../components/ui/QuantityStepper";
import { useBuilderData } from "../../../hooks/useBuilderData";
import {
  getSnapshot,
  saveCartToStorage,
  setQuantity,
  subscribe,
} from "../../../stores/cartStore";
import type { CartItem, Product } from "../../../types";

function ReviewItemRow({
  item,
  product,
}: {
  item: CartItem;
  product: Product;
}) {
  const {
    title,
    basePrice,
    discountedPrice,
    isFree,
    isSubscription,
    variants,
    defaultThumbnail,
  } = product;

  const activeVariantData = variants?.find((v) => v.id === item.variantId);
  const imageSrc = activeVariantData?.thumbnail ?? defaultThumbnail ?? "";

  const hasDiscount = discountedPrice != null && discountedPrice < basePrice;
  const suffix = isSubscription ? "/mo" : "";

  return (
    <div className="flex justify-between items-center w-full gap-4.5">
      <div className="flex items-center gap-3">
        {imageSrc && (
          <img
            src={imageSrc}
            alt={title}
            className="size-10.25 object-contain"
          />
        )}
        <span className="text-[14px] font-medium text-gray-950">
          {title} {activeVariantData ? `(${activeVariantData.name})` : ""}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {product.id === "wyze-sense-hub" ? (
          <QuantityStepper
            disabled
            value={item.quantity}
            onValueChange={(val) =>
              setQuantity(product.id, item.variantId, val)
            }
            variant="review"
          />
        ) : (
          product.category !== "PLAN" && (
            <QuantityStepper
              value={item.quantity}
              onValueChange={(val) =>
                setQuantity(item.productId, item.variantId, val)
              }
              variant="review"
              min={0}
            />
          )
        )}

        <div className="flex flex-col items-end">
          {hasDiscount && !isFree && (
            <span className="text-[14px] font-semibold text-slate-500 line-through">
              ${basePrice.toFixed(2)}
              {suffix}
            </span>
          )}
          {isFree ? (
            <>
              {basePrice > 0 && (
                <span className="text-[14px] font-semibold text-slate-500 line-through">
                  ${basePrice.toFixed(2)}
                  {suffix}
                </span>
              )}
              <span className="text-[14px] font-semibold text-purple-600">
                FREE
              </span>
            </>
          ) : hasDiscount ? (
            <span className="text-[14px] font-semibold text-purple-600">
              ${discountedPrice!.toFixed(2)}
              {suffix}
            </span>
          ) : (
            <span className="text-[14px] font-semibold text-purple-600">
              ${basePrice.toFixed(2)}
              {suffix}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export function ReviewPanel() {
  const { productLookup } = useBuilderData();
  const cartItems = useSyncExternalStore(subscribe, getSnapshot);

  const groupedItems: Record<string, CartItem[]> = {};
  for (const item of cartItems) {
    const product = productLookup[item.productId];
    if (!product) continue;

    const category = product.category || "OTHER";
    if (!groupedItems[category]) {
      groupedItems[category] = [];
    }
    groupedItems[category].push(item);
  }

  // To match the visual order roughly: CAMERAS, SENSORS, ACCESSORIES, PLAN
  const SORT_ORDER = [
    "CAMERAS",
    "SENSORS",
    "ACCESSORIES",
    "PLAN",
    "EXTRA PROTECTION",
  ];

  const categoryKeys = Object.keys(groupedItems).sort((a, b) => {
    const indexA = SORT_ORDER.indexOf(a.toUpperCase());
    const indexB = SORT_ORDER.indexOf(b.toUpperCase());

    if (indexA === -1 && indexB === -1) return a.localeCompare(b);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  // Compute totals
  let totalBasePrice = 0;
  let totalDiscountedPrice = 0;

  for (const item of cartItems) {
    const product = productLookup[item.productId];
    if (!product) continue;

    const qty = item.quantity;
    const base = product.basePrice * qty;
    const discounted = (product.discountedPrice ?? product.basePrice) * qty;

    totalBasePrice += base;
    if (!product.isFree) {
      totalDiscountedPrice += discounted;
    }
  }

  // Adding shipping base price to total base price if we assume shipping was $5.99 originally
  totalBasePrice += 5.99;

  const totalSavings = totalBasePrice - totalDiscountedPrice;

  return (
    <div className="flex flex-col p-3.75 bg-blue-50 rounded-[10px]">
      <span className="text-[12px] font-medium text-gray-700 uppercase">
        REVIEW
      </span>
      <div className="flex flex-col gap-1.25 mt-6.25 pb-3.75 px-1.25">
        <h2 className="text-[22px] font-semibold text-gray-900">
          Your security system
        </h2>
        <p className="text-[14px] font-medium text-gray-900/75">
          Review your personalized protection system designed to keep what
          matters most safe.
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        {categoryKeys.map((category) => (
          <div
            key={category}
            className="pt-3.75 border-t border-gray-300 flex flex-col"
          >
            <h3 className="uppercase text-[12px] font-normal text-[#A8B2BD] mb-2">
              {category}
            </h3>
            <div className="flex flex-col space-y-3">
              {groupedItems[category].map((item, idx) => {
                const product = productLookup[item.productId];
                const key = `${item.productId}-${item.variantId ?? "default"}-${idx}`;
                return (
                  <ReviewItemRow key={key} item={item} product={product} />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3.75 border-t border-gray-300 mt-2.5">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-3">
            <img
              src="/images/shipping.png"
              alt="Fast Shipping"
              className="size-10.25 object-contain"
            />
            <span className="text-[14px] font-medium text-gray-950">
              Fast Shipping
            </span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[14px] font-semibold text-slate-500 line-through">
              $5.99
            </span>
            <span className="text-[14px] font-semibold text-purple-600">
              FREE
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-between items-start">
        <img
          src="/images/badge.png"
          alt="Satisfaction Guarantee"
          className="size-19.5 object-contain"
        />
        <div className="flex flex-col items-end gap-1.25">
          <div className="bg-purple-600 text-white text-xs tracking-tighter font-medium px-2.25 py-px rounded-[3px]">
            as low as $19.19/mo
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-medium text-slate-500 line-through">
              ${totalBasePrice.toFixed(2)}
            </span>
            <span className="text-2xl font-bold text-purple-600">
              ${totalDiscountedPrice.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {totalSavings > 0 && (
        <div className="mt-3.5 text-center text-teal-600 text-xs font-semibold">
          Congrats! You&apos;re saving ${totalSavings.toFixed(2)} on your
          security bundle!
        </div>
      )}

      <Button size="lg" fullWidth>
        Checkout
      </Button>

      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          saveCartToStorage();
          alert("Your system has been securely saved for later!");
        }}
        className="mt-3.75 text-center text-[13px] font-medium text-gray-500 underline decoration-gray-400 underline-offset-4 hover:text-gray-700 bg-transparent border-none cursor-pointer w-full"
      >
        Save my system for later
      </button>
    </div>
  );
}
