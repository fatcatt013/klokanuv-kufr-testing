import * as React from 'react';
import { Image, SafeAreaView } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Notes } from '../components/Notes';
import { Header } from '../components/Header';
import CompletedTasksList from './CompletedTasksList';
import { FAB, Portal } from 'react-native-paper';

function Statistics() {
  return (
    <SafeAreaView>
      <Header>Statistika třídy</Header>
      <Image
        source={require('../../assets/pavouk.png')}
        style={{ width: 300, height: 300 }}
      />
    </SafeAreaView>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function ChildDetail() {
  return <>
    <Tab.Navigator shifting={true} sceneAnimationEnabled={false}>
      <Tab.Screen name="Přehled" component={Statistics} />
      <Tab.Screen name="Hodnocení" component={CompletedTasksList} />
      <Tab.Screen name="Poznámky" component={Notes} />
    </Tab.Navigator>
    <Portal>
      <FAB
        icon="plus"
        style={{
          position: 'absolute',
          bottom: 100,
          right: 16,
        }}
      />
    </Portal>
  </>;
}
