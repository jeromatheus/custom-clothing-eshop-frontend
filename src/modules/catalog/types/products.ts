import type { ColorVariantDto } from "./colors";

export interface ProductInput {
  id?: string | number;
  productId?: string | number;
  name?: string;
  title?: string;
  price: number;
  type?: string;
  imageA?: string;
  imageB?: string;
  stock?: number;
  totalStock?: number;
  colorVariants?: ColorVariantDto[];
  availableColors?: string[];
  colors?: string[];
  [key: string]: any;
}