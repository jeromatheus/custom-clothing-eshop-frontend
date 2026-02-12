import { Breadcrumb } from "react-bootstrap";

export interface BreadcrumbPath {
  label: string;
  path?: string;
}

interface CommonBreadcrumbsProps {
  items: BreadcrumbPath[];
}

export const CommonBreadcrumbs = ({ items }: CommonBreadcrumbsProps) => {
  return (
    <Breadcrumb>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <Breadcrumb.Item
            key={index}
            href={item.path}
            active={isLast} 
          >
            {item.label}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};