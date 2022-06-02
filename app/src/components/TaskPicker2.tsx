import React from 'react';
import { SectionList } from 'react-native';
import { Text } from 'react-native-paper';
import { useCategory } from '../use-core-data';
import { TaskListItem } from './TaskListItem';

interface TaskPickerProps {
  category: number;
  selected: number[];
  onSelect: (selected: number[]) => void;
}

export const TaskPicker2 = React.memo(function TaskPicker(props: TaskPickerProps) {
  const category = useCategory(props.category);

  return <SectionList
    sections={category?.subcategories || []}
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
