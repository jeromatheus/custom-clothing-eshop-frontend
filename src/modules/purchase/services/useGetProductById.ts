import { useFetch } from '../../../shared/hooks/useFetch'; 
import { type ProductVariantDetailDto } from '../interfaces';

export const useGetProductById = (productId: string | undefined) => {
  const endpoint = productId ? `/products/${productId}` : '';
  const result = useFetch<ProductVariantDetailDto>(endpoint);
  return result;
};