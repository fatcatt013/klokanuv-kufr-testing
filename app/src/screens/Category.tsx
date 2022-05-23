import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { Background } from '../components/Background';
import { SubcategoryPicker } from '../components/SubcategoryPicker';

type Props = StackScreenProps<RootStackParamList, 'Category'>;

export const CategoryScreen = React.memo(function CategoryScreen({ route, navigation }: Props) {
  return <Background>
    <SubcategoryPicker
      category={route.params.categoryId}
      onSelect={(id) => navigation.navigate('Subcategory', { subcategoryId: id })}
    />
  </Background>;
});
