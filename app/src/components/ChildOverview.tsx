import React from 'react';
import { Image, SafeAreaView } from 'react-native';
import { Headline } from 'react-native-paper';

export function ChildOverview({ childId }: { childId: number; }) {
  return (
    <SafeAreaView>
      <Headline>Statistika dítěte</Headline>
      <Image
        source={require('../../assets/pavouk.png')}
        style={{ width: 300, height: 300 }}
      />
    </SafeAreaView>
  );
}
