import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { FlatList, View } from "react-native";
import { Card, Portal, Text } from "react-native-paper";
import { ChildIDContext } from '../lib/contexts';
import { useChildAssessments } from '../use-assessment-data';
import { useCoreData } from '../use-core-data';
import { CreateAssessmentFAB } from './CreateAssessmentFAB';

export function ChildAssessmentList({ navigation }: any) {
  const childId = React.useContext(ChildIDContext);
  const assessments = useChildAssessments(childId);
  const { data: coreData } = useCoreData();
  const { tasks, assessmentTypes } = coreData!!;
  const isFocused = useIsFocused()

  return <>
    <FlatList
      data={assessments}
      keyExtractor={(item) => item.id!.toString()}
      renderItem={({ item }) => {
        const task = tasks.find(x => x.id as any === item.task);
        const atype = assessmentTypes?.find(x => x.id === task?.assessment_type);
        const option = atype?.options?.find(x => x.id === item.option);
        return <Card style={{ margin: 5, padding: 10 }}>
          <View style={{ flexDirection: 'row', marginBottom: 8, justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold' }}>{task?.task_description}</Text>
            <Text style={{ minWidth: 100, textAlign: 'right' }}>{item.date_of_assessment}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{option?.label}</Text>
          </View>
        </Card>
      }}
    />
    <Portal>
      <CreateAssessmentFAB
        visible={isFocused}
        onPress={() => navigation.push('CreateAssessment', { children: [childId], tasks: [] })}
      />
    </Portal>
  </>;
}
