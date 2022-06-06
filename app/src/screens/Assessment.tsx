import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native-paper';
import { Background } from '../components/Background';
import { RootStackParamList } from '../lib/navigation';

type Props = StackScreenProps<RootStackParamList, 'Assessment'>;

export const AssessmentScreen = React.memo(function AssessmentScreen({ }: Props) {
  return <Background>
    <Text>Název úkolu</Text>
    <Text>Třída</Text>
  </Background>
})
