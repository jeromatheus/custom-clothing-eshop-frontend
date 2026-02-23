import { useFetch } from '../../../shared/hooks/useFetch'; 
import { type ProductResponse } from '../interfaces';

export const useGetProductById = (productId: string | undefined) => {
  const endpoint = productId ? `/products/${productId}` : '';
  const result = useFetch<ProductResponse>(endpoint);
  return result;
};