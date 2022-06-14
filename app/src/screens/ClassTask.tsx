import React from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView, View } from 'react-native';
import { Headline, Portal, Text } from 'react-native-paper';
import { RootStackParamList } from '../lib/navigation';
import { useRecoilValue } from 'recoil';
import { assessmentTypeState, taskState } from '../store';
import { useMultiFABScroll } from '../components/MultiFABContext';
import { MultiFAB } from '../components/MultiFAB';

type Props = StackScreenProps<RootStackParamList, 'ClassTask'>;

export const ClassTaskScreen = React.memo(function ClassTaskScreen({ route }: Props) {
  const { classId, taskId } = route.params;
  const task = useRecoilValue(taskState(taskId))!;
  const assessmentType = useRecoilValue(assessmentTypeState(task.assessment_type));
  const isFocused = useIsFocused();
  const { setStatus } = useMultiFABScroll();

  React.useEffect(() => {
    if (isFocused) {
      setStatus({ initial: { classId, taskIds: [task.id!] } })
    }
  }, [isFocused, setStatus, classId, task.id]);

  return <SafeAreaView style={{ margin: 5 }}>
    <Headline>{task.task_description}</Headline>
    <View style={{ flexGrow: 1 }}>
      {(assessmentType?.options || []).map((x, i) => (
        <Text key={i} style={{ paddingLeft: 10, margin: 3 }}>{'\u2B24'} {x.label}</Text>
      ))}
    </View>
    <Portal><MultiFAB visible={isFocused} /></Portal>
  </SafeAreaView>;
});
