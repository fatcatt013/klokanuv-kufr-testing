import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { Background } from '../Background';
import { CategoryPicker } from '../CategoryPicker';
import { RootStackParamList } from '../../lib/navigation';
import { ClassIDContext } from '../../lib/contexts';
import { Portal } from 'react-native-paper';
import { MultiFAB } from '../MultiFAB';
import { useIsFocused } from '@react-navigation/native';

type Props = StackScreenProps<RootStackParamList, 'Class'>;

export const ClassCategorySelect = ({ navigation }: Props) => {
  const classId = React.useContext(ClassIDContext);
  const isFocused = useIsFocused();
  return <Background>
    <CategoryPicker onSelect={(categoryId) => navigation.navigate('ClassCategory', { classId, categoryId })} />

    <Portal>
      <MultiFAB tabs visible={isFocused} initial={{ classId }} />
    </Portal>
  </Background>;
};
