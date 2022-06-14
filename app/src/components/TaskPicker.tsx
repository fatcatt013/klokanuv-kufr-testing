import React from 'react';
import { Text } from 'react-native-paper';
import { SectionList } from 'react-native';
import { CategorySections } from '../store';
import { TaskListItem } from './TaskListItem';

interface TaskPickerProps {
  data: CategorySections;
  selected: number[];
  onSelect: (selected: number[]) => void;
  onPress?: (id: number) => void;
}

export const TaskPicker = React.memo(function TaskPicker(props: TaskPickerProps) {
  const [mode, setMode] = React.useState<'view' | 'select'>('view');

  const findTask = React.useCallback((id: number) => {
    return props.data.find(sub => sub.data.find(x => x.id! === id))?.data?.find(x => x.id === id);
  }, [props.data]);
  const assessmentType = props.selected.length > 0 && findTask(props.selected[0])?.assessment_type || -1;

  const onPressCheck = React.useCallback((id: number) => {
    const task = findTask(id);
    if (assessmentType > 0 && task?.assessment_type !== assessmentType) {
      return;
    }
    if (props.selected.includes(id)) {
      if (props.selected.length === 1) {
        props.onSelect([]);
        setMode('view');
      } else {
        props.onSelect(props.selected.filter(x => x !== id));
      }
    } else {
      setMode('select');
      props.onSelect([...props.selected, id]);
    }
  }, [props.selected, props.onSelect, setMode, assessmentType]);

  const onPress = React.useCallback((id: number) => {
    if (mode === 'view' && props.onPress) {
      props.onPress(id);
    } else {
      onPressCheck(id);
    }
  }, [mode, props.onPress, onPressCheck]);

  return <SectionList
    sections={props.data}
    keyExtractor={(item) => item.id.toString()}
    renderItem={({ item }) => (
      <TaskListItem
        item={item}
        checked={props.selected.includes(item.id!)}
        onCheck={() => onPressCheck(item.id!)}
        onPress={() => onPress(item.id!)}
      />
    )}
    renderSectionHeader={({ section }) => (
      <Text style={{ marginLeft: 5, marginTop: 15, fontWeight: 'bold' }}>{section.label}</Text>
    )}
  />;
});
