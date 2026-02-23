import type { Color } from "./color";

export interface Product {
  id: string;
  productId?: string | number;
  name?: string;
  title?: string;
  price: number;
  type?: string;
  quantity: number;
  size?: string;
  color?: string;
  material?: string;
  fitting?: string;
  neckType?: string;
  imageA?: string;
  imageB?: string;
  stock?: number;
  totalStock?: number;
  colorVariants?: Color[];
  availableColors?: string[];
  colors?: string[];
  [key: string]: any;
}