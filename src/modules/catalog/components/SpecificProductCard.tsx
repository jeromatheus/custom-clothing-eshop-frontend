import { Card, Button } from "react-bootstrap";
import { ColorSwatches } from "./ColorSwatches";
import { useProductCard } from "../hooks/useProductCard";
import type { ProductVariantDto } from "../types/products";
import styles from "./SpecificProductCard.module.css";

interface SpecificProductCardProps {
  product: ProductVariantDto;
  onFavoriteClick?: (product: ProductVariantDto) => void;
  onGoToProducClick?: (product: ProductVariantDto) => void;
  onColorSelect?: (color: string) => void;
}

const SpecificProductCard = ({
  product,
  onFavoriteClick,
  onGoToProducClick,
  onColorSelect,
}: SpecificProductCardProps) => {
  const { ui, data, actions } = useProductCard(product, {
    onFavoriteClick: () => onFavoriteClick?.(product),
    onGoToProducClick: () => onGoToProducClick?.(product),
    onColorSelect: (_id, color) => onColorSelect?.(color),
  });

  return (
    <Card
      className={`${styles.root} h-100 shadow-sm rounded-0`}
      onMouseEnter={() => ui.setIsHovered(true)}
      onMouseLeave={() => ui.setIsHovered(false)}
    >
      <div className={styles.imageContainer}>
        {!data.hasStock && <div className={styles.noStockLabel}>Sin Stock</div>}
        <ColorSwatches
          colors={data.availableColors}
          selectedColor={ui.selectedColor}
          onColorSelect={actions.handleColorSelect}
        />
        <Card.Img
          variant="top"
          alt={data.name}
          className={`${styles.productImage} ${
            ui.isHovered ? styles.hidden : styles.visible
          }`}
          src={data.imageA}
        />
        <Card.Img
          variant="top"
          alt={data.name}
          className={`${styles.productImage} ${
            ui.isHovered ? styles.visible : styles.hidden
          }`}
          src={data.imageB}
        />
      </div>
      <div className={styles.iconContainer}>
        <Button
          onClick={actions.handleFavorite}
          variant="light"
          className={`${styles.iconButton} p-0 border-0 bg-transparent`}
        >
          <i
            className={
              ui.isFav ? "bi bi-heart-fill text-danger" : "bi bi-heart"
            }
          />
        </Button>
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fs-6">{data.name}</Card.Title>
        <div className="mt-auto">
          <h5 className="text-success fw-bold">${data.price}</h5>
          <span className="small text-muted d-block mb-2">
            ${data.transferPrice.toLocaleString()} con transferencia
          </span>
          <Button
            onClick={actions.handleGoToProduct}
            disabled={!data.hasStock}
            className="w-100 custom-button-primary"
            variant={!data.hasStock ? "secondary" : "dark"}
          >
            {!data.hasStock ? "Sin Stock" : "Ver producto"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SpecificProductCard;