import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native';
import { CategorySelect } from '../components/CategorySelect';
import { TaskList } from '../components/TaskList';
import { RootStackParamList } from '../lib/navigation';

type Props = StackScreenProps<RootStackParamList, 'TaskList'>;

export function TaskListScreen({ navigation }: Props) {
  const [catId, setCatId] = React.useState<number | null>(null);
  return (
    <SafeAreaView>
      {catId
        ? <TaskList catId={catId} selectTask={taskId => navigation.push('Task', { taskId })} />
        : <CategorySelect selectCategory={setCatId} />}
    </SafeAreaView>
  );
};
