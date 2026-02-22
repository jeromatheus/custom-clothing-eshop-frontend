import { useState, type MouseEvent } from "react";
import { calculateTransferPrice } from "../../../shared/utils/prices";
import { useFavorites } from "../../../context/FavoritesContext";
import type { FeaturedProductVariantDto } from "../types/FeaturedProductVariantDto"; 

export interface ProductCardHandlers {
  onFavoriteClick?: (product: FeaturedProductVariantDto) => void;
  onGoToProducClick?: (product: FeaturedProductVariantDto) => void;
  onColorSelect?: (id: string, color: string) => void;
}

export const useProductCard = (product: FeaturedProductVariantDto, handlers: ProductCardHandlers) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  
  const { isFavorite } = useFavorites();

  const availableColors = product.colors;

  const currentImage = product.mainImageUrl;
  
  const transferPrice = calculateTransferPrice(product.price);

  const isFav = isFavorite(product.id);

  // HANDLERS
  const handleFavorite = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handlers.onFavoriteClick?.(product);
  };

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    handlers.onColorSelect?.(product.id, color);
  };

  const handleGoToProduct = () => {
    handlers.onGoToProducClick?.(product);
  };

  return {
    ui: {
      isHovered,
      setIsHovered,
      selectedColor, 
      isFav
    },
    data: {
      id: product.id,
      name: product.name, 
      price: product.price,
      transferPrice,
      hasStock: product.hasStock,      
      availableColors, 
      imageA: currentImage,
      imageB: currentImage 
    },
    actions: {
      handleFavorite,
      handleColorSelect,
      handleGoToProduct
    }
  };
};