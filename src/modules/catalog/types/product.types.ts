export interface ProductDto {
  id: string;
  sku: string;
  price: number;
  name: string;
  mainImageUrl: string;
  hasStock: boolean;         
  availableColors: string[];
}

export interface GetProductsResponse {
  products: ProductDto[]; 
}