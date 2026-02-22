import { useMemo, useCallback } from "react";
import { useFavorites } from "../../../context/FavoritesContext";
import { useResponsiveVisibleCount } from "../hooks/useResponsiveVisibleCount";
import { useNavigate } from 'react-router-dom';
import type { ProductVariantDto } from "../types/products";
import type { Product } from "../../../shared/domain/product";

export const useFeaturedProducts = (products: ProductVariantDto[]) => {
  const visibleCount = useResponsiveVisibleCount();
  const navigate = useNavigate();
  const { toggleFavorite: toggleFavContext } = useFavorites();

  const toggleFavorite = useCallback((product: ProductVariantDto) => {
    toggleFavContext(product as unknown as Product);
  }, [toggleFavContext]);

  const handleProductSelect = useCallback((product: ProductVariantDto) => {
    alert(product.id)
    navigate(`/purchase/${product.id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [navigate]);

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