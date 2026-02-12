// =============================================================================
// 1. CONFIGURACIÓN DEL FORMULARIO (UI)
// =============================================================================

export interface FilterOption {
  value: string | number;
  label: string;
  hex?: string; // Para mostrar la bolita de color
}

export interface FilterGroupData {
  id: string;   // Clave para el estado (ej: "size", "color", "material")
  label: string;
  type: 'size' | 'color' | 'button' | string;
  options: FilterOption[];
}

export interface ProductConfig {
  title?: string;
  groups: FilterGroupData[];
}

// =============================================================================
// 2. MODELO DE DATOS DE PRODUCTO (DOMINIO)
// =============================================================================

export interface ColorVariant {
  variantId: string | number;
  color: string;
  imageA: string;
  imageB: string;
  stock: number;
  availableSizes?: string[];
}

// ProductInput: Interfaz flexible para datos crudos (ej: desde un JSON o API)
export interface ProductInput {
  id?: string | number;
  productId?: string | number;
  name?: string;
  title?: string;
  price: number;
  type?: string;
  
  // Imágenes y Stock (Producto simple)
  imageA?: string;
  imageB?: string;
  stock?: number;
  totalStock?: number;

  // Variantes (Producto complejo)
  colorVariants?: ColorVariant[];
  availableColors?: string[];
  colors?: string[];

  // Propiedades adicionales dinámicas
  [key: string]: any;
}

// Product: Interfaz estricta para el uso interno (ej: Carrito)
// Puedes hacer que extienda de ProductInput o definirla más estrictamente
export interface Product extends ProductInput {
  id: string; // En la app interna, el ID siempre debe existir y ser string
  quantity: number;
  // Propiedades específicas del producto seleccionado
  size?: string;
  color?: string;
  material?: string;
  fitting?: string;
  neckType?: string;
}

// =============================================================================
// 3. ESTADO DEL FORMULARIO
// =============================================================================

export interface ProductFilters {
  // Campos dinámicos (coinciden con FilterGroupData.id)
  size?: string;
  color?: string;
  material?: string;
  fitting?: string;
  neckType?: string;
  
  // Campos fijos
  quantity: number;
  [key: string]: string | number | undefined;
}

// =============================================================================
// 4. HELPERS / FACTORIES
// =============================================================================

/**
 * Convierte los filtros seleccionados en un objeto Producto listo para el carrito.
 * Aquí puedes agregar lógica para generar un ID único basado en la selección.
 */
export const createProductFromFilters = (filters: ProductFilters): Product => {
  // Generamos un ID temporal o compuesto
  const tempId = `custom-${Date.now()}`;
  
  return {
    id: tempId,
    productId: tempId, // O el ID real del producto padre si lo tuvieras disponible
    name: "Producto Personalizado", // Idealmente pasarías el nombre real aquí
    price: 10000, // Idealmente pasarías el precio real aquí
    quantity: filters.quantity || 1,
    
    // Mapeamos los filtros seleccionados a las propiedades del producto
    size: String(filters.size || ""),
    color: String(filters.color || ""),
    material: String(filters.material || ""),
    fitting: String(filters.fitting || ""),
    neckType: String(filters.neckType || ""),
    
    // Imagen por defecto (o lógica para elegir la imagen correcta según color)
    imageA: "/placeholder.png", 
  };
};