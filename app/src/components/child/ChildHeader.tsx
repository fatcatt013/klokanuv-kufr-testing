import React from "react";
import { View } from "react-native";
import { Caption, Subheading } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { childState, classByChildState } from "../../store";

interface ChildHeaderProps {
  childId: number;
}

export const ChildHeader = React.memo(function ChildHeader(props: ChildHeaderProps) {
  const child = useRecoilValue(childState(props.childId));
  const classroom = useRecoilValue(classByChildState(props.childId));

  return <View style={{ flexDirection: 'column' }}>
    <Caption style={{ color: 'white' }}>{classroom?.label}</Caption>
    <Subheading style={{ color: 'white', marginTop: -4, fontWeight: 'bold' }}>
      {child?.first_name} {child?.last_name}
    </Subheading>
  </View>
});
