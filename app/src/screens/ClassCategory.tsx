import React from 'react';
import { Portal } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { Background } from '../components/Background';
import { MultiFAB } from '../components/MultiFAB';
import { TaskPicker2 } from '../components/TaskPicker2';

type Props = StackScreenProps<RootStackParamList, 'ClassCategory'>;

export const ClassCategoryScreen = React.memo(function ClassCategoryScreen({ route, navigation }: Props) {
  const { classId, categoryId } = route.params;
  const isFocused = useIsFocused();

  return <Background>
    <TaskPicker2
      category={categoryId} selected={[]}
      onSelect={([id]) => navigation.push('ClassTask', { classId, taskId: id })}
    />

    <Portal>
      <MultiFAB visible={isFocused} initial={{ classId, categoryId }} />
    </Portal>
  </Background>;
});
