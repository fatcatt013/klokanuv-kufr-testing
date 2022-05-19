import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { Background } from '../components/Background';
import { useCategory } from '../use-core-data';
import { FlatList } from 'react-native';
import { Card, Headline } from 'react-native-paper';

type Props = StackScreenProps<RootStackParamList, 'Category'>;

export const CategoryScreen = React.memo(function CategoryScreen({ route, navigation }: Props) {
  const category = useCategory(route.params.categoryId);
  return <Background>
    <FlatList
      data={category?.subcategories}
      keyExtractor={(item) => item.id!.toString()}
      renderItem={({ item }) => (
        <Card style={{ margin: 5, padding: 10 }} onPress={() => navigation.push('Subcategory', { subcategoryId: item.id!! })}>
          <Headline>
            {item.label}
          </Headline>
        </Card>
      )}
    />
  </Background>;
});
