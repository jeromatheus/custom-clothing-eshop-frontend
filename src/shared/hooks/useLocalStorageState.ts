import { useState, useEffect, type Dispatch, type SetStateAction } from "react";

export function useLocalStorageState<T>(
  key: string, 
  defaultValue: T
): [T, Dispatch<SetStateAction<T>>] { 
  
  const [state, setState] = useState<T>(() => {
    try {
      const storedItem = window.localStorage.getItem(key);
      return storedItem ? JSON.parse(storedItem) : defaultValue;
    } catch (error) {
      console.warn(`Error al leer la clave "${key}" de localStorage:`, error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.warn(`Error al guardar la clave "${key}" en localStorage:`, error);
    }
  }, [key, state]);

  return [state, setState];
}