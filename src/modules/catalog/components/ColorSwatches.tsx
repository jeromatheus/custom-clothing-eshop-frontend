import { type MouseEvent } from "react";
import { getColorHex } from "../../../shared/utils/colors"; 
import { type ColorVariantSummaryDto } from "../types/FeaturedProductVariantDto"; 
import styles from "./ColorSwatches.module.css"; 

interface ColorSwatchesProps {
  colors: ColorVariantSummaryDto[]; 
  selectedColor?: string | null;
  onColorSelect: (color: string) => void;
}

export const ColorSwatches = ({ 
  colors, 
  selectedColor, 
  onColorSelect 
}: ColorSwatchesProps) => {
  
  if (!colors || colors.length === 0) return null;
  
  return (
    <div className={styles.overlay}>
      {colors.map((colorVariant) => {

        const colorName = colorVariant.colorName; 
        const hexColor = getColorHex(colorName);
        
        const borderStyle = colorName.toLowerCase() === 'white' 
          ? '1px solid #ccc' 
          : '1px solid transparent'; 
        const isSelected = selectedColor === colorName;

        return (
          <button
            key={colorVariant.variantId} 
            className={`${styles.swatch} ${isSelected ? styles.selected : ""}`}
            style={{ 
              backgroundColor: hexColor, 
              border: borderStyle 
            }}
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              e.preventDefault();
              e.stopPropagation();
              onColorSelect(colorName);
            }}
            type="button" 
            aria-label={`Seleccionar color ${colorName}`}
            aria-pressed={isSelected}
            title={colorName}
          />
        );
      })}
    </div>
  );
};