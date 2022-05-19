import React from 'react';
import { FlatList, View } from "react-native";
import { Card, Text, Title } from "react-native-paper";
import { ClassIDContext } from '../lib/contexts';
import { useClassAssessments } from '../use-assessment-data';
import { useCoreData } from '../use-core-data';
import { useSchoolData } from '../use-school-data';

export function ClassAssessmentList() {
  const classId = React.useContext(ClassIDContext);
  const assessments = useClassAssessments(classId);
  const { data: coreData } = useCoreData();
  const { tasks, assessmentTypes } = coreData!!;
  const { data: schoolData } = useSchoolData();
  const { children } = schoolData!!;

  return (
    <FlatList
      data={assessments}
      keyExtractor={(item) => item.id!.toString()}
      renderItem={({ item }) => {
        const task = tasks.find(x => x.id as any === item.task);
        const child = children?.find(x => x.id === item.child);
        const atype = assessmentTypes?.find(x => x.id === task?.assessment_type);
        const option = atype?.options?.find(x => x.id === item.option);
        return <Card style={{ margin: 5, padding: 10 }}>
          <View style={{ flexDirection: 'row', marginBottom: 8, justifyContent: 'space-between' }}>
            <Text style={{ fontWeight: 'bold' }}>{task?.task_description}</Text>
            <Text style={{ minWidth: 100, textAlign: 'right' }}>{item.date_of_assessment}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{option?.label}</Text>
            <Text style={{ fontWeight: 'bold' }}>{child?.first_name} {child?.last_name}</Text>
          </View>
        </Card>
      }}
    />
  );
}
