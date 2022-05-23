import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView, View } from "react-native";
import { Headline, Portal, Text } from "react-native-paper";
import { RootStackParamList } from "../lib/navigation";
import { useAssessmentType, useTask } from "../use-core-data";
import { useIsFocused } from "@react-navigation/native";
import { CreateNoteFAB } from "../components/CreateNoteFAB";

type Props = StackScreenProps<RootStackParamList, 'Task'>;

export const TaskScreen = React.memo(function TaskScreen({ route, navigation }: Props) {
  const task = useTask(route.params.taskId);
  const assessmentType = useAssessmentType(task?.assessment_type!!);
  const isFocused = useIsFocused();

  return <SafeAreaView style={{ margin: 5 }}>
    <Headline>{task?.task_description}</Headline>
    <View style={{ flexGrow: 1 }}>
      {(assessmentType?.options || []).map((x, i) =>
        <Text key={i} style={{ paddingLeft: 10, margin: 3 }}>{'\u2B24'} {x.label}</Text>
      )}
    </View>

    <Portal>
      <CreateNoteFAB
        visible={isFocused}
        onPress={() => navigation.push('CreateAssessment', { children: [], tasks: [task?.id!!] })}
      />
    </Portal>
  </SafeAreaView>
})
