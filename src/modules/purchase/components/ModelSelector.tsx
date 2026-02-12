import styles from './ModelSelector.module.css';

export interface ModelOption {
  id: string;        
  name: string;      
  heightInfo: string;
  sizeInfo: string;
  imageUrl?: string;
}

interface ModelSelectorProps {
  options: ModelOption[];
  selectedId: string; 
  onSelect: (id: string) => void;
}

const ModelSelector = ({ options, selectedId, onSelect }: ModelSelectorProps) => {
  const defaultPlaceholder = "https://placehold.co/90x140/cccccc/999999?text=Modelo";
  return (
    <div className={styles.root}>
      {options.map((option) => {
        const isSelected = selectedId === option.id;
        return (
          <div
            key={option.id}
            className={`${styles.modelOptionCard} ${isSelected ? styles.selected : ''}`}
            onClick={() => onSelect(option.id)}
            role="button"
            aria-pressed={isSelected}
            tabIndex={0} 
          >
            <small className={styles.tooltipText}>
              El modelo de la imagen mide {option.heightInfo} cm y está usando un talle {option.sizeInfo}
            </small>
            <img 
              src={option.imageUrl || defaultPlaceholder} 
              alt={`Seleccionar modelo ${option.name}`}
              className={styles.image}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ModelSelector;