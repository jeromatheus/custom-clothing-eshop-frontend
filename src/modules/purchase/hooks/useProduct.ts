import { useFetch } from '../../../shared/hooks/useFetch'; 
import { type ProductDetailDto } from '../types/product.types';

export const useProduct = (productId: string | undefined) => {
  const endpoint = productId ? `/products/${productId}` : '';
  const result = useFetch<ProductDetailDto>(endpoint);
  return result;
};