import { Carousel, Spinner, Row, Col } from "react-bootstrap";
import ProductThumbnails from "./ProductThumbnails";
import ZoomImage from "./ZoomImage";
import { useGallery } from "../hooks/useGallery";
import { WarmthLevelBadge } from "./WarmthLevelBadge"; 
import styles from "./ProductCarousel.module.css";

interface ProductCarouselProps {
  images: string[];
  loading?: boolean;
  warmthLevel?: number;
}

const ProductCarousel = ({ images, loading = false, warmthLevel = 0 }: ProductCarouselProps) => {
  const { activeIndex, handleSelect } = useGallery();

  return (
    <Row className="h-100">
      <Col xs={2} className="p-0">
        <ProductThumbnails
          images={images}
          activeIndex={activeIndex}
          onSelect={handleSelect}
        />
      </Col>
      <Col xs={10}>
        <Carousel
          className={styles.carousel}
          activeIndex={activeIndex}
          onSelect={handleSelect}
          indicators={false}
          interval={null}
          touch={true}
          fade={true}
          nextIcon={<span className={`carousel-control-next-icon ${styles.carouselControlNextIcon}`} aria-hidden="true" />}
          prevIcon={<span className={`carousel-control-prev-icon ${styles.carouselControlPrevIcon}`} aria-hidden="true" />}
        >
          {images.map((image, idx) => (
            <Carousel.Item key={idx} className={styles.carouselItem}>
              <ZoomImage src={image} alt={`Slide ${idx + 1}`} />
              {loading && (
                <div className="position-absolute top-50 start-50 translate-middle">
                  <Spinner animation="border" role="status" variant="white">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              )}
            <WarmthLevelBadge 
                level={warmthLevel} 
                className={styles.floatingBadge} 
              />              
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
};

export default ProductCarousel;