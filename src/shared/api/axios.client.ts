import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://localhost:7086/', // Tu puerto de la API .NET
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de respuesta (Opcional: para limpiar errores)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Aquí podrías loguear a un servicio externo o manejar 401 (token vencido)
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);