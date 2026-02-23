import { useFetch } from '../../../shared/hooks/useFetch'; 
import { type FeaturedProductVariantDto } from '../interfaces';


export interface GetProductVariantsResponse {
  products: FeaturedProductVariantDto[]; 
}

export const useCatalog = (productType: string) => {
  // 1. Construimos la URL específica del negocio
  const endpoint = `/products/type/${encodeURIComponent(productType)}`;

  // 2. Usamos el hook genérico pasándole el Tipo de Respuesta esperado (Generics)
  // Esto hace que 'data' sea autocompletado por TypeScript como GetProductVariantsResponse
  const result = useFetch<GetProductVariantsResponse>(endpoint);

  return result;
};