import React from "react";
import { FlatList, View } from "react-native";
import { Button, Card, Dialog, Text, Title, useTheme } from "react-native-paper";
import { useClassroom } from "../use-school-data";
import { CustomCheckbox } from './CustomCheckbox'

interface ChildPickerProps {
  open: boolean;
  classroom: number;
  selected: number[];
  onSelect: (selected: number[]) => void;
  onClose: () => void;
}

export const ChildPicker = React.memo(function ChildPicker(props: ChildPickerProps) {
  const theme = useTheme();
  const classroom = useClassroom(props.classroom);
  const [selected, setSelected] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (props.open) {
      console.log('reloading');
      setSelected(props.selected);
    }
  }, [!!props.open])

  return <Dialog visible={!!props.open} onDismiss={props.onClose} style={{
    backgroundColor: theme.colors.background,
    padding: 8,
  }}>
    <Title>{classroom?.label}</Title>
    <FlatList
      style={{ flex: 1, marginVertical: 4 }}
      data={classroom?.children}
      keyExtractor={item => item.id!.toString()}
      numColumns={2}
      renderItem={({ item }) => (
        <Card
          style={{
            flex: 1,
            padding: 8,
            margin: 3,
            backgroundColor:
              !item.gender ? undefined :
                item.gender === "M" ? theme.colors.blue : theme.colors.red
          }}
          onPress={() => {
            if (selected.includes(item.id!)) {
              setSelected(selected.filter(x => x !== item.id!));
            } else {
              setSelected([...selected, item.id!]);
            }
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ marginLeft: 10, color: 'white' }}>
              {item.first_name} {item.last_name.slice(0, 1)}.
            </Text>
            <CustomCheckbox
              size={15}
              checkedColor='white'
              checked={selected.includes(item.id!)}
            />
          </View>
        </Card>
      )}
    />

    <Button onPress={() => { props.onClose(); props.onSelect(selected) }}>
      Ok
    </Button>

  </Dialog>;
});
