export interface ProductDto {
  name: string;
  sku: string;
  price: number;            
  mainImageUrl: string;
  availableColors: string[]; 
  hasStock: boolean;        
}

export interface GetProductsResponse {
  products: ProductDto[]; 
}