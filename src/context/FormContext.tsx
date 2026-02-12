import { createContext, useState, useContext, type ReactNode, type Dispatch, type SetStateAction } from "react";
import type { ProductFilters } from "../shared/domain/product";

interface FormContextType {
  filters: ProductFilters;
  setFilters: Dispatch<SetStateAction<ProductFilters>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

// CREACIÓN DEL CONTEXTO: el contexto se mantiene privado - sin export - así obligamos a usar el hook 
const FormContext = createContext<FormContextType | null>(null);

// HOOK PARA CONSUMIR EL CONTEXTO
export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  
  if (!context) {
    throw new Error("useForm debe ser usado dentro de un FormContextProvider");
  }
  
  return context;
};

// PROVEEDOR DEL CONTEXTO
interface FormContextProviderProps {
  children: ReactNode;
}
export const FormContextProvider = ({ children }: FormContextProviderProps) => {
  const [filters, setFilters] = useState<ProductFilters>({
    neckType: "Redondo",
    material: "Algodón",
    fitting: "Regular",
    color: "Black",
    size: "S",
    quantity: 1,
  });   
  const [loading, setLoading] = useState<boolean>(false); 

  return (
    <FormContext.Provider value={{ filters, setFilters, loading, setLoading }}>
      {children}
    </FormContext.Provider>
  );
};