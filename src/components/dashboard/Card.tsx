import { FC, ReactElement, ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  maxW: "xs" | "sm" | "lg" | "md";
  className?: string;
  header: ReactElement;
}

export const Card: FC<CardProps> = ({ children, maxW, className, header }) => {
  return (
    <div className={`max-w-${maxW}  ${className}`}>
      {header}
      <div className="shadow-lg p-4">{children}</div>
    </div>
  );
};
