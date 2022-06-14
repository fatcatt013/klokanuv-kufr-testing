import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { Background } from '../components/Background';
import { TaskPicker2 } from '../components/TaskPicker2';
import { useMultiFABScroll } from '../components/MultiFABContext';
import { Portal } from 'react-native-paper';
import { MultiFAB } from '../components/MultiFAB';

type Props = StackScreenProps<RootStackParamList, 'ClassCategory'>;

export const ClassCategoryScreen = React.memo(function ClassCategoryScreen({ route, navigation }: Props) {
  const { classId, categoryId } = route.params;
  const isFocused = useIsFocused();
  const { setStatus } = useMultiFABScroll();

  React.useEffect(() => {
    if (isFocused) {
      setStatus({ initial: { classId, categoryId } })
    }
  }, [isFocused, setStatus, classId, categoryId]);

  return <Background>
    <TaskPicker2
      category={categoryId} selected={[]}
      onSelect={([id]) => navigation.push('ClassTask', { classId, taskId: id })}
    />
    <Portal><MultiFAB visible={isFocused} /></Portal>
  </Background>;
});
