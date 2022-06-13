import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import { Headline, Portal, Subheading, Text } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { ChildIDContext } from '../../lib/contexts';
import { RootStackParamList } from '../../lib/navigation';
import { categoriesState, childState, childTotalStatsState } from '../../store';
import { icons } from '../icons';
import { MultiFAB } from '../MultiFAB';

type Props = StackScreenProps<RootStackParamList, 'Child'>;

export function ChildOverview({ }: Props) {
  const isFocused = useIsFocused();
  const childId = React.useContext(ChildIDContext);
  const child = useRecoilValue(childState(childId));
  const categories = useRecoilValue(categoriesState);

  const childStats = useRecoilValue(childTotalStatsState(childId));

  return (
    <SafeAreaView>
      <Text>Skóre: {Math.round(childStats.averageScore * 10000) / 100}%</Text>
      <Text>Vyplněnost: {Math.round(childStats.averageFillRate * 10000) / 100}%</Text>
      <Headline>{child?.first_name} {child?.last_name}</Headline>
      <Subheading>Věk: {child?.ageString}</Subheading>

      <Image
        source={require('../../../assets/pavouk.png')}
        style={{ width: 300, height: 300, alignSelf: 'center', margin: 5 }}
      />

      {(categories.map((item, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
          {React.createElement(icons[item.label], { style: { width: 40, height: 40 } })}
          <Text style={{ marginTop: 5, fontSize: 13 }}>{item.label}</Text>
        </View>
      )))}

      <Portal>
        <MultiFAB tabs visible={isFocused} initial={{ childIds: [childId] }} />
      </Portal>
    </SafeAreaView>
  );
}
