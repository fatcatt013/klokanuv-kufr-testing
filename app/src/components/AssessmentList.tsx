import { FlatList } from "react-native";
import { Card, Headline, Text } from "react-native-paper";
import { useRecoilValue } from "recoil";
import { childAssessmentState, classAssessmentState } from "../store";

type AssessmentListProps = {
  classId?: number;
  childId?: number;
};

export function AssessmentList(props: AssessmentListProps) {
  const childAssessments = useRecoilValue(childAssessmentState(props?.childId));
  const classAssessments = useRecoilValue(classAssessmentState(props?.classId));
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
