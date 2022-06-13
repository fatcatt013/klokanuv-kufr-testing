import React from 'react';
import { Card, Text } from 'react-native-paper';
import { FlatList, View } from 'react-native';
import { CustomCheckbox } from './CustomCheckbox';
import { useRecoilValue } from 'recoil';
import { subcategoryTasksState } from '../store';

interface TaskPickerProps {
  subcategory: number;
  selected: number[];
  onSelect: (selected: number[]) => void;
}

export const TaskPicker = React.memo(function TaskPicker(props: TaskPickerProps) {
  const tasks = useRecoilValue(subcategoryTasksState(props.subcategory));

  return <FlatList
    data={tasks}
    keyExtractor={item => item.id!.toString()}
    renderItem={({ item }) => (
      <Card key={item.id} style={{ margin: 4 }}
        onPress={() => {
          if (props.selected.includes(item.id!)) {
            props.onSelect(props.selected.filter(x => x !== item.id!));
          } else {
            props.onSelect([...props.selected, item.id!]);
          }
        }}
      >
        <View style={{ padding: 8, flexDirection: 'row' }}>
          <CustomCheckbox checked={props.selected.includes(item.id!)} />
          <Text>{item.task_description}</Text>
        </View>
      </Card>
    )}
  />
});
