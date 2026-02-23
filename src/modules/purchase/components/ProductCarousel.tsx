import { Carousel, Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
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

const PrevIcon = () => (
  <span
    className={`carousel-control-prev-icon ${styles.carouselControlPrevIcon}`}
    aria-hidden="true"
  />
);

const NextIcon = () => (
  <span
    className={`carousel-control-next-icon ${styles.carouselControlNextIcon}`}
    aria-hidden="true"
  />
);

const CarouselSkeleton = () => (
  <Row className="h-100">
    <Col xs={2} className="p-0 d-flex flex-column gap-2">
      <Skeleton count={4} height={120} borderRadius={4} />
    </Col>
    <Col xs={10}>
      <Skeleton height="95%" borderRadius={0} />
    </Col>
  </Row>
);

const ProductCarousel = ({
  images,
  loading = false,
  warmthLevel = 0,
}: ProductCarouselProps) => {
  const { activeIndex, handleSelect } = useGallery();

  if (loading) {
    return <CarouselSkeleton />;
  }

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
          nextIcon={<NextIcon />}
          prevIcon={<PrevIcon />}
        >
          {images.map((image, idx) => (
            <Carousel.Item key={idx} className={styles.carouselItem}>
              <ZoomImage src={image} alt={`Slide ${idx + 1}`} />

              {warmthLevel > 0 && (
                <WarmthLevelBadge
                  level={warmthLevel}
                  className={styles.floatingBadge}
                />
              )}
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
    </Row>
  );
};

export default ProductCarousel;