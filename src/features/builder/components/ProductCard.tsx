import { useState } from "react";
import { QuantityStepper } from "../../../components/ui/QuantityStepper";
import { cn } from "../../../lib/utils";
import {
  setQuantity,
  useTotalQuantity,
  useVariantQuantity,
} from "../../../stores/cartStore";
import type { Product, ProductVariant } from "../../../types";
import { VariantSelector } from "./VariantSelector";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const {
    title,
    description,
    learnMoreUrl,
    discountPercentage,
    basePrice,
    discountedPrice,
    variants,
    defaultThumbnail,
  } = product;

  const [selectedVariant, setSelectedVariant] = useState<string | undefined>(
    variants && variants.length > 0 ? variants[0].id : undefined,
  );

  const quantity = useVariantQuantity(product.id, selectedVariant ?? null);
  const totalQuantity = useTotalQuantity(product.id);

  const activeVariantData: ProductVariant | undefined = variants?.find(
    (v) => v.id === selectedVariant,
  );
  const imageSrc = activeVariantData?.thumbnail ?? defaultThumbnail ?? "";

  const isSelected = totalQuantity > 0;
  const hasDiscount =
    discountPercentage != null &&
    discountedPrice != null &&
    discountPercentage > 0;

  return (
    <article
      className={cn(
        "grid grid-cols-1 lg:grid-cols-[101px_1fr] gap-5 p-2.75 bg-white rounded-[10px] h-full border-2 transition-colors duration-200",
        isSelected ? "border-purple-600/70" : "border-transparent",
      )}
    >
      <div className="flex flex-col items-start max-lg:items-center">
        <div className="w-full h-34.25 flex items-center justify-center relative">
          {hasDiscount && (
            <span className="bg-purple-600 absolute top-0 left-0 text-white text-[12px] font-semibold px-2 py-0.5 rounded-full mb-2">
              Save {discountPercentage}%
            </span>
          )}
          <img
            src={imageSrc}
            alt={title}
            className="object-contain max-w-full max-h-full"
          />
        </div>
      </div>

      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-2">
          <h3 className="text-[16px] font-semibold text-gray-900">{title}</h3>
          {(description || learnMoreUrl) && (
            <p className="text-[12px] font-medium text-gray-900/75">
              {description}
              {description && learnMoreUrl && " "}
              {learnMoreUrl && (
                <a
                  href={learnMoreUrl}
                  className="text-link-blue text-[12px] font-medium underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn More
                </a>
              )}
            </p>
          )}
        </div>

        {variants && variants.length > 0 && selectedVariant && (
          <div className="mt-3">
            <VariantSelector
              variants={variants}
              value={selectedVariant}
              onChange={setSelectedVariant}
            />
          </div>
        )}

        <div className="pt-2.5 flex items-center justify-between">
          {product.id === "wyze-sense-hub" ? (
            <QuantityStepper
              disabled
              value={quantity}
              onValueChange={(val) =>
                setQuantity(product.id, selectedVariant ?? null, val)
              }
              variant="catalog"
            />
          ) : (
            product.category !== "PLAN" && (
              <QuantityStepper
                value={quantity}
                onValueChange={(val) =>
                  setQuantity(product.id, selectedVariant ?? null, val)
                }
                variant="catalog"
              />
            )
          )}

          <div className="flex flex-col items-end">
            {hasDiscount ? (
              <>
                <span className="text-red-500 line-through text-[16px] font-normal">
                  ${basePrice.toFixed(2)}
                </span>
                <span className="text-gray-500 text-[16px] font-normal">
                  ${discountedPrice!.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-gray-500 text-[16px] font-normal">
                ${basePrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
