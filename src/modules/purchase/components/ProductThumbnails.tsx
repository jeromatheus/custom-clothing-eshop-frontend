import { Image } from "react-bootstrap";
import styles from "./ProductThumbnails.module.css";

interface ProductThumbnailsProps {
  images: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const ProductThumbnails = ({
  images,
  activeIndex,
  onSelect,
}: ProductThumbnailsProps) => {
  return (
    <div className={styles.thumbnailList}>
      {images.map((image, idx) => (
        <Image
          key={idx}
          src={image}
          alt={`Thumbnail ${idx + 1}`}
          className={`
            ${styles.thumbnailImage} 
            ${idx === activeIndex ? styles.thumbnailImageActive : ""}
          `}
          onClick={() => onSelect(idx)}
        />
      ))}
    </div>
  );
};

export default ProductThumbnails;
