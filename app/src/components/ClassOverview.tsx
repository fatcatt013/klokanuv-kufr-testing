import React from 'react';
import { FlatList, Image, SafeAreaView } from 'react-native';
import { Button } from '../components/Button';
import { theme } from '../theme';
import { childrenByGroupState } from '../store';
import { useRecoilValue } from 'recoil';
import { ClassIDContext } from '../lib/contexts';

export function ClassOverview({ navigation }: any) {
  const classId = React.useContext(ClassIDContext);
  const children = useRecoilValue(childrenByGroupState(classId));

  return (
    <SafeAreaView>
      <Image
        source={require('../../assets/pavouk.png')}
        style={{ width: 300, height: 300, alignSelf: 'center', margin: 5 }}
      />
      <FlatList
        style={{ flex: 1 }}
        data={children}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        renderItem={({ item, index }) => (
          <Button
            onPress={() => navigation.push('Child', { childId: item.id })}
            mode='contained'
            style={{
              flex: 1,
              backgroundColor: theme.colors.blue,
              marginHorizontal: 2,
              marginBottom: -5,
              maxWidth: children.length % 2 === 1 && children.length - 1 === index ? '49.25%' : '100%'
            }}
          >{item.name}</Button>
        )}
      />
    </SafeAreaView>
  );
}
