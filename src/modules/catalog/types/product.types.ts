export interface ProductDto {
  name: string;
  id: string;
  price: number;            
  mainImageUrl: string;
  availableColors: string[]; 
  hasStock: boolean;        
}

export interface GetProductsResponse {
  products: ProductDto[]; 
}