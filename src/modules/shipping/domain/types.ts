export interface ShippingRate {
  cp: string;
  provincia: string;
  costoEnvio: number;
}

export interface ShippingResult extends ShippingRate {
  costoDisplay: string;
}