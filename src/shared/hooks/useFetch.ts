import { useState, useEffect, useCallback } from 'react';
import { type AxiosRequestConfig, AxiosError } from 'axios';
import { axiosInstance } from '../api/axios.client';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useFetch = <T>(url: string, options?: AxiosRequestConfig) => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    
    // Controller para cancelar la petición si el componente se desmonta
    const controller = new AbortController();

    try {
      const response = await axiosInstance.get<T>(url, {
        ...options,
        signal: controller.signal,
      });

      setState({ data: response.data, loading: false, error: null });
    } catch (err) {
      const error = err as AxiosError;
      
      if (error.name !== 'CanceledError') {
        setState({
          data: null,
          loading: false,
          error: error.message || 'Ocurrió un error desconocido',
        });
      }
    }

    return () => controller.abort();
  }, [url]); // Se re-ejecuta si cambia la URL

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Retornamos también 'refetch' por si quieres recargar manualmente (ej: botón "Reintentar")
  return { ...state, refetch: fetchData };
};