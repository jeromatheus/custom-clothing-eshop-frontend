import { useState, useCallback, useRef, useEffect } from "react";
import { useCart } from "../../../context/CartContext"; 
import { type ProductFilters, type ProductConfig } from "../interfaces";
import { showSuccessToast } from "../../../shared/utils/alert";


const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useProductForm = (_config: ProductConfig, baseProduct?: any) => {
  const { addToCart } = useCart();
  const alertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // 1. EL ESTADO AHORA ES LOCAL
  const [filters, setFilters] = useState<ProductFilters>({
    neckType: baseProduct?.neckType || "",
    material: baseProduct?.material || "",
    fitting: baseProduct?.fitting || "",
    color: baseProduct?.color || "",
    size: "", 
    quantity: 1,
  });

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  // 2. SINCRONIZACIÓN
  useEffect(() => {
    if (baseProduct) {
      setFilters((prev) => ({
        ...prev,
        neckType: baseProduct.neckType || prev.neckType,
        material: baseProduct.material || prev.material,
        fitting: baseProduct.fitting || prev.fitting,
        color: baseProduct.id || baseProduct.color || prev.color,
      }));
    }
  }, [baseProduct]);

  // Limpieza del timer al desmontar
  useEffect(() => {
    return () => {
      if (alertTimer.current) {
        clearTimeout(alertTimer.current);
      }
    };
  }, []);

  // 3. HANDLERS
  const handleFormChange = useCallback((field: keyof ProductFilters, value: string | number) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (isAdding || !filters.size || !baseProduct) return;

    setIsAdding(true);
    setLoading(true);
    
    await delay(500); 

    const productToCart = {
      ...baseProduct,
      size: String(filters.size),
      color: String(filters.color),
      quantity: filters.quantity || 1
    };

    addToCart(productToCart);
    
    // Llamamos a la utilidad importada
    showSuccessToast(productToCart);
    setShowSuccessAlert(true);
    
    if (alertTimer.current) clearTimeout(alertTimer.current);
    alertTimer.current = setTimeout(() => setShowSuccessAlert(false), 5000);

    setIsAdding(false);
    setLoading(false);
  }, [baseProduct, filters, isAdding, addToCart]);

  const handleBuyNow = useCallback(async () => {
    if (isAdding) return;
    try {
      await handleAddToCart();
      // window.location.href = "/carrito"; 
    } catch (error) {
      console.error("Error al procesar compra inmediata:", error);
    }
  }, [isAdding, handleAddToCart]);

  return {
    filters,
    loading,
    isAdding,
    showSuccessAlert,
    handleFormChange,
    handleAddToCart,
    handleBuyNow
  };
};