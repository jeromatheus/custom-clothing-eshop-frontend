import { useFetch } from '../../../shared/hooks/useFetch'; 
import { type GetProductsResponse } from '../types/product.types';

export const useCatalog = (productType: string) => {
  // 1. Construimos la URL específica del negocio
  const endpoint = `/products/type/${encodeURIComponent(productType)}`;

  // 2. Usamos el hook genérico pasándole el Tipo de Respuesta esperado (Generics)
  // Esto hace que 'data' sea autocompletado por TypeScript como GetProductsResponse
  const result = useFetch<GetProductsResponse>(endpoint);

  return result;
};