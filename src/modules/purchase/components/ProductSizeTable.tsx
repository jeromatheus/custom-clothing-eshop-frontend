import { Table, Row, Col } from "react-bootstrap";
import { SectionWrapper } from "../../../shared/components/SectionWrapper";
import Skeleton from "react-loading-skeleton"; 
import styles from "./ProductSizeTable.module.css"; 

interface SizeData {
  [key: string]: string | number;
}

interface ProductSizeTableProps {
  data: SizeData[];
  columns?: string[]; 
  image?: string;
  loading?: boolean;
}

const DEFAULT_COLS = ["Talle", "Pecho", "Largo", "Mangas"];
const DEFAULT_IMG = "/placeholder.png"; 

  const ProductSizeTableSkeleton = () => (
    <SectionWrapper title="Tabla de talles">
      <Row className="align-items-stretch">
        <Col md={3} className="p-0">
          <Skeleton height="100%" borderRadius={0} />
        </Col>
        <Col md={9} className="p-0 h-100">
          <Skeleton count={4} height="25%" borderRadius={0} />
        </Col>
      </Row>        
    </SectionWrapper>
  );

const ProductSizeTable = ({
  data,
  columns = DEFAULT_COLS,
  image = DEFAULT_IMG,
  loading = true,
}: ProductSizeTableProps) => {

  if (loading) {
    return <ProductSizeTableSkeleton />;
  }  
  
  return (
    <SectionWrapper title="Tabla de talles">
      <Row className="align-items-stretch">        
        <Col md={3} className="p-0">
          <div className={styles.imageContainer}>
            <img
              src={image}
              className={`img-fluid ${styles.guideImage}`}
              alt="Guía de talles"
            />
          </div>
        </Col>
        <Col md={9} className="p-0">
          <Table striped bordered hover responsive className="text-center h-100 m-0 mb-0">
            <thead className="table-dark">
              <tr>
                {columns.map((col) => (
                  <th key={col} className="fw-normal text-uppercase small">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((col) => {
                    const key = col.toLowerCase();
                    return <td key={col}>{row[key] ?? "-"}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </SectionWrapper>
  );
};

export default ProductSizeTable;