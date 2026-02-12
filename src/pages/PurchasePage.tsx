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
  } = useCatalog('ShortSleeve');

  const { id } = useParams<{ id: string }>();
  const { 
    data: product, 
    loading: productLoading, 
    error: productError 
  } = useProduct(id);
  console.log(product);
  

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
              loading={productLoading}
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
          loading={true}
        />
      </Row>  
      
      <Row className="m-3">
        <Col lg={6} md={12}>
          <ProductSpecsTable specs={specsData} />
        </Col>
        <Col lg={6} md={12}>
          <ProductSizeTable data={sizesData} image="/size-chart.jpg" />
        </Col>
      </Row>
    </Container>
  );
};

export default PurchasePage;



const ALL_PRODUCTS = [
  {
    productId: 1011,
    name: "Remera Waffle",
    price: 13500.00,
    type: "ShortSleeve",
    colorVariants: [
      {
        color: "Beige",
        variantId: 1011_1,
        stock: 2,
        imageA: "https://placehold.co/600x600?text=Remera+Waffle+Beige+Frente",
        imageB: "https://placehold.co/600x600?text=Remera+Waffle+Beige+Dorso",
        availableSizes: ["S", "M", "L", "XL"],
      },
      {
        color: "Olive",
        variantId: 1011_2,
        stock: 2,
        imageA: "https://placehold.co/600x600?text=Remera+Waffle+Olive+Frente",
        imageB: "https://placehold.co/600x600?text=Remera+Waffle+Olive+Dorso",
        availableSizes: ["S", "M", "L", "XL"],
      },
      {
        color: "Black",
        variantId: 1011_3,
        stock: 1,
        imageA: "https://placehold.co/600x600?text=Remera+Waffle+Black+Frente",
        imageB: "https://placehold.co/600x600?text=Remera+Waffle+Black+Dorso",
        availableSizes: ["S", "M", "L", "XL"],
      }
    ],
  },

  {
    productId: 1012,
    name: "Remera Slim Fit",
    price: 11000.00,
    type: "ShortSleeve",
    colorVariants: [
      {
        color: "Black",
        variantId: 1012_1,
        stock: 1,
        imageA: "https://placehold.co/600x600?text=Remera+Slim+Fit+Black+Frente",
        imageB: "https://placehold.co/600x600?text=Remera+Slim+Fit+Black+Dorso",
        availableSizes: ["S", "M", "L", "XL"],
      },
      {
        color: "White",
        variantId: 1012_2,
        stock: 1,
        imageA: "https://placehold.co/600x600?text=Remera+Slim+Fit+White+Frente",
        imageB: "https://placehold.co/600x600?text=Remera+Slim+Fit+White+Dorso",
        availableSizes: ["S", "M", "L", "XL"],
      },
      {
        color: "Navy",
        variantId: 1012_3,
        stock: 1,
        imageA: "https://placehold.co/600x600?text=Remera+Slim+Fit+Navy+Frente",
        imageB: "https://placehold.co/600x600?text=Remera+Slim+Fit+Navy+Dorso",
        availableSizes: ["S", "M", "L", "XL"],
      }
    ],
  },

  {
    productId: 1013,
    name: "Musculosa Morley",
    price: 10000.00,
    type: "Sleeveless",
    colorVariants: [
      {
        color: "White",
        variantId: 1013_1,
        stock: 3,
        imageA: "https://placehold.co/600x600?text=Musculosa+Morley+White+Frente",
        imageB: "https://placehold.co/600x600?text=Musculosa+Morley+White+Dorso",
        availableSizes: ["S", "M", "L", "XL"],
      },
      {
        color: "Gray",
        variantId: 1013_2,
        stock: 3,
        imageA: "https://placehold.co/600x600?text=Musculosa+Morley+Gray+Frente",
        imageB: "https://placehold.co/600x600?text=Musculosa+Morley+Gray+Dorso",
        availableSizes: ["S", "M", "L", "XL"],
      },
      {
        color: "Black",
        variantId: 1013_3,
        stock: 3,
        imageA: "https://placehold.co/600x600?text=Musculosa+Morley+Black+Frente",
        imageB: "https://placehold.co/600x600?text=Musculosa+Morley+Black+Dorso",
        availableSizes: ["S", "M", "L", "XL"],
      }
    ],
  },

  {
    productId: 1014,
    name: "Pack x3 Medias",
    price: 7200.00,
    type: "Underwear",
    colorVariants: [
      {
        color: "White",
        variantId: 1014_1,
        stock: 1,
        imageA: "https://placehold.co/600x600?text=Pack+x3+Medias+White+Frente",
        imageB: "https://placehold.co/600x600?text=Pack+x3+Medias+White+Dorso",
        availableSizes: ["S", "M", "L", "XL"],
      },
      {
        color: "Gray",
        variantId: 1014_2,
        stock: 0,
        imageA: "https://placehold.co/600x600?text=Pack+x3+Medias+Gray+Frente",
        imageB: "https://placehold.co/600x600?text=Pack+x3+Medias+Gray+Dorso",
        availableSizes: ["S", "M", "L", "XL"],
      },
      {
        color: "Black",
        variantId: 1014_3,
        stock: 0,
        imageA: "https://placehold.co/600x600?text=Pack+x3+Medias+Black+Frente",
        imageB: "https://placehold.co/600x600?text=Pack+x3+Medias+Black+Dorso",
        availableSizes: ["S", "M", "L", "XL"],
      }
    ],
  },

  {
    productId: 1017,
    name: "Jogging Oversize",
    price: 22000.00,
    type: "Pants",
    colorVariants: [
      {
        color: "Black",
        variantId: 1017_1,
        stock: 2,
        imageA: "https://placehold.co/600x600?text=Jogging+Oversize+Black+Frente",
        imageB: "https://placehold.co/600x600?text=Jogging+Oversize+Black+Dorso",
        availableSizes: ["S", "M", "L", "XL"],
      },
      {
        color: "Gray",
        variantId: 1017_2,
        stock: 2,
        imageA: "https://placehold.co/600x600?text=Jogging+Oversize+Gray+Frente",
        imageB: "https://placehold.co/600x600?text=Jogging+Oversize+Gray+Dorso",
        availableSizes: ["S", "M", "L", "XL"],
      }
    ],
  }
];