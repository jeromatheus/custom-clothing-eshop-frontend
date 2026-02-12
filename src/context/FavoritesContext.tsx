import { createContext, useContext, useCallback, useMemo, type ReactNode } from "react";
import { useLocalStorageState } from "../shared/hooks/useLocalStorageState";
import type { Product } from "../shared/domain/product"; 

interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  clearFavorites: () => void;
}

// CREACIÓN DEL CONTEXTO
const FavoritesContext = createContext<FavoritesContextType | null>(null);

// HOOK PARA CONSUMIR EL CONTEXTO
export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe ser usado dentro de un FavoritesContextProvider");
  }
  return context;
};

// PROVEEDOR DEL CONTEXTO
interface FavoritesProviderProps {
  children: ReactNode;
}
export const FavoritesContextProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useLocalStorageState<Product[]>('favorites', []);

  const toggleFavorite = useCallback((product: Product) => {
    setFavorites((prev) => {
      const isFavorited = prev.some(item => String(item.id) === String(product.id));
      if (isFavorited) {
        return prev.filter(item => String(item.id) !== String(product.id));
      } else {
        return [...prev, product];
      }
    });
  }, [setFavorites]);

  const isFavorite = useCallback((productId: string) => {
    return favorites.some((item) => String(item.id) === String(productId));
  }, [favorites]);

  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, [setFavorites]);

  const value = useMemo(() => ({
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites
  }), [favorites, toggleFavorite, isFavorite, clearFavorites]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};