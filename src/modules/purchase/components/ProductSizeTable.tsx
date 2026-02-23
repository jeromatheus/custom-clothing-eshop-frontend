import { Table, Row, Col } from "react-bootstrap";
import { SectionWrapper } from "../../../shared/components/SectionWrapper";
import Skeleton from "react-loading-skeleton";
import styles from "./ProductSizeTable.module.css";

interface ColumnConfig {
  label: string;
  key: string;
}

interface ProductSizeTableProps {
  data: any[];
  image?: string;
  loading?: boolean;
}

const COLUMNS_CONFIG: ColumnConfig[] = [
  { label: "Talle", key: "size" },
  { label: "Pecho (cm)", key: "chest" },
  { label: "Largo (cm)", key: "length" },
  { label: "Cuello (cm)", key: "neck" },
];

const DEFAULT_IMG = "/size-chart.jpg";

const ProductSizeTableSkeleton = () => (
  <SectionWrapper title="Tabla de talles">
    <Row className="align-items-stretch" style={{ height: "300px" }}>
      <Col md={3} className="p-0">
        <Skeleton height="100%" />
      </Col>
      <Col md={9} className="p-0">
        <Skeleton count={5} height={50} className="mb-2" />
      </Col>
    </Row>
  </SectionWrapper>
);

const ProductSizeTable = ({
  data = [],
  image = DEFAULT_IMG,
  loading = false,
}: ProductSizeTableProps) => {
  if (loading) return <ProductSizeTableSkeleton />;

  if (!data || data.length === 0) return null;

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
          <Table
            striped
            bordered
            hover
            responsive
            className="text-center h-100 m-0"
          >
            <thead className="table-dark">
              <tr>
                {COLUMNS_CONFIG.map((col) => (
                  <th key={col.key} className="fw-normal text-uppercase small">
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {COLUMNS_CONFIG.map((col) => (
                    <td key={col.key}>
                      {row[col.key] !== undefined ? row[col.key] : "-"}
                    </td>
                  ))}
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