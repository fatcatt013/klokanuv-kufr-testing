import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import intervalToDuration from 'date-fns/intervalToDuration';
import React from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import { Headline, Portal, Subheading, Text } from 'react-native-paper';
import { ChildIDContext } from '../lib/contexts';
import { RootStackParamList } from '../lib/navigation';
import { useChild } from '../use-school-data';
import { CreateAssessmentFAB } from './CreateAssessmentFAB';
import { useCoreData } from '../use-core-data';
import { icons } from './icons';

type Props = StackScreenProps<RootStackParamList, 'Child'>;

export function ChildOverview({ navigation }: Props) {
  const isFocused = useIsFocused();
  const childId = React.useContext(ChildIDContext);
  const child = useChild(childId);
  const { data: coreData } = useCoreData();

  const age = intervalToDuration({
    start: new Date(child?.birthdate || ''),
    end: new Date(),
  });
  const years = (age.years || 0) + (age.months || 0) / 12 + (age.days || 0) / 365;

  return (
    <SafeAreaView>
      <Headline>{child?.first_name} {child?.last_name}</Headline>
      <Subheading>Věk: {Math.round(100 * years) / 100} let</Subheading>

      <Image
        source={require('../../assets/pavouk.png')}
        style={{ width: 300, height: 300, alignSelf: 'center', margin: 5 }}
      />

      {(coreData?.categories.map((item) => (
        <View>
          {React.createElement(icons[item.label], {
            style: { width: 55, height: 55, marginHorizontal: 'auto' },
          })}
          <Text style={{ marginTop: 5, fontSize: 13 }}>{item.label}</Text>
        </View>
      )))}

      <Portal>
        <CreateAssessmentFAB
          visible={isFocused}
          onPress={() => navigation.push('CreateAssessment', { children: [childId], tasks: [] })}
        />
      </Portal>
    </SafeAreaView>
  );
}
