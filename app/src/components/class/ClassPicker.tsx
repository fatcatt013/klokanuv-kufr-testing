import React from "react";
import { FlatList } from "react-native";
import { Card, Text } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { classesState } from "../../store";

interface ClassroomPickerProps {
  onSelect: (catId: number) => void;
}

export const ClassroomPicker = ({ onSelect }: ClassroomPickerProps) => {
  const classrooms = useRecoilValue(classesState);

  return <FlatList
    data={classrooms}
    keyExtractor={item => item.id!.toString()}
    renderItem={({ item }) => (
      <Card style={{ margin: 4 }} onPress={() => onSelect(item.id!)}>
        <Card.Content>
          <Text>{item.label}</Text>
        </Card.Content>
      </Card>
    )}
  />;
}
