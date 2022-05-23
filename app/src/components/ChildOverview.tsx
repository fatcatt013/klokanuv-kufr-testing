import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image, SafeAreaView } from 'react-native';
import { Portal } from 'react-native-paper';
import { ChildIDContext } from '../lib/contexts';
import { RootStackParamList } from '../lib/navigation';
import { CreateAssessmentFAB } from './CreateAssessmentFAB';

type Props = StackScreenProps<RootStackParamList, 'Child'>;

export function ChildOverview({ navigation }: Props) {
  const childId = React.useContext(ChildIDContext);
  const isFocused = useIsFocused();

  return (
    <SafeAreaView>
      <Image
        source={require('../../assets/pavouk.png')}
        style={{ width: 300, height: 300, alignSelf: 'center', margin: 5 }}
      />

      <Portal>
        <CreateAssessmentFAB
          visible={isFocused}
          onPress={() => navigation.push('CreateAssessment', { children: [childId], tasks: [] })}
        />
      </Portal>
    </SafeAreaView>
  );
}
