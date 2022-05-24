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

  const children = (classroom?.children || []).sort((x, y) => -0.5 + x.first_name.localeCompare(y.first_name));

  const toggleId = React.useCallback((id: number) => {
    if (props.selected.includes(id)) {
      props.onSelect(props.selected.filter(x => x !== id));
    } else {
      props.onSelect([...props.selected, id]);
    }
  }, [props]);

  return <FlatList
    data={children}
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
        onPress={() => toggleId(item.id!)}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ marginLeft: 10, color: 'white' }}>
            {item.first_name} {item.last_name.slice(0, 1)}.
          </Text>
          <CustomCheckbox
            iconStyle={{ color: 'white' }}
            checked={props.selected.includes(item.id!)}
            onPress={() => toggleId(item.id!)}
          />
        </View>
      </Card>
    )}
  />
});
