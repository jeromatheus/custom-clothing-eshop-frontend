import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import ProductCarousel from "../modules/purchase/components/ProductCarousel";
import ModelSelector from "../modules/purchase/components/ModelSelector";
import ProductForm from "../modules/purchase/components/ProductForm";
import ProductSpecsTable from "../modules/purchase/components/ProductSpecsTable";
import ProductSizeTable from "../modules/purchase/components/ProductSizeTable";
import ShippingCalculator from "../modules/shipping/components/ShippingCalculator";
import FeaturedProducts from "../modules/catalog/components/FeaturedProducts";
import { CommonBreadcrumbs } from "../shared/components/Breadcrumbs";
import { BREADCRUMB_ITEMS } from "../shared/constants/routing";
import { SHIRT_FORM_CONFIG, MODEL_OPTIONS } from "../shared/constants/filters";
import { useGetFeaturedProductsByType } from "../modules/catalog/services/useGetFeaturedProductsByType";
import { useGetProductById } from "../modules/purchase/services/useGetProductById";
import { useParams } from "react-router-dom";

const specsData = [
  { label: "Material", value: "Algodón 100%" },
  { label: "Peso", value: "150 g" },
  { label: "Lavado", value: "A máquina, máximo 30°C" },
  { label: "Origen", value: "Argentina" },
];

const PurchasePage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: catalogData, loading: catalogLoading } = useGetFeaturedProductsByType("ShortSleeveTShirt");
  const { data: productResponse, loading: productLoading } = useGetProductById(id);

  const product = productResponse?.product;

  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);

  const currentModel = product?.models.find(m => m.id === selectedModelId) || product?.models[0];
  
  const carouselImages = currentModel?.carouselImages || [];
  const sizeChart = product?.sizeChart || [];
  const similarProducts = catalogData?.products || [];

  return (
    <Container fluid className="px-0 px-md-5">
      <Row className="m-3">
        <Col xs={12}>
          <CommonBreadcrumbs items={BREADCRUMB_ITEMS} />
        </Col>
      </Row>

      <Row className="mx-3 align-items-stretch">
        <Col lg={8} md={12} className="d-flex flex-column">
          <div className="flex-grow-1">
            <ProductCarousel
              images={carouselImages}
              loading={productLoading}
              warmthLevel={product?.warmthLevel}
            />
          </div>
          
          {/* {product?.models && (
             <ModelSelector 
                options={product.models} 
                selectedId={currentModel?.id} 
                onSelect={setSelectedModelId} 
             />
          )} */}

          <ShippingCalculator />
        </Col>

        <Col lg={4} md={12}>
          <h2 className="display-5 mb-3 fw-semibold text-uppercase">
            {product?.name || "Cargando..."}
          </h2>
          <ProductForm
            config={SHIRT_FORM_CONFIG}
            product={product}
          />
        </Col>
      </Row>

      <Row className="m-3">
        <h2 className="display-7 mb-1 fw-semibold text-uppercase">Productos Similares</h2>
        <FeaturedProducts
          products={similarProducts}
          loading={catalogLoading}
        />
      </Row>

      <Row className="m-3">
        <Col lg={6} md={12}>
          <ProductSpecsTable specs={specsData} />
        </Col>
        <Col lg={6} md={12}>
          <ProductSizeTable
            data={sizeChart}
            image="/size-chart.jpg"
            loading={productLoading}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default PurchasePage;