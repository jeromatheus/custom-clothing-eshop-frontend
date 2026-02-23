import { type CSSProperties } from 'react';
import { Form, ButtonGroup, ToggleButton, Button } from 'react-bootstrap';
import { useProductForm } from '../hooks/useProductForm';
import { formatCurrency } from "../../../shared/utils/prices"; 
import { type FilterGroupData, type ProductConfig} from "../interfaces"
import styles from './ProductForm.module.css';

interface FilterGroupProps {
  group: FilterGroupData;
  selectedValue?: string | number;
  onChange: (id: string, value: string | number) => void;
}

interface ProductFormProps {
  config: ProductConfig;
}

interface CustomCSSProperties extends CSSProperties {
  '--swatch-color'?: string;
}

const FilterGroup = ({ group, selectedValue, onChange }: FilterGroupProps) => {
  const { id, label, type, options } = group;

  const renderOptions = () => {
    switch (type) {
      case 'size':
        return options.map((option) => (
          <div
            key={option.value}
            onClick={() => onChange(id, option.value)}
            className={`${styles.sizeOption} ${selectedValue === option.value ? styles.selected : ''}`}
            title={option.label}
          >
            {option.label}
          </div>
        ));

      case 'color':
        return options.map((option) => (
          <div
            key={option.value}
            onClick={() => onChange(id, option.value)}
            className={`${styles.colorOption} ${selectedValue === option.value ? styles.selected : ''}`}
            style={{ '--swatch-color': option.hex } as CustomCSSProperties} 
            title={option.label}
          />
        ));

      case 'button':
      default:
        return options.map((option) => (
          <ToggleButton
            key={option.value}
            id={`radio-${id}-${option.value}`} 
            type="radio"
            variant="outline-dark"
            className={styles.buttonOption}
            value={option.value}
            checked={selectedValue === option.value}
            onClick={() => onChange(id, option.value)}
          >
            {option.label}
          </ToggleButton>
        ));
    }
  };

  return (
    <Form.Group className="mb-3 d-flex align-items-center">
      <Form.Label className={styles.customLabel}>{label}</Form.Label>
      <ButtonGroup className={styles.customButtonGroup}>
        {renderOptions()}
      </ButtonGroup>
    </Form.Group>
  );
};

const ProductForm = ({ config }: ProductFormProps) => {
  const { 
    filters, 
    handleFormChange, 
    handleAddToCart, 
    handleBuyNow, 
    showSuccessAlert, 
    isAdding, 
    loading 
  } = useProductForm(config);
  if (!filters) return null;  // Renderizado defensivo

  return (
    <Form>
      {config.groups.map((group) => (
        <FilterGroup
          key={group.id}
          group={group}
          selectedValue={filters[group.id]}
          onChange={handleFormChange}
        />
      ))}

      <Form.Group className="mb-3 d-flex align-items-center">
        <Form.Label className={styles.customLabel}>Cantidad</Form.Label>
        <div className={styles.customButtonGroup}>
          <Form.Select
            value={filters.quantity || 1}
            onChange={(e) =>
              handleFormChange("quantity", Number(e.target.value))
            }
            className="p-1 text-center"
          >
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1} unidades
              </option>
            ))}
          </Form.Select>
        </div>
      </Form.Group>

      <div className="col d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center fs-1">
          <span className="fw-semibold">PRECIO:</span>
          <span className="fw-bold">
            {formatCurrency(14999)}
          </span>
        </div>
        <span className="mb-3 fs-6 text-muted">
          {formatCurrency(14999*0.9)} pagando con depósito o transferencia bancaria.
        </span>
      </div>

      <div className={styles.buttonContainer}>
        <Button
          type="button"
          onClick={handleBuyNow}
          variant="dark"
          className="w-100"
          disabled={loading || isAdding}
        >
          Comprar ahora
        </Button>
        <Button
          type="button"
          onClick={handleAddToCart}
          className={`${styles.addToCartButton} w-100`}
          disabled={loading || isAdding}
        >
          {isAdding ? "Añadiendo..." : "Agregar al carrito"}
        </Button>
      </div>

      {showSuccessAlert && (
        <div className="text-center">
          <span className={styles.cartAlertSpan}>
            ¡Añadiste este producto al carrito!
            <i className="ms-1 bi bi-check-circle" />
          </span>
        </div>
      )}
    </Form>
  );
};

export default ProductForm;