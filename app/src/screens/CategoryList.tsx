import React from 'react';
import { StackScreenProps } from "@react-navigation/stack";
import { Background } from "../components/Background";
import { CategoryPicker } from "../components/CategoryPicker";
import { RootStackParamList } from "../lib/navigation";

type Props = StackScreenProps<RootStackParamList, 'CategoryList'>;

export const CategoryListScreen = ({ navigation }: Props) => {
  return <Background>
    <CategoryPicker onSelect={(cat, subcat) => {
      if (subcat) {
        navigation.navigate('Subcategory', { subcategoryId: subcat })
      } else {
        navigation.navigate('Category', { categoryId: cat })
      }
    }} />
  </Background>;
};
