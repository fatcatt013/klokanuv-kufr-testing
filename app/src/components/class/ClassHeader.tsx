import React from "react";
import { Button, Menu } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { classesState, classState } from "../../store";

interface ClassHeaderProps {
  selected: number;
  selectClass: (classId: number) => void;
}

export const ClassHeader = React.memo(function ClassHeader(props: ClassHeaderProps) {
  const classrooms = useRecoilValue(classesState);
  const classroom = useRecoilValue(classState(props.selected));
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
        {classroom?.label}
      </Button>
    }
  >
    {classrooms.map(x => (
      <Menu.Item key={x.id} title={x.label} onPress={() => {
        props.selectClass(x.id!);
        setVisible(false);
      }} />
    ))}
  </Menu>
});
