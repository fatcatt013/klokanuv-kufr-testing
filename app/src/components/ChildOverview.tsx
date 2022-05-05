import React from 'react';
import { Image, SafeAreaView } from 'react-native';
import { ChildIDContext } from '../lib/contexts';

export function ChildOverview() {
  const childId = React.useContext(ChildIDContext);
  return (
    <SafeAreaView>
      <Image
        source={require('../../assets/pavouk.png')}
        style={{ width: 300, height: 300, alignSelf: 'center', margin: 5 }}
      />
    </SafeAreaView>
  );
}
