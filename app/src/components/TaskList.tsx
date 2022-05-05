import React from 'react';
import { SectionList } from 'react-native';
import { Caption, Card } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { categoryState } from '../store';

interface TaskListProps {
  catId: number;
  selectTask: (taskId: number) => void;
}

export function TaskList({ catId, selectTask }: TaskListProps) {
  const category = useRecoilValue(categoryState(catId));
  return (
    <SectionList
      sections={(category?.subcategories || []).map(
        sub => ({ title: sub.label, data: sub.tasks })
      )}
      keyExtractor={(item) => item.id.toString()}
      style={{ maxWidth: '50%', marginRight: 20 }}
      renderSectionHeader={({ section }) => <Caption>{section.title}</Caption>}
      renderItem={({ item }) => (
        <Card style={{ flex: 1, margin: 10 }} onPress={() => selectTask(item.id)}>
          {item.task_description}
        </Card>
      )}
    />
  );
}
