import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { Background } from '../components/Background';
import { SubcategoryPicker } from '../components/SubcategoryPicker';
import { Portal } from 'react-native-paper';
import { MultiFAB } from '../components/MultiFAB';
import { useIsFocused } from '@react-navigation/native';

type Props = StackScreenProps<RootStackParamList, 'ChildCategory'>;

export const ChildCategoryScreen = React.memo(function ChildCategoryScreen({ route, navigation }: Props) {
  const { childId, categoryId } = route.params;
  const isFocused = useIsFocused();
  return <Background>
    <SubcategoryPicker
      category={categoryId}
      onSelect={(id) => navigation.navigate('ChildSubcategory', { childId, subcategoryId: id })}
    />
    <Portal>
      <MultiFAB visible={isFocused} initial={{ childIds: [childId], categoryId }} />
    </Portal>
  </Background>;
});
