// Constante para no tener "números mágicos" (0.8) dispersos por el código
const TRANSFER_DISCOUNT_FACTOR = 0.8; 

/**
 * Convierte un precio (string o number) a un número flotante válido de JS.
 * Ej: "1.500,50" -> 1500.50
 */
export const normalizePrice = (price: string | number): number => {
  if (typeof price === "number") return price;
  
  // Eliminamos puntos de miles y reemplazamos coma decimal por punto
  const cleaned = String(price).replace(/\./g, "").replace(",", ".");
  return Number(cleaned);
};

/**
 * Calcula el precio con descuento por transferencia.
 * Retorna un STRING formateado con coma (ej: "8.000,00").
 * IMPORTANTE: Esto es para visualización, no para seguir haciendo cálculos matemáticos.
 */
export const calculateTransferPrice = (price: string | number): string => {
  const numericPrice = normalizePrice(price);
  
  if (isNaN(numericPrice)) return "Error";
  
  // Aplicamos el 20% de descuento (multiplicar por 0.8)
  const discounted = numericPrice * TRANSFER_DISCOUNT_FACTOR;
  
  // Formateamos a 2 decimales y cambiamos el punto por coma para Argentina
  return discounted.toFixed(2).replace(".", ",");
};

/**
 * Formatea un número al estándar de moneda Argentina (ARS).
 * Ej: 10000 -> "$ 10.000,00"
 */
export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  });
};