import { Carousel, Row, Col } from "react-bootstrap"; 
import { useFeaturedProducts } from "../hooks/useFeaturedProducts";
import type { ProductDto } from "../types/product.types";
import SpecificProductCard from "./SpecificProductCard"; 
import 'react-loading-skeleton/dist/skeleton.css';
import styles from "./FeaturedProducts.module.css";

interface FeaturedProductsProps {
  products: ProductDto[];
  loading?: boolean;
}

const FeaturedProducts = ({ products, loading }: FeaturedProductsProps) => {
  const { 
    slides, 
    visibleCount, 
    toggleFavorite, 
    handleProductSelect 
  } = useFeaturedProducts(products); 

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
                  key={product.id || product.productId || index}
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