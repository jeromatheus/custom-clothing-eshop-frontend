import { useState, useEffect, type MouseEvent } from 'react';
import type { LensPosition } from '../../../shared/utils/zoom'; 

export const useZoom = (src: string) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showLens, setShowLens] = useState(false);
  
  const [lensPos, setLensPos] = useState<LensPosition>({
    x: 0,
    y: 0,
    imgWidth: 0,
    imgHeight: 0,
  });

  useEffect(() => {
    if (isModalOpen) {
      closeModal();
    }
  }, [src]);

  const openModal = () => setIsModalOpen(true);
  
  const closeModal = (e?: MouseEvent) => {
    if (e) e.stopPropagation();
    setIsModalOpen(false);
    setShowLens(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setLensPos({ x, y, imgWidth: width, imgHeight: height });
  };

  return {
    isModalOpen,
    showLens,
    lensPos,
    openModal,
    closeModal,
    handleMouseMove,
    setShowLens
  };
};