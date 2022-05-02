import * as React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Button } from '../components/Button';
import { theme } from '../theme';
import { Notes } from "../components/Notes";
import { StackNavigationProp } from '@react-navigation/stack';
import { Header } from '../components/Header';

const styles = StyleSheet.create({
  task: {
    margin: 10,
    borderRadius: 10,
  },
  blueChild: {
    backgroundColor: theme.colors.light_blue,
  },
  spiderGraph: {
    width: 300,
    height: 300,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type ChildrenProps = {
  navigation: StackNavigationProp<{ Child: {}; HomeScreen: {}; }>;
};

export const MockDataClassDetailChildren = [
  { id: 1, name: 'Pepa' },
  { id: 2, name: 'Franta' },
  { id: 3, name: 'Monika' },
  { id: 4, name: 'Marie' },
  { id: 5, name: 'Honza' },
  { id: 6, name: 'Janka' },
  { id: 7, name: 'Petr' },
];

function Children({ navigation }: ChildrenProps) {
  const children = MockDataClassDetailChildren;
  return (
    <SafeAreaView style={styles.center}>
      <Header>Seznam dětí</Header>
      <FlatList
        renderItem={({ item }) => (
          <SafeAreaView style={{ flex: 1, margin: 10 }}>
            <Button mode='contained' style={[styles.task, styles.blueChild]}>
              {item.name}
            </Button>
          </SafeAreaView>
        )}
        data={children}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        style={{ alignSelf: 'center', minWidth: 300 }}
      />
    </SafeAreaView>
  );
}

function Statistics() {
  return (
    <SafeAreaView style={[styles.center]}>
      <Header>Statistika třídy</Header>
      <Image
        source={require('../../assets/pavouk.png')}
        style={styles.spiderGraph}
      />
    </SafeAreaView>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function ClassDetail() {
  return (
    <Tab.Navigator shifting={true} sceneAnimationEnabled={false}>
      <Tab.Screen name="Přehled" component={Statistics} />
      <Tab.Screen name="Úkoly" component={Notes} />
      <Tab.Screen name="Děti" component={Children} />
    </Tab.Navigator>
  );
}
