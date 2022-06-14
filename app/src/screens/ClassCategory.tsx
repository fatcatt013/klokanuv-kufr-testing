import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { Background } from '../components/Background';
import { TaskPicker } from '../components/TaskPicker';
import { useMultiFABScroll } from '../components/MultiFABContext';
import { Portal } from 'react-native-paper';
import { MultiFAB } from '../components/MultiFAB';
import { useRecoilValue } from 'recoil';
import { categoryTasksState } from '../store';

type Props = StackScreenProps<RootStackParamList, 'ClassCategory'>;

export const ClassCategoryScreen = React.memo(function ClassCategoryScreen({ route, navigation }: Props) {
  const { classId, categoryId } = route.params;
  const isFocused = useIsFocused();
  const { setStatus } = useMultiFABScroll();
  const [selected, setSelected] = React.useState<number[]>([]);
  const subcategories = useRecoilValue(categoryTasksState(categoryId));

  React.useEffect(() => {
    if (isFocused) {
      if (selected.length > 0) {
        setStatus({ multi: true, initial: { classId, categoryId, taskIds: selected } });
      } else {
        setStatus({ initial: { classId, categoryId } })
      }
    }
  }, [isFocused, setStatus, classId, categoryId]);

  return <Background>
    <TaskPicker
      data={subcategories}
      selected={selected}
      onSelect={setSelected}
      onPress={(id) => navigation.push('ClassTask', { classId, taskId: id })}
    />
    <Portal><MultiFAB visible={isFocused} /></Portal>
  </Background>;
});
