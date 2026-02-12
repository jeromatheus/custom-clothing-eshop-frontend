export interface ProductDto {
  id: string;              
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