import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image, SafeAreaView } from 'react-native';
import { Portal } from 'react-native-paper';
import { ClassIDContext } from '../../lib/contexts';
import { RootStackParamList } from '../../lib/navigation';
import { MultiFAB } from '../MultiFAB';

type Props = StackScreenProps<RootStackParamList, 'Class'>;

export function ClassOverview({ }: Props) {
  const classId = React.useContext(ClassIDContext);
  const isFocused = useIsFocused();

  return (
    <SafeAreaView>
      <Image
        source={require('../../../assets/pavouk.png')}
        style={{ width: 300, height: 300, alignSelf: 'center', margin: 5 }}
      />

      <Portal>
        <MultiFAB tabs visible={isFocused} initial={{ classId }} />
      </Portal>
    </SafeAreaView>
  );
}
