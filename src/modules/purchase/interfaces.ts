/**
 * DTOs que vienen de la API
 */

// Esta es la interfaz clave para solucionar el error de "productData.product"
export interface ProductResponse {
  product: ProductVariantDetailDto;
}

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

// ---------------------------------------------------------
/**
 * Interfaces para la lógica del Formulario y Filtros
 */

export interface FilterOption {
  value: string | number;
  label: string;
  hex?: string; // Para los círculos de colores
}

export interface FilterGroupData {
  id: string; // Ej: 'color', 'size'
  label: string; // Ej: 'Talle'
  type: 'size' | 'color' | 'button' | string;
  options: FilterOption[];
}

export interface ProductConfig {
  groups: FilterGroupData[];
}

export interface ProductFilters {
  // Coinciden con los IDs de FilterGroupData
  size: string;
  color: string;
  material: string;
  fitting: string; // Cambiado para matchear con useProductForm
  neckType: string;
  quantity: number;
  [key: string]: string | number | undefined;
}

/**
 * Interfaz para el Carrito (Lo que guardas en el Context)
 */
export interface CartItem extends Partial<ProductVariantDetailDto> {
  size: string;
  color: string;
  quantity: number;
}