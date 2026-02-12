import { useMemo, useCallback } from "react";
import { useForm } from "../../../context/FormContext";
import { useFavorites } from "../../../context/FavoritesContext";
import { useResponsiveVisibleCount } from "../hooks/useResponsiveVisibleCount";
import type { ProductInput } from "./useProductCard";
import type { Product } from "../../../shared/domain/product";

export const useFeaturedProducts = (products: ProductInput[]) => {
  const visibleCount = useResponsiveVisibleCount();
  
  const { toggleFavorite: toggleFavContext } = useFavorites();
  const { setFilters } = useForm(); // Hook verifica si es null

  // Wrapper para adaptar los tipos (ProductInput -> Product)
  const toggleFavorite = useCallback((product: ProductInput) => {
    toggleFavContext(product as unknown as Product);
  }, [toggleFavContext]);

  const handleProductSelect = useCallback((product: ProductInput) => {
    setFilters((prev) => ({
      ...prev,
      material: product.material, // Posibles validaciones extra si es undefined
      neckType: product.neckType,
      fitting: product.fitting,
      color: product.color,
      size: product.size,
      quantity: prev.quantity || 1, 
    }));
    
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [setFilters]);

  const slides = useMemo(() => {
    if (!products || products.length === 0) return [];
    
    const chunks = [];
    for (let i = 0; i < products.length; i += visibleCount) {
      chunks.push(products.slice(i, i + visibleCount));
    }
    return chunks;
  }, [products, visibleCount]);

  return {
    slides,
    visibleCount,
    toggleFavorite,
    handleProductSelect
  };
};