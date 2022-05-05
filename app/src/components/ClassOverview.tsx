import React from 'react';
import { FlatList, Image, SafeAreaView } from 'react-native';
import { Button } from '../components/Button';
import { theme } from '../theme';
import { childrenByGroupState } from '../store';
import { useRecoilValue } from 'recoil';

export function ClassOverview({ classId }: { classId: number }) {
  const children = useRecoilValue(childrenByGroupState(classId));

  return (
    <SafeAreaView>
      <Image source={require('../../assets/pavouk.png')} style={{ width: 300, height: 300 }} />
      <FlatList
        data={children}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <SafeAreaView style={{ flex: 1, margin: 5 }}>
            <Button mode='contained' style={{ backgroundColor: theme.colors.lightBlue }}>
              {item.name}
            </Button>
          </SafeAreaView>
        )}
      />
    </SafeAreaView>
  );
}
