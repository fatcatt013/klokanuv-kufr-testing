import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { Headline, Subheading, Text } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { ClassIDContext } from '../../lib/contexts';
import { RootStackParamList } from '../../lib/navigation';
import { categoriesState, classChildrenState, classState, classStatsState } from '../../store';
import { CategoryChart } from '../CategoryChart';
import { icons } from '../icons';
import { useMultiFABScroll } from '../MultiFABContext';

type Props = StackScreenProps<RootStackParamList, 'Class'>;

export function ClassOverview({ }: Props) {
  const classId = React.useContext(ClassIDContext);
  const categories = useRecoilValue(categoriesState);
  const classroom = useRecoilValue(classState(classId));
  const children = useRecoilValue(classChildrenState(classId));
  const { averageAge, categoryStats } = useRecoilValue(classStatsState(classId));
  const isFocused = useIsFocused();
  const { setStatus, handleScroll } = useMultiFABScroll()

  React.useEffect(() => {
    if (isFocused) {
      setStatus({ initial: { classId } })
    }
  }, [isFocused, setStatus, classId]);

  return (
    <SafeAreaView style={{ height: "auto", maxHeight: '100%' }}>
      <Headline>{classroom?.label}</Headline>
      <Subheading>
        {children.length}{' '}
        {children.length === 1 ? 'dítě' : children.length < 5 ? 'děti' : 'dětí'}{', '}
        průměrný věk: {Math.round(averageAge * 100) / 100} let
      </Subheading>
      <ScrollView onScroll={handleScroll}>
        <CategoryChart {...{ categoryStats }} />

        {(categories.map((item, i) => {
          const stats = categoryStats.find(x => x.categoryId === item.id!)!;
          if (!stats.laggingChildren.length && !stats.notFilledOutChildren.length) {
            return <View key={i} />
          }
          return (
            <View key={i}>
              <View style={{ marginTop: 10, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ alignSelf: 'flex-end', fontSize: 20 }}>{item.label}</Text>
                {React.createElement(icons[item.label], {
                  style: {
                    width: 40, height: 40,
                    marginRight: 5,
                  }
                })}
              </View>
              {stats.laggingChildren.length > 0 && <View>
                <Text style={{ fontWeight: 'bold', marginTop: 5 }}>Děti, které potřebují přidat/podpořit</Text>
                {stats.laggingChildren.map(child => <Text key={child.id!}>{child.shortName}</Text>)}
              </View>}

              {stats.notFilledOutChildren.length > 0 && <View>
                <Text style={{ fontWeight: 'bold', marginTop: 5 }}>Děti, které nemají vyplněno</Text>
                {stats.notFilledOutChildren.map(child => <Text key={child.id!}>{child.shortName}</Text>)}
              </View>}
            </View>
          );
        }))}
      </ScrollView>
    </SafeAreaView >
  );
}
