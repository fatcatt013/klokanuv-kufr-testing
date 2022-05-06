import React from "react";
import { Button, Menu } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { groupsState, groupState } from "../store";

interface GroupSelectProps {
  selected: number;
  selectGroup: (groupId: number) => void;
}

export const GroupSelect = React.memo(function GroupSelect(props: GroupSelectProps) {
  const group = useRecoilValue(groupState(props.selected));
  const groups = useRecoilValue(groupsState);
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
        {group?.name}
      </Button>
    }
  >
    {groups.map(x => (
      <Menu.Item key={x.id} title={x.name} onPress={() => props.selectGroup(x.id)} />
    ))}
  </Menu>
});
