import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, Text } from 'react-native-paper';
import { Background } from '../components/Background';
import { ChildPicker } from '../components/ChildPicker';
import { RootStackParamList } from '../lib/navigation';

type Props = StackScreenProps<RootStackParamList, 'CreateAssessment'>;

export const CreateAssessmentScreen = React.memo(function CreateAssessmentScreen({ }: Props) {
  return <Background>
    <Text>Název úkolu</Text>
    <Text>Třída</Text>
    <ChildPicker classId={1} selectChildren={() => { }} />
    <Button> Vyplnit</Button>
  </Background>
})
