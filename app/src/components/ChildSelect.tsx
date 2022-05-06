import React from "react";
import { Button, Menu } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { childrenByChildState, childState } from "../store";

interface ChildSelectProps {
  selected: number;
  selectChild: (childId: number) => void;
}

export const ChildSelect = React.memo(function ChildSelect(props: ChildSelectProps) {
  const child = useRecoilValue(childState(props.selected));
  const children = useRecoilValue(childrenByChildState(props.selected));
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
        {child?.name}
      </Button>
    }
  >
    {children.map(x => (
      <Menu.Item key={x.id} title={x.name} onPress={() => props.selectChild(x.id)} />
    ))}
  </Menu>
});
