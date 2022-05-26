import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Background } from '../components/Background';
import { CategoryPicker } from '../components/CategoryPicker';
import { RootStackParamList } from '../lib/navigation';
import { ClassIDContext } from '../lib/contexts';

type Props = StackScreenProps<RootStackParamList, 'Class'>;

export const ClassCategorySelect = ({ navigation }: Props) => {
  const classId = React.useContext(ClassIDContext);
  return <Background>
    <CategoryPicker onSelect={(categoryId, subcategoryId) => {
      if (subcategoryId) {
        navigation.navigate('ClassSubcategory', { classId, subcategoryId });
      } else {
        navigation.navigate('ClassCategory', { classId, categoryId });
      }
    }} />
  </Background>;
};
