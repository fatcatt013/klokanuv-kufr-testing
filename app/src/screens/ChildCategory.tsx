import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { Portal } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { Background } from '../components/Background';
import { MultiFAB } from '../components/MultiFAB';
import { TaskPicker2 } from '../components/TaskPicker2';

type Props = StackScreenProps<RootStackParamList, 'ChildCategory'>;

export const ChildCategoryScreen = React.memo(function ChildCategoryScreen({ route, navigation }: Props) {
  const { childId, categoryId } = route.params;
  const isFocused = useIsFocused();

  return <Background>
    <TaskPicker2
      category={categoryId} selected={[]}
      onSelect={([id]) => navigation.push('ChildTask', { childId, taskId: id })}
    />
    <Portal>
      <MultiFAB visible={isFocused} initial={{ childIds: [childId], categoryId }} />
    </Portal>
  </Background >;
});
