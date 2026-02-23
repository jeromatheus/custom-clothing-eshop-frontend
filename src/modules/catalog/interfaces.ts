export interface FeaturedProductVariantDto {
  id: string;
  name: string;
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