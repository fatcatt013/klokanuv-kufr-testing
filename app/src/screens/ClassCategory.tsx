import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { Background } from '../components/Background';
import { SubcategoryPicker } from '../components/SubcategoryPicker';

type Props = StackScreenProps<RootStackParamList, 'ClassCategory'>;

export const ClassCategoryScreen = React.memo(function ClassCategoryScreen({ route, navigation }: Props) {
  const classId = route.params.classId;
  return <Background>
    <SubcategoryPicker
      category={route.params.categoryId}
      onSelect={(id) => navigation.navigate('ClassSubcategory', { classId, subcategoryId: id })}
    />
  </Background>;
});
