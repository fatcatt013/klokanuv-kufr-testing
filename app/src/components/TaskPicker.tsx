import React from "react";
import { Button, Card, Dialog, Text, Title, useTheme } from "react-native-paper";
import { useSubcategory } from "../use-core-data";
import { FlatList, View } from "react-native";
import { CustomCheckbox } from "./CustomCheckbox";

interface TaskPickerProps {
  open: boolean;
  subcategory: number;
  selected: number[];
  onSelect: (selected: number[]) => void;
  onClose: () => void;
}

export const TaskPicker = React.memo(function TaskPicker(props: TaskPickerProps) {
  const theme = useTheme();
  const subcategory = useSubcategory(props.subcategory);
  const [selected, setSelected] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (props.open) {
      setSelected(props.selected);
    }
  }, [!!props.open])

  return <Dialog visible={!!props.open} onDismiss={props.onClose} style={{
    backgroundColor: theme.colors.background,
    padding: 8,
    maxHeight: '80vh',
  }}>
    <Title>{subcategory?.label}</Title>
    <FlatList
      style={{ flex: 1, marginVertical: 4 }}
      data={subcategory?.tasks}
      keyExtractor={item => item.id!.toString()}
      renderItem={({ item }) => (
        <Card key={item.id} style={{ margin: 4 }}
          onPress={() => {
            if (selected.includes(item.id!)) {
              setSelected(selected.filter(x => x !== item.id!));
            } else {
              setSelected([...selected, item.id!]);
            }
          }}
        >
          <View style={{ padding: 8, flexDirection: 'row' }}>
            <CustomCheckbox checked={selected.includes(item.id!)} />
            <Text>{item.task_description}</Text>
          </View>
        </Card>
      )}
    />
    <Button onPress={() => { props.onClose(); props.onSelect(selected) }}>
      Ok
    </Button>
  </Dialog>;
});
