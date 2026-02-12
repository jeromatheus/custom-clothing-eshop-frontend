import { useState, useEffect } from "react";

export const useResponsiveVisibleCount = (): number => {
  const [visibleCount, setVisibleCount] = useState<number>(5);

  const updateVisibleCount = (): void => {
    if (typeof window === 'undefined') return;

    const width = window.innerWidth;

    if (width < 768) {
      setVisibleCount(1);
    } else if (width < 992) {
      setVisibleCount(2);
    } else {
      setVisibleCount(5);
    }
  };

  useEffect(() => {
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    
    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, []);

  return visibleCount;
};