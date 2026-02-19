export interface ProductDetailDto {
  id: string;
  price: number;
  type: string;      
  imageGroups: ProductImageGroupDto[];
  variants: ProductVariantDto[];
  measurements: ProductMeasurementDto[];
  warmthLevel: number;
}

export interface ProductImageGroupDto {
  name: string;     
  images: string[];  
}

export interface ProductVariantDto {
  id: string;
  color: string;     
  size: string;      
  stock: number;     
}

export interface ProductMeasurementDto {
  name: string;      
  size: string;      
  value: number;    
}

export interface ProductInput {
  material?: string;
  neckType?: string; 
  fitting?: string;  
  color?: string;    
  size?: string;     
}