import { createContext, useMemo, useCallback, useContext, type ReactNode } from "react";
import { useLocalStorageState } from "../shared/hooks/useLocalStorageState"; 
import type { Product } from "../shared/domain/product";

export interface CartItem extends Product {
  quantity: number; 
}

interface CartContextType {
  cart: CartItem[];
  shippingDestination: any | null; 
  cartCount: number;
  cartTotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  setShippingDestinationInfo: (destination: any) => void;
}

// CREACIÓN DEL CONTEXTO
export const CartContext = createContext<CartContextType | null>(null);

// HOOK PARA CONSUMIR EL CONTEXTO
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartContextProvider");
  }
  return context;
};

// PROVEEDOR DEL CONTEXTO
interface CartContextProviderProps {
  children: ReactNode;
}
export const CartContextProvider = ({ children }: CartContextProviderProps) => {
  const [cart, setCart] = useLocalStorageState<CartItem[]>('cart', []);
  const [shippingDestination, setShippingDestination] = useLocalStorageState<any>('shippingDestination', null);
  
  const addToCart = useCallback((product: Product) => {
    setCart((prev: CartItem[]) => {
      const existing = prev.find(item => String(item.id) === String(product.id));
      
      if (existing) {
        return prev.map(item =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  }, [setCart]);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev: CartItem[]) => prev.filter(item => String(item.id) !== String(id)));
  }, [setCart]);

  const increaseQuantity = useCallback((id: string) => {
    setCart((prev: CartItem[]) => prev.map(item =>
      String(item.id) === String(id) ? { ...item, quantity: item.quantity + 1 } : item
    ));
  }, [setCart]);

  const decreaseQuantity = useCallback((id: string) => {
    setCart((prev: CartItem[]) => {
      const itemToDecrease = prev.find(item => String(item.id) === String(id));  
      if (itemToDecrease && itemToDecrease.quantity === 1) {    // Si la cantidad es 1 y bajamos, lo eliminamos
        return prev.filter(item => String(item.id) !== String(id));
      }
      
      return prev.map(item =>
        String(item.id) === String(id) ? { ...item, quantity: item.quantity - 1 } : item
      );
    });
  }, [setCart]);

  const clearCart = useCallback(() => {
    setCart([]); 
    setShippingDestination(null); 
  }, [setCart, setShippingDestination]);

  const cartCount = useMemo(
    () => cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0),
    [cart]
  );

  const cartTotal = useMemo(
    () => cart.reduce((total: number, item: CartItem) => total + item.price * item.quantity, 0),
    [cart]
  );

  const setShippingDestinationInfo = useCallback((destination: any) => {
    setShippingDestination(destination); 
  }, [setShippingDestination]);

  const value = useMemo<CartContextType>(() => ({
    cart,
    cartCount,
    cartTotal,
    shippingDestination,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    setShippingDestinationInfo
  }), [
    cart,
    cartCount,
    cartTotal,
    shippingDestination,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    setShippingDestinationInfo
  ]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};