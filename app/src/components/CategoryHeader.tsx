import React from "react";
import { useCategory } from "../use-core-data";

interface CategoryHeaderProps {
  id: number;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({ id }) => {
  const category = useCategory(id);
  return <>{category?.label}</>;
};
