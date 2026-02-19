export interface ShippingRate {
  cp: string;
  provincia: string;
  costoEnvio: number;
}

// Interfaz para lo que guardas en el Context
export interface ShippingDestination extends ShippingRate {
  costoDisplay: string;
}