import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView } from "react-native";
import { Headline, Text } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { RootStackParamList } from "../lib/navigation";
import { taskState } from "../store";

type Props = StackScreenProps<RootStackParamList, 'Task'>;

export const TaskScreen = React.memo(function TaskScreen({ route }: Props) {
  const task = useRecoilValue(taskState(route.params.taskId));

  return <SafeAreaView style={{ margin: 5 }}>
    <Headline>{task?.task_description}</Headline>
    {task?.assessment_type.options.map((x, i) =>
      <Text key={i} style={{ paddingLeft: 10, margin: 3 }}>{'\u2B24'} {x.label}</Text>
    )}
  </SafeAreaView>
})
