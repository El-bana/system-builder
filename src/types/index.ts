export interface ProductVariant {
  id: string;
  name: string;
  thumbnail: string;
}

export interface Product {
  id: string;
  category: string;
  title: string;
  basePrice: number;
  description?: string;
  learnMoreUrl?: string;
  discountPercentage?: number;
  discountedPrice?: number;
  isFree?: boolean;
  isSubscription?: boolean;
  variants?: ProductVariant[];
  defaultThumbnail?: string;
}

export interface CartItem {
  productId: string;
  variantId: string | null;
  quantity: number;
}

// These are just the types of my JSON api file response so not actually required for a full application
export interface BuilderData {
  cameras: Product[];
  plans: Product[];
  sensors: Product[];
  protection: Product[];
}

export interface MockApiResponse {
  builderData: BuilderData;
  initialCart: CartItem[];
}
