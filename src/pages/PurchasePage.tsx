import { Container, Row, Col } from "react-bootstrap"; 
import { useState } from "react";
import { 
  ProductCarousel, 
  ModelSelector, 
  ProductForm,
  ProductSpecsTable,
  ProductSizeTable
} from "../modules/purchase";
import { ShippingCalculator } from "../modules/shipping";
import { CommonBreadcrumbs } from "../shared/components/Breadcrumbs"; 
import { FeaturedProducts } from "../modules/catalog"; 
import { BREADCRUMB_ITEMS } from "../shared/constants/routing"; 
import { SHIRT_FORM_CONFIG, MODEL_OPTIONS } from "../shared/constants/filters"; 
import { useCatalog } from "../modules/catalog/hooks/useCatalog";
import { useProduct } from "../modules/purchase/hooks/useProduct";
import { useParams } from 'react-router-dom';
import placeholderImg from '../assets/placeholder.png';


const specsData = [
    { label: "Material", value: "Algodón 100%" },
    { label: "Peso", value: "150 g" },
    { label: "Lavado", value: "A máquina, máximo 30°C" },
    { label: "Origen", value: "Argentina" },
  ];

const sizesData = [
  { talle: "S", pecho: "90 cm", largo: "65 cm", mangas: "20 cm" },
  { talle: "M", pecho: "95 cm", largo: "67 cm", mangas: "21 cm" },
  { talle: "L", pecho: "100 cm", largo: "70 cm", mangas: "22 cm" },
];

const PurchasePage = () => {
  const { 
    data: catalogData, 
    loading: catalogLoading, 
    error: catalogError 
  } = useCatalog('ShortSleeveTShirt');  

  const { id } = useParams<{ id: string }>();
  const { 
    data: product, 
    loading: productLoading, 
    error: productError 
  } = useProduct(id);
  // console.log(product);
  
  const [selectedModel, setSelectedModel] = useState("male");
  
  const handleModelChange = (value: string) => {
    setSelectedModel(value);
  };

  const [shirtImages] = useState([
    placeholderImg,
    placeholderImg,
    placeholderImg,
  ]);


  // TODO: mantener altura equivalente entre columnas de la izquierda y de la derecha
  return (
    <Container fluid className="px-0 px-md-5">
      <Row className="m-3">
        <Col xs={12}>
          <CommonBreadcrumbs items={BREADCRUMB_ITEMS} />      
        </Col>
      </Row>      
      
      <Row className="mx-3 align-items-stretch">
        <Col lg={8} md={12} className="d-flex flex-column">          
          <div className="flex-grow-1" style={{ minHeight: 0}}>
            <ProductCarousel
              key={selectedModel} 
              images={shirtImages}
              warmthLevel={product?.warmthLevel}
              loading={true}
            />
          </div>
          <ModelSelector 
            options={MODEL_OPTIONS}
            selectedId={selectedModel}
            onSelect={handleModelChange}
          />
          <ShippingCalculator />
        </Col>

        <Col lg={4} md={12}>
          <h2 className="display-5 mb-3 fw-semibold text-uppercase">Remera Mangas Largas</h2>     
          <ProductForm config={SHIRT_FORM_CONFIG}/>
        </Col>
      </Row>

      <Row className="m-3">
        <h2 className="display-7 mb-1 fw-semibold text-uppercase">Productos Similares</h2>
        <FeaturedProducts 
          products={catalogData?.products || []} 
          loading={catalogLoading}
        />
      </Row>  
      
      <Row className="m-3">
        <Col lg={6} md={12}>
          <ProductSpecsTable specs={specsData} />
        </Col>
        <Col lg={6} md={12}>
          <ProductSizeTable
            data={sizesData}
            image="/size-chart.jpg" 
            loading={productLoading}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default PurchasePage;