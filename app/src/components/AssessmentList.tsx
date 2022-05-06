import React from 'react';
import { FlatList } from "react-native";
import { Card, Headline, Text } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { ChildIDContext, ClassIDContext } from '../lib/contexts';
import { childAssessmentState, classAssessmentState } from "../store";

export function AssessmentList() {
  const classId = React.useContext(ClassIDContext);
  const childId = React.useContext(ChildIDContext);

  const childAssessments = useRecoilValue(childAssessmentState(childId));
  const classAssessments = useRecoilValue(classAssessmentState(classId));
  const assessments = childAssessments.concat(classAssessments);

  return (
    <FlatList
      data={assessments}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card style={{ margin: 5, padding: 10 }}>
          <Headline>{item.task}</Headline>
          <Text>{item.date_of_assessment}</Text>
          <Text>{item.note}</Text>
        </Card>
      )}
    />
  );
}
