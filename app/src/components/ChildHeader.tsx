import React from "react";
import { View } from "react-native";
import { Caption, Subheading } from "react-native-paper";
import { useChild, useSchoolData } from "../use-school-data";

interface ChildHeaderProps {
  childId: number;
}

export const ChildHeader = React.memo(function ChildHeader(props: ChildHeaderProps) {
  const { data } = useSchoolData();
  const child = useChild(props.childId);
  const classroom = data?.classes?.find(x => x.children.includes(props.childId));

  return <View style={{ flexDirection: 'column' }}>
    <Caption style={{ color: 'white' }}>{classroom?.label}</Caption>
    <Subheading style={{ color: 'white', marginTop: -4, fontWeight: 'bold' }}>
      {child?.first_name} {child?.last_name}
    </Subheading>
  </View>
});
