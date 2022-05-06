import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { CategorySelect } from '../components/CategorySelect';
import { TaskList } from '../components/TaskList';
import { RootStackParamList } from '../lib/navigation';
import { Background } from '../components/Background';

type Props = StackScreenProps<RootStackParamList, 'TaskList'>;

export const TaskListScreen = React.memo(function TaskListScreen({ navigation }: Props) {
  const [catId, setCatId] = React.useState<number | null>(null);
  return <Background>
    {catId
      ? <TaskList catId={catId} selectTask={taskId => navigation.push('Task', { taskId })} />
      : <CategorySelect selectCategory={setCatId} />}
  </Background>;
});
