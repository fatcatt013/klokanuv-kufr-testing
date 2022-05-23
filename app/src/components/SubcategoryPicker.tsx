import React from "react";
import { FlatList } from "react-native";
import { Card, Text } from "react-native-paper";
import { useCategory } from "../use-core-data";

interface SubcategoryPickerProps {
  category: number;
  onSelect: (catId: number) => void;
}

export const SubcategoryPicker = (props: SubcategoryPickerProps) => {
  const category = useCategory(props.category);

  return <FlatList
    style={{ marginVertical: 4 }}
    data={category?.subcategories}
    keyExtractor={item => item.id!.toString()}
    renderItem={({ item }) => (
      <Card key={item.id} style={{ margin: 4 }} onPress={() => props.onSelect(item.id!!)}>
        <Card.Content>
          <Text>{item.label}</Text>
        </Card.Content>
      </Card>
    )}
  />;
}
