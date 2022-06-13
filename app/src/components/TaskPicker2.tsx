import React from 'react';
import { SectionList } from 'react-native';
import { Text } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { categoryTasksState } from '../store';
import { TaskListItem } from './TaskListItem';

interface TaskPickerProps {
  category: number;
  selected: number[];
  onSelect: (selected: number[]) => void;
}

export const TaskPicker2 = React.memo(function TaskPicker(props: TaskPickerProps) {
  const subcategories = useRecoilValue(categoryTasksState(props.category));

  return <SectionList
    sections={subcategories}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <TaskListItem
        item={item}
        onCheck={() => { }}
        onPress={() => props.onSelect([item.id!])}
      />
    )}
    renderSectionHeader={({ section }) => (
      <Text style={{ marginLeft: 5, marginTop: 15, fontWeight: 'bold' }}>{section.label}</Text>
    )}
  />;
});
