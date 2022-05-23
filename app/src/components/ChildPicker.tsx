import React from "react";
import { FlatList, View } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import { useClassroom } from "../use-school-data";
import { CustomCheckbox } from './CustomCheckbox'

interface ChildPickerProps {
  classroom: number;
  selected: number[];
  onSelect: (selected: number[]) => void;
}

export const ChildPicker = React.memo(function ChildPicker(props: ChildPickerProps) {
  const theme = useTheme();
  const classroom = useClassroom(props.classroom);

  return <FlatList
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
          if (props.selected.includes(item.id!)) {
            props.onSelect(props.selected.filter(x => x !== item.id!));
          } else {
            props.onSelect([...props.selected, item.id!]);
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
            checked={props.selected.includes(item.id!)}
          />
        </View>
      </Card>
    )}
  />
});
