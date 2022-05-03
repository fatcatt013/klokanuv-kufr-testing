import * as React from 'react';
import { FlatList, Image, SafeAreaView } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Button } from '../components/Button';
import { theme } from '../theme';
import { Notes } from "../components/Notes";
import CompletedTasksList from './CompletedTasksList';
import { FAB, Portal } from 'react-native-paper';
import Zrak from '../components/icons/Zrak';

export const MockDataClassDetailChildren = [
  { id: 1, name: 'Pepa' },
  { id: 2, name: 'Franta' },
  { id: 3, name: 'Monika' },
  { id: 4, name: 'Marie' },
  { id: 5, name: 'Honza' },
  { id: 6, name: 'Janka' },
  { id: 7, name: 'Petr' },
];

function Overview() {
  return (
    <SafeAreaView>
      <Image source={require('../../assets/pavouk.png')} style={{ width: 300, height: 300 }} />
      <FlatList
        data={MockDataClassDetailChildren}
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
      <Zrak style={{ width: 75, height: 75 }} />
    </SafeAreaView>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function ClassDetail() {
  return <>
    <Tab.Navigator shifting={true} sceneAnimationEnabled={false}>
      <Tab.Screen name="Přehled" component={Overview} />
      <Tab.Screen name="Úkoly" component={CompletedTasksList} />
      <Tab.Screen name="Poznámky" component={Notes} />
    </Tab.Navigator>
    <Portal>
      <FAB icon="plus" style={{ position: 'absolute', bottom: 100, right: 16 }} />
    </Portal>
  </>;
}
