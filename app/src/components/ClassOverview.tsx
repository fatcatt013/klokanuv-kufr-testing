import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image, SafeAreaView } from 'react-native';
import { Portal } from 'react-native-paper';
import { ClassIDContext } from '../lib/contexts';
import { RootStackParamList } from '../lib/navigation';
import { CreateAssessmentFAB } from './CreateAssessmentFAB';

type Props = StackScreenProps<RootStackParamList, 'Class'>;

export function ClassOverview({ navigation }: Props) {
  const classId = React.useContext(ClassIDContext);
  const classroom = useClassroom(classId);
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
          onPress={() => navigation.push('CreateAssessment', { children: classroom?.children?.map(x => x.id!) || [], tasks: [] })}
        />
      </Portal>
    </SafeAreaView>
  );
}
