export interface Color {
  variantId: string | number;
  color: string;
  imageA: string;
  imageB: string;
  stock: number;
  availableSizes?: string[];
}