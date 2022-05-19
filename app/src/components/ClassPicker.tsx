import React from "react";
import { Card, Dialog, Text, useTheme } from "react-native-paper";
import { useClassrooms } from "../use-school-data";

interface ClassroomPickerProps {
  open: boolean;
  onSelect: (catId: number) => void;
  onClose: () => void;
}

export const ClassroomPicker = ({ onSelect, onClose, open }: ClassroomPickerProps) => {
  const classrooms = useClassrooms()
  const theme = useTheme();

  return <Dialog visible={!!open} onDismiss={onClose} style={{
    backgroundColor: theme.colors.background,
    padding: 8,
  }}>
    {classrooms.map(sub => (
      <Card key={sub.id} style={{ margin: 4 }} onPress={() => { onClose(); onSelect(sub.id!!) }}>
        <Card.Content>
          <Text>{sub.label}</Text>
        </Card.Content>
      </Card>
    ))}
  </Dialog>;
}
