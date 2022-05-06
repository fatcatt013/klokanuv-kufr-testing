import React from 'react';
import { SectionList } from 'react-native';
import { Caption, Card, Text } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { categoryState } from '../store';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface TaskListProps {
  catId: number;
  selectTask: (taskId: number) => void;
}

const difficultyIcons = {
  '+': 'plus',
  '=': 'equal',
  '-': 'minus',
};

export function TaskList({ catId, selectTask }: TaskListProps) {
  const category = useRecoilValue(categoryState(catId));
  return (
    <SectionList
      style={{ margin: 3 }}
      sections={(category?.subcategories || []).map(
        sub => ({ title: sub.label, data: sub.tasks })
      )}
      keyExtractor={(item) => item.id.toString()}
      renderSectionHeader={({ section }) => <Caption>{section.title}</Caption>}
      renderItem={({ item }) => (
        <Card style={{ flex: 1, margin: 2 }} onPress={() => selectTask(item.id)}>
          <Card.Content style={{ flexDirection: 'row' }}>
            <Icon size={15} style={{ marginRight: 5 }} name={item.difficulty ? difficultyIcons[item.difficulty] : undefined} />
            <Text>{item.task_description}</Text>
          </Card.Content>
        </Card>
      )}
    />
  );
}
