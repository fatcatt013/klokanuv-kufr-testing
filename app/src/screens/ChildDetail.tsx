import * as React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Button } from '../components/Button';
import { Notes } from '../components/Notes';
import { theme } from '../theme';
import { Header } from '../components/Header';

const styles = StyleSheet.create({
  task: {
    margin: 10,
    borderRadius: 10,
    fontSize: 30,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.secondary,
  },
});

const Task = ({ name }: { name: string; }) => (
  <SafeAreaView style={{ flex: 1, margin: 10 }}>
    <Button mode='contained' style={styles.task} labelStyle={{ fontSize: 16 }} icon='briefcase'>{name}</Button>
  </SafeAreaView>
);

export const MockDataChildDetailTasks = [
  { id: 1, name: 'Barvy' },
  { id: 2, name: 'Šepot' },
  { id: 3, name: 'Rýmovačky' },
  { id: 4, name: 'Ptáci' },
  { id: 5, name: 'Tkaničky' },
  { id: 6, name: 'Knoflíky' },
  { id: 7, name: 'Pozdravy' },
];

function Tasks() {
  const renderItem = ({ item }) => <Task name={item.name} />;

  return (
    <SafeAreaView style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
      <Header>Seznam kufrů?</Header>
      <FlatList
        data={MockDataChildDetailTasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={{ minWidth: 300, marginRight: 20 }}
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
        style={{ width: 300, height: 300 }}
      />
    </SafeAreaView>
  );
}

const Tab = createMaterialBottomTabNavigator();

export default function ChildDetail() {
  return (
    <Tab.Navigator shifting={true} sceneAnimationEnabled={false}>
      <Tab.Screen name="Přehled" component={Tasks} />
      <Tab.Screen name="Statistiky" component={Statistics} />
      <Tab.Screen name="Poznámky" component={Notes} />
    </Tab.Navigator>
  );
}
