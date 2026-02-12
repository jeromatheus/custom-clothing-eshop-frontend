import type { ShippingRate } from '../domain/types';

export const SHIPPING_RATES = [
  {
    cp: "4000",
    ciudad: "San Miguel de Tucumán",
    provincia: "Tucumán",
    costoEnvio: 500
  },
  {
    cp: "C1000",
    ciudad: "Ciudad Autónoma de Buenos Aires",
    provincia: "CABA",
    costoEnvio: 1200
  },
  {
    cp: "B1900",
    ciudad: "La Plata",
    provincia: "Buenos Aires",
    costoEnvio: 1500
  },
  {
    cp: "B8000",
    ciudad: "Bahía Blanca",
    provincia: "Buenos Aires",
    costoEnvio: 1800
  },
  {
    cp: "X5000",
    ciudad: "Córdoba",
    provincia: "Córdoba",
    costoEnvio: 1700
  },
    {
    cp: "X5900",
    ciudad: "Villa María",
    provincia: "Córdoba",
    costoEnvio: 1900
  },
  {
    cp: "T4000",
    ciudad: "San Miguel de Tucumán",
    provincia: "Tucumán",
    costoEnvio: 2000
  },
  {
    cp: "M5500",
    ciudad: "Mendoza",
    provincia: "Mendoza",
    costoEnvio: 2100
  },
  {
    cp: "R8300",
    ciudad: "Neuquén",
    provincia: "Neuquén",
    costoEnvio: 2300
  },
  {
    cp: "U9000",
    ciudad: "Comodoro Rivadavia",
    provincia: "Chubut",
    costoEnvio: 2600
  },
  {
    cp: "Z9400",
    ciudad: "Río Gallegos",
    provincia: "Santa Cruz",
    costoEnvio: 3000
  },
  {
    cp: "V9410",
    ciudad: "Ushuaia",
    provincia: "Tierra del Fuego",
    costoEnvio: 3500
  }
];


export const findShippingRateByCP = (postalCode: string): ShippingRate | null => {
  if (!postalCode) return null;
  
  const rate = SHIPPING_RATES.find(
    (d) => d.cp.toLowerCase() === postalCode.toLowerCase()
  );

  return rate || null;
};