import { Carousel, Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useFeaturedProducts } from "../hooks/useFeaturedProducts";
import type { FeaturedProductVariantDto } from "../types/FeaturedProductVariantDto";
import SpecificProductCard from "./SpecificProductCard";
import styles from "./FeaturedProducts.module.css";

interface FeaturedProductsProps {
  products: FeaturedProductVariantDto[];
  loading?: boolean;
}

const FeaturedProductsSkeleton = ({ count }: { count: number }) => {
  return (
    <div className={styles.root}>
      <Row className="g-0 d-flex w-100 m-0 justify-content-center">
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <Col
              key={`skeleton-${index}`}
              className={styles.productCol}
              style={{
                flex: `0 0 ${100 / count}%`,
                maxWidth: `${100 / count}%`,
              }}
            >
              <div className="w-100 h-100 p-2 d-flex flex-column">
                <div style={{ aspectRatio: "1/1", marginBottom: "10px" }}>
                  <Skeleton height="100%" borderRadius={8} />
                </div>
                <Skeleton height={20} className="mb-2" />
                <Skeleton height={20} className="mb-3" />
                <Skeleton height={40} borderRadius={4} />
              </div>
            </Col>
          ))}
      </Row>
    </div>
  );
};

const FeaturedProducts = ({
  products,
  loading = false,
}: FeaturedProductsProps) => {
  const { slides, visibleCount, toggleFavorite, handleProductSelect } =
    useFeaturedProducts(products);

  if (loading) {
    return <FeaturedProductsSkeleton count={visibleCount || 4} />;
  }

  if (!products || products.length === 0) return null;

  return (
    <div className={styles.root}>
      <Carousel
        interval={null}
        indicators={false}
        slide={false}
        className={styles.carousel}
      >
        {slides.map((group, index) => (
          <Carousel.Item key={`slide-${index}`}>
            <Row className="g-0 d-flex w-100 m-0 justify-content-center">
              {group.map((product) => (
                <Col
                  key={product.id || index}
                  className={styles.productCol}
                  style={{
                    flex: `0 0 ${100 / visibleCount}%`,
                    maxWidth: `${100 / visibleCount}%`,
                  }}
                >
                  <SpecificProductCard
                    product={product}
                    onFavoriteClick={() => toggleFavorite(product)}
                    onGoToProducClick={() => handleProductSelect(product)}
                  />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default FeaturedProducts;