import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView, View } from 'react-native';
import { Headline, Portal, Text } from 'react-native-paper';
import { RootStackParamList } from '../lib/navigation';
import { useAssessmentType, useTask } from '../use-core-data';
import { CreateAssessmentFAB } from '../components/CreateAssessmentFAB';
import { useClassroom } from '../use-school-data';

type Props = StackScreenProps<RootStackParamList, 'ClassTask'>;

export const ClassTaskScreen = React.memo(function ClassTaskScreen({ route, navigation }: Props) {
  const task = useTask(route.params.taskId);
  const classId = route.params.classId;
  const classroom = useClassroom(classId);
  const assessmentType = useAssessmentType(task?.assessment_type!);
  const isFocused = useIsFocused();

  return <SafeAreaView style={{ margin: 5 }}>
    <Headline>{task?.task_description}</Headline>
    <View style={{ flexGrow: 1 }}>
      {(assessmentType?.options || []).map((x, i) => (
        <Text key={i} style={{ paddingLeft: 10, margin: 3 }}>{'\u2B24'} {x.label}</Text>
      ))}
    </View>

    <Portal>
      <CreateAssessmentFAB
        visible={isFocused}
        onPress={() => navigation.push('CreateAssessment', { children: classroom?.children?.map(x => x.id!) || [], tasks: [task?.id!] })}
      />
    </Portal>
  </SafeAreaView>
})
