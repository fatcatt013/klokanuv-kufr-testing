import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { SafeAreaView, View } from "react-native";
import { FAB, Headline, Portal, Text, useTheme } from "react-native-paper";
import { RootStackParamList } from "../lib/navigation";
import { useAssessmentType, useTask } from "../use-core-data";
import { useIsFocused } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = StackScreenProps<RootStackParamList, 'Task'>;

export const TaskScreen = React.memo(function TaskScreen({ route, navigation }: Props) {
  const task = useTask(route.params.taskId);
  const assessmentType = useAssessmentType(task?.assessment_type!!);
  const isFocused = useIsFocused();
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  return <SafeAreaView style={{ margin: 5 }}>
    <Headline>{task?.task_description}</Headline>
    <View style={{ flexGrow: 1 }}>
      {(assessmentType?.options || []).map((x, i) =>
        <Text key={i} style={{ paddingLeft: 10, margin: 3 }}>{'\u2B24'} {x.label}</Text>
      )}
    </View>
    <Portal>
      <FAB
        visible={isFocused}
        icon="note-plus-outline"
        color="white"
        style={{
          backgroundColor: theme.colors.blue,
          position: 'absolute',
          bottom: insets.bottom + 54 + 16,
          right: insets.right + 16,
        }}
        onPress={() => navigation.push('CreateAssessment', { children: [], tasks: [task?.id!!] })}
      />
    </Portal>

  </SafeAreaView>
})
