import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Portal } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { Background } from '../Background';
import { CategoryPicker } from '../CategoryPicker';
import { RootStackParamList } from '../../lib/navigation';
import { ChildIDContext } from '../../lib/contexts';
import { MultiFAB } from '../MultiFAB';

type Props = StackScreenProps<RootStackParamList, 'Child'>;

export const ChildCategorySelect = ({ navigation }: Props) => {
  const childId = React.useContext(ChildIDContext);
  const isFocused = useIsFocused();
  return <Background>
    <CategoryPicker onSelect={(categoryId, subcategoryId) => {
      if (subcategoryId) {
        navigation.navigate('ChildSubcategory', { childId, subcategoryId });
      } else {
        navigation.navigate('ChildCategory', { childId, categoryId });
      }
    }} />

    <Portal>
      <MultiFAB tabs visible={isFocused} initial={{ childIds: [childId] }} />
    </Portal>
  </Background>;
};
