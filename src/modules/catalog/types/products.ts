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

export interface ProductVariantDto {
  name: string;
  id: string;
  price: number;            
  mainImageUrl: string;
  colors: ColorVariantSummaryDto[];
  hasStock: boolean;        
}

export interface ColorVariantSummaryDto {
  variantId: string;
  colorName: string;
  imageUrl: string;
}

export interface GetProductsResponse {
  products: ProductVariantDto[]; 
}