import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Headline, Portal, Subheading, Text } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { ChildIDContext } from '../../lib/contexts';
import { RootStackParamList } from '../../lib/navigation';
import { categoriesState, childState, childTotalStatsState, subcategoriesState } from '../../store';
import { CategoryChart } from '../CategoryChart';
import { icons } from '../icons';
import { MultiFAB } from '../MultiFAB';

type Props = StackScreenProps<RootStackParamList, 'Child'>;

export function ChildOverview({ }: Props) {
  const isFocused = useIsFocused();
  const childId = React.useContext(ChildIDContext);
  const child = useRecoilValue(childState(childId));
  const categories = useRecoilValue(categoriesState);
  const subcategories = useRecoilValue(subcategoriesState);

  const { categoryStats } = useRecoilValue(childTotalStatsState(childId));

  return (
    <SafeAreaView style={{ height: "auto", maxHeight: '100%' }}>
      <Headline>{child?.first_name} {child?.last_name}</Headline>
      <Subheading>Věk: {child?.ageString}</Subheading>

      <ScrollView>
        <CategoryChart {...{ categoryStats }} />

        {(categories.map((item, i) => {
          const stats = categoryStats.find(x => x.categoryId === item.id!)!;
          return (
            <View key={i}>
              <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ alignSelf: 'flex-end', fontSize: 20 }}>{item.label}</Text>
                {React.createElement(icons[item.label], {
                  style: {
                    width: 40, height: 40,
                    marginRight: 5,
                  }
                })}
              </View>
              {item.subcategories.map(subId => {
                const sub = subcategories.find(x => x.id! === subId);
                const subStats = stats.subcategoryStats.find(x => x.subcategoryId === subId)!;
                return (
                  <View key={subId} style={{ marginVertical: 2, flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ flex: 3 }}>{sub?.label}</Text>
                    <Text numberOfLines={1} style={{ flex: 1, textAlign: 'right' }}>
                      {Math.round(subStats?.score * 100)}{'% '}
                      ({Math.round(subStats?.fillRate * 100)}%)
                    </Text>
                  </View>
                );
              })}
            </View>
          );
        }))}
      </ScrollView>

      <Portal>
        <MultiFAB tabs visible={isFocused} initial={{ childIds: [childId] }} />
      </Portal>
    </SafeAreaView >
  );
}
