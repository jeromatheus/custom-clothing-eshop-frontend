import { useState, useCallback, useRef, useEffect } from "react";
import { useCart } from "../../../context/CartContext"; 
import { type ProductFilters, type ProductConfig } from "../interfaces";
import { showSuccessToast } from "../../../shared/utils/alert";

const SUCCESS_ALERT_TIMEOUT = 5000;
const API_DELAY = 500;
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getFirstAvailableOption = (config: ProductConfig, groupId: string): string => {
  const group = config.groups.find(g => g.id === groupId);
  return group?.options[0]?.value?.toString() || "";
};

export const useProductForm = (config: ProductConfig, baseProduct?: any) => {
  const { addToCart } = useCart();
  const alertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const [filters, setFilters] = useState<ProductFilters>({
    neckType: "",
    material: "",
    fitting: "",
    color: "",
    size: "",
    quantity: 1,
  });

  useEffect(() => {
    if (baseProduct) {
      setFilters({
        neckType: baseProduct.neckType || getFirstAvailableOption(config, "neckType"),
        material: baseProduct.materialType || getFirstAvailableOption(config, "material"),
        fitting: baseProduct.fitType || getFirstAvailableOption(config, "fitType"),
        // Selección automática del primero de la lista (UX mejorada)
        color: getFirstAvailableOption(config, "color"),
        size: getFirstAvailableOption(config, "size"),
        
        quantity: 1,
      });
    }
  }, [baseProduct, config]);

  useEffect(() => {
    return () => { if (alertTimer.current) clearTimeout(alertTimer.current); };
  }, []);

  const handleFormChange = useCallback((field: keyof ProductFilters, value: string | number) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (isAdding || !baseProduct || !filters.size) return;

    setIsAdding(true);
    setLoading(true);
    
    await delay(API_DELAY); 

    // Lógica modular de creación de item
    const productToCart = {
      ...baseProduct,
      size: String(filters.size),
      color: String(filters.color),
      quantity: filters.quantity || 1,
      price: baseProduct.price,
    };

    addToCart(productToCart);
    showSuccessToast(productToCart);
    setShowSuccessAlert(true);
    
    if (alertTimer.current) clearTimeout(alertTimer.current);
    alertTimer.current = setTimeout(() => setShowSuccessAlert(false), SUCCESS_ALERT_TIMEOUT);

    setIsAdding(false);
    setLoading(false);
  }, [baseProduct, filters, isAdding, addToCart]);

  const handleBuyNow = useCallback(async () => {
    if (isAdding) return;
    await handleAddToCart();
    // Aquí se podría añadir: navigate('/checkout');
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