import { useState } from 'react';
import { findShippingRateByCP } from '../../../shared/constants/shippingRepository';
import { formatCurrency } from '../domain/currency';
import type { ShippingRate, ShippingResult } from '../domain/types';

interface UseShippingCalculatorParams {
  currentCost?: string; 
  onSave?: (result: ShippingResult) => void;
}

export const useShippingCalculator = ({ currentCost, onSave }: UseShippingCalculatorParams) => {
  const [showModal, setShowModal] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [calculatedRate, setCalculatedRate] = useState<ShippingRate | null>(null);

  const handleOpenModal = () => {
    setShowModal(true);
    setCalculatedRate(null);
    setError(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setPostalCode('');
    setCalculatedRate(null);
    setError(null);
  };

  const handleCalculateShipping = () => {
    if (!postalCode) return;
    // 1. Capa de Datos
    const rate = findShippingRateByCP(postalCode);
    if (rate) {
      setCalculatedRate(rate);
      setError(null);
    } else {
      setCalculatedRate(null);
      setError('Código postal no encontrado');
    }
  };

  const handleSaveDestination = () => {
    if (!calculatedRate) return;
    // 2. Preparar objeto final (Dominio)
    const result: ShippingResult = {
      ...calculatedRate,
      costoDisplay: formatCurrency(calculatedRate.costoEnvio)
    };
    // 3. Emitir evento al padre (sin saber quién es el padre ni usar contexto)
    if (onSave) {
      onSave(result);
    }
    
    handleCloseModal();
  };

  // Lógica de visualización:
  // Prioridad 1: El nuevo cálculo no guardado (vista previa en modal)
  // Prioridad 2: El costo que viene desde afuera (props)
  const displayCost = calculatedRate 
    ? formatCurrency(calculatedRate.costoEnvio) 
    : currentCost || '';

  const displayProvince = calculatedRate?.provincia || '';

  return {
    showModal,
    postalCode,
    province: displayProvince,
    cost: displayCost,
    error,
    setPostalCode,
    handleOpenModal,
    handleCloseModal,
    handleCalculateShipping,
    handleSaveDestination
  };
};