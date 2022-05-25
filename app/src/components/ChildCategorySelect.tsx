import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Background } from '../components/Background';
import { CategoryPicker } from '../components/CategoryPicker';
import { RootStackParamList } from '../lib/navigation';
import { ChildIDContext } from '../lib/contexts';

type Props = StackScreenProps<RootStackParamList, 'Child'>;

export const ChildCategorySelect = ({ navigation }: Props) => {
  const childId = React.useContext(ChildIDContext);
  return <Background>
    <CategoryPicker onSelect={(categoryId, subcategoryId) => {
      if (subcategoryId) {
        navigation.navigate('ChildSubcategory', { childId, subcategoryId });
      } else {
        navigation.navigate('ChildCategory', { childId, categoryId });
      }
    }} />
  </Background>;
};
