import React from 'react';
import { FlatList, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { categoriesState } from '../store';
import { icons } from './icons';

interface CategoryPickerProps {
  onSelect: (catId: number) => void;
}

export const CategoryPicker = ({ onSelect }: CategoryPickerProps) => {
  const categories = useRecoilValue(categoriesState);

  return <FlatList
    data={categories}
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
