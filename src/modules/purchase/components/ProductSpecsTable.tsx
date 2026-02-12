import { Table } from "react-bootstrap";
import { SectionWrapper } from "../../../shared/components/SectionWrapper";

export interface ProductSpec {
  label: string; 
  value: string | React.ReactNode;
}

interface ProductSpecsTableProps {
  specs: ProductSpec[];
}

const ProductSpecsTable = ({ specs }: ProductSpecsTableProps) => {
  if (!specs || specs.length === 0) return null;

  return (
    <SectionWrapper title="Información del producto">
      <Table striped bordered hover responsive className="mb-0">
        <tbody>
          {specs.map((spec, index) => (
            <tr key={index}>
              <th scope="row" className="bg-light text-nowrap w-25">
                {spec.label}
              </th>
              <td>{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </SectionWrapper>
  );
};

export default ProductSpecsTable;