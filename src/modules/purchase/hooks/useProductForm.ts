import { useState, useCallback, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2";
import { useCart } from "../../../context/CartContext"; 
import { useForm } from "../../../context/FormContext";
import { 
  createProductFromFilters, 
  type Product, 
  type ProductFilters,
  type ProductConfig 
} from "../../../shared/domain/product";

// --- UI HELPERS ---
function showSuccessToast(product: Product): void {
  Swal.fire({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    showCloseButton: true,
    timer: 5000,
    timerProgressBar: true,
    background: "#fff",
    customClass: {
      popup: "swal-add-cart",
    },
    html: `
      <div style="display:flex; align-items:center; gap:10px;">
        <img src="${product.image}" 
             alt="${product.material}" 
             style="width:45px; height:45px; border-radius:4px; object-fit:cover;" />
        <div style="font-size:14px; text-align:left;">
          <strong>${product.material} - ${product.fitting}</strong><br/>
          Talle: ${product.size}
        </div>
      </div>
    `,
  });
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function useProductForm(config?: ProductConfig) {
  // A. Consumimos los contextos globales
  const { addToCart } = useCart(); 
  const { filters, setFilters, loading, setLoading } = useForm();
  // B. Estado Local (Solo para UI del botón y alertas)
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  // C. Limpieza de timers al desmontar
  const alertTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (alertTimer.current) {
        clearTimeout(alertTimer.current);
      }
    };
  }, []);

  // D. LÓGICA DE INICIALIZACIÓN (CORREGIDA)
  useEffect(() => {
    if (!config || !config.groups) return;

    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters } as ProductFilters;
      let hasChanges = false;
      config.groups.forEach(group => {
        if (group.options?.length > 0 && newFilters[group.id] === undefined) {
          newFilters[group.id] = group.options[0].value;
          hasChanges = true;
        }
      });

      // Aseguramos cantidad mínima
      if (newFilters.quantity === undefined) {
        newFilters.quantity = 1;
        hasChanges = true;
      }

      return hasChanges ? newFilters : prevFilters;
    });

  }, [config, setFilters]);

  // E. HANDLERS
  const handleFormChange = useCallback(
    (field: keyof ProductFilters, value: string | number) => {
      setLoading(true);
      setFilters((prev) => ({
        ...prev,
        [field]: value,
      }));
      setTimeout(() => setLoading(false), 500);
    },
    [setFilters, setLoading]
  );

  const handleAddToCart = useCallback(async () => {
    if (isAdding) return;

    if (config?.groups) {
      const missingField = config.groups.find(group => !filters[group.id]);
      if (missingField) return;
    }

    setIsAdding(true);
    await delay(1000); 

    const product = createProductFromFilters(filters);
    addToCart(product);
    showSuccessToast(product);

    setIsAdding(false);
    setShowSuccessAlert(true);

    if (alertTimer.current) {
      clearTimeout(alertTimer.current);
    }
    alertTimer.current = setTimeout(() => {
      setShowSuccessAlert(false);
    }, 5000);

    return product;
  }, [isAdding, filters, addToCart]); 

  const handleBuyNow = useCallback(async () => {
    if (isAdding) return;
    try {
      await handleAddToCart();
      // navigate("/carrito");
    } catch (error) {
      console.error("Error al procesar compra inmediata:", error);
    }
  }, [isAdding, handleAddToCart]);

  return {
    filters,
    loading,
    setFilters,
    handleFormChange,
    handleAddToCart,
    handleBuyNow,
    isAdding,
    showSuccessAlert
  };
}