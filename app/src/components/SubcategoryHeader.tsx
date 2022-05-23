import React from "react";
import { useSubcategory } from "../use-core-data";

interface SubcategoryHeaderProps {
  id: number;
}

export const SubcategoryHeader: React.FC<SubcategoryHeaderProps> = ({ id }) => {
  const subcategory = useSubcategory(id);
  return <>{subcategory?.label}</>;
};
