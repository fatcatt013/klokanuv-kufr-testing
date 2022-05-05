import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, Checkbox, Text } from 'react-native-paper';
import { Background } from '../components/Background';
import { ChildPicker } from '../components/ChildPicker';
import { RootStackParamList } from '../lib/navigation';

type Props = StackScreenProps<RootStackParamList, 'Assessment'>;

export const AssessmentScreen = React.memo(function AssessmentScreen({ }: Props) {
  return <Background>
    <Text>Název úkolu</Text>
    <Text>Třída</Text>
    <Checkbox status={'unchecked'}>Anicka</Checkbox>
    <Checkbox status={'unchecked'}>Petr</Checkbox>
    <Checkbox status={'unchecked'}>Tomas</Checkbox>
    <Checkbox status={'unchecked'}>Jana</Checkbox>
    <ChildPicker classId={1} selectChildren={() => { }} />
    <Button> Vyplnit</Button>
  </Background>
})
