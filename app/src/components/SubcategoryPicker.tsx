import React from "react";
import { Card, Dialog, Text, Title, useTheme } from "react-native-paper";
import { useCategory } from "../use-core-data";

interface SubcategoryPickerProps {
  open: boolean;
  category: number;
  onSelect: (catId: number) => void;
  onClose: () => void;
}

export const SubcategoryPicker = (props: SubcategoryPickerProps) => {
  const category = useCategory(props.category);
  const theme = useTheme();

  return <Dialog visible={!!props.open} onDismiss={props.onClose} style={{
    backgroundColor: theme.colors.background,
    padding: 8,
  }}>
    <Title>{category?.label}</Title>
    {category?.subcategories.map(sub => (
      <Card key={sub.id} style={{ margin: 4 }} onPress={() => { props.onClose(); props.onSelect(sub.id!!) }}>
        <Card.Content>
          <Text>{sub.label}</Text>
        </Card.Content>
      </Card>
    ))}
  </Dialog>;
}
