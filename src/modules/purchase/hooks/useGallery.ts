import { useState } from 'react';

export const useGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setActiveIndex(selectedIndex);
  };

  return {
    activeIndex,
    handleSelect
  };
};