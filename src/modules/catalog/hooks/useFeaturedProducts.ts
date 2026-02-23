import { useMemo, useCallback } from "react";
import { useFavorites } from "../../../context/FavoritesContext";
import { useResponsiveVisibleCount } from "../hooks/useResponsiveVisibleCount";
import { useNavigate } from 'react-router-dom';
import type { FeaturedProductVariantDto } from "../interfaces";
import type { Product } from "../../../shared/domain/product";

export const useFeaturedProducts = (products: FeaturedProductVariantDto[]) => {
  const visibleCount = useResponsiveVisibleCount();
  const navigate = useNavigate();
  const { toggleFavorite: toggleFavContext } = useFavorites();

  const toggleFavorite = useCallback((product: FeaturedProductVariantDto) => {
    toggleFavContext(product as unknown as Product);
  }, [toggleFavContext]);

  const handleProductSelect = useCallback((product: FeaturedProductVariantDto) => {
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