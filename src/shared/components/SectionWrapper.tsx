import { type ReactNode } from "react";

interface SectionWrapperProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const SectionWrapper = ({ title, children, className = "" }: SectionWrapperProps) => {
  return (
    <div className={`my-4 ${className}`}>
      <h4 className="fw-bold mb-3 text-uppercase fs-5">{title}</h4>
      {children}
    </div>
  );
};