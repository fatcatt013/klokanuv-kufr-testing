import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { Background } from '../components/Background';
import { SubcategoryPicker } from '../components/SubcategoryPicker';

type Props = StackScreenProps<RootStackParamList, 'ChildCategory'>;

export const ChildCategoryScreen = React.memo(function ChildCategoryScreen({ route, navigation }: Props) {
  const childId = route.params.childId;
  return <Background>
    <SubcategoryPicker
      category={route.params.categoryId}
      onSelect={(id) => navigation.navigate('ChildSubcategory', { childId, subcategoryId: id })}
    />
  </Background>;
});
