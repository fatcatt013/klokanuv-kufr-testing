import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { SafeAreaView, View } from 'react-native';
import { Headline, Portal, Text } from 'react-native-paper';
import { RootStackParamList } from '../lib/navigation';
import { useIsFocused } from '@react-navigation/native';
import { useRecoilValue } from 'recoil';
import { assessmentTypeState, taskState } from '../store';
import { useMultiFABScroll } from '../components/MultiFABContext';
import { MultiFAB } from '../components/MultiFAB';

type Props = StackScreenProps<RootStackParamList, 'ChildTask'>;

export const ChildTaskScreen = React.memo(function ChildTaskScreen({ route }: Props) {
  const { childId, taskId } = route.params;
  const isFocused = useIsFocused();
  const task = useRecoilValue(taskState(taskId))!;
  const assessmentType = useRecoilValue(assessmentTypeState(task.assessment_type));
  const { setStatus } = useMultiFABScroll();

  React.useEffect(() => {
    if (isFocused) {
      setStatus({ initial: { childIds: [childId], taskIds: [task.id!] } })
    }
  }, [isFocused, setStatus, childId, task.id]);

  return <SafeAreaView style={{ margin: 5 }}>
    <Headline>{task?.task_description}</Headline>
    <View style={{ flexGrow: 1 }}>
      {(assessmentType?.options || []).map((x, i) => (
        <Text key={i} style={{ paddingLeft: 10, margin: 3 }}>{'\u2B24'} {x.label}</Text>
      ))}
    </View>
    <Portal><MultiFAB visible={isFocused} /></Portal>
  </SafeAreaView>
})
