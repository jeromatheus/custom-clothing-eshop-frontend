export interface ProductVariantDetailDto {
  id: string; 
  name: string;
  price: number;
  garmentType: string;
  neckType: string;
  fitType: string;
  materialType: string;
  warmthLevel: number;
  sizeChart: SizeSpecDto[];
  variants: ColorVariantDto[];
  models: ModelDto[];
}

export interface SizeSpecDto {
  size: string;
  chest: number;
  length: number;
  neck: number;
}

export interface ColorVariantDto {
  variantId: string;
  colorName: string;
  sizes: SizeStockDto[];
}

export interface SizeStockDto {
  size: string;
  stock: number;
}

export interface ModelDto {
  id: string;
  name: string;
  colorName: string;
  heightInfo: string;
  sizeInfo: string;
  imageUrl: string;
  carouselImages: string[];
}

// -----------------------------


export interface FilterOption {
  value: string | number;
  label: string;
  hex?: string; 
}

export interface FilterGroupData {
  id: string;
  label: string;
  type: 'size' | 'color' | 'button' | string;
  options: FilterOption[];
}

export interface ProductConfig {
  groups: FilterGroupData[];
}


export interface ProductFilters {
  // Campos dinámicos (coinciden con FilterGroupData.id)
  size?: string;
  color?: string;
  material?: string;
  fitType?: string;
  neckType?: string;
  // Campos fijos
  quantity: number;
  [key: string]: string | number | undefined;
}