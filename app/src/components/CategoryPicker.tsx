import React from 'react';
import { FlatList, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Components } from '../server';
import { useCoreData } from '../use-core-data';
import { icons } from './icons';

interface CategoryPickerProps {
  onSelect: (catId: number) => void;
}

export const CategoryPicker = ({ onSelect }: CategoryPickerProps) => {
  const { data } = useCoreData();
  const categories = [...(data?.categories || [])];
  let ordered: Components.Schemas.Category[] = [];
  Object.keys(icons).forEach((label) => {
    const i = categories.findIndex((x) => x.label === label);
    if (i > -1) {
      ordered = ordered.concat(categories.splice(i, 1));
    }
  });
  ordered = ordered.concat(categories);

  return <FlatList
    data={ordered}
    keyExtractor={(item) => item.id!.toString()}
    numColumns={2}
    renderItem={({ item }) => (
      <Card key={item.id}
        onPress={() => onSelect(item.id!)}
        style={{ flex: 1, margin: 2, padding: 8 }}
      >
        <View style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}>
          {React.createElement(icons[item.label], {
            style: { width: 55, height: 55, marginHorizontal: 'auto' },
          })}
          <Text style={{ alignSelf: 'stretch', textAlign: 'center', marginTop: 5, fontSize: 13 }}>{item.label}</Text>
        </View>
      </Card>
    )}
  />;
};
