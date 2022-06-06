import React from "react";
import { Button, Menu } from "react-native-paper";
import { useClassroom, useClassrooms } from "../../use-school-data";

interface ClassHeaderProps {
  selected: number;
  selectClass: (classId: number) => void;
}

export const ClassHeader = React.memo(function ClassHeader(props: ClassHeaderProps) {
  const classData = useClassroom(props.selected);
  const classrooms = useClassrooms()
  const [visible, setVisible] = React.useState(false);

  return <Menu
    visible={visible}
    onDismiss={() => setVisible(false)}
    anchor={
      <Button
        icon="chevron-down"
        color="white"
        onPress={() => setVisible(true)}
        contentStyle={{ flexDirection: 'row-reverse' }}
      >
        {classData?.label}
      </Button>
    }
  >
    {classrooms.map(x => (
      <Menu.Item key={x.id} title={x.label} onPress={() => props.selectClass(x.id!)} />
    ))}
  </Menu>
});
