import * as React from 'react';
import {
  FlatList, Image, SafeAreaView, StyleSheet, View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Button from '../components/Button';
import { theme } from '../theme';
import { MockDataChildDetailTasks } from '../mockDatas';
import Notes from '../components/Notes';

const styles = StyleSheet.create({
  task: {
    margin: 10,
    borderRadius: 10,
    fontSize: 30,
  },
  spiderGraph: {
    width: 300,
    height: 300,
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

type TaskProps = {
  name: string
};

type TasksProps = {
  // childItems: [{ id: string, name: string }?]
  route: {
    params: [{ id: string, name: string }]
  }
};

const Task = (props: TaskProps) => (
  <SafeAreaView style={{ flex: 1, margin: 10 }}>
    <Button mode='contained' style={styles.task} labelStyle={{ fontSize: 16 } } icon='briefcase' >{props.name}</Button>
  </SafeAreaView>
);

function Tasks(props: TasksProps) {
  const renderItem = ({ item }) => (
    <Task name={item.name}/>
  );

  return (
    <SafeAreaView style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
      <Text style={{ fontSize: 30 }}>Seznam kufrů?</Text>
      <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }}>
      <FlatList
        data={Object.values(props.route.params)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={{ minWidth: 300, marginRight: 20 }}
      />
      </View>
    </SafeAreaView>
  );
}

function Statistics() {
  return (
    <SafeAreaView style={[styles.center]}>
      <Text style={{ fontSize: 30 }}>Statistika žáka</Text>
      <Image
        source={require('../../assets/pavouk.png')}
        style={styles.spiderGraph}
      />
    </SafeAreaView>

  );
}

export default function ChildDetail() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Detail žáka"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.orange,
        // tabBarLabelStyle: { fontSize: 12 },
        // tabBarStyle: { backgroundColor: 'powderblue' },
      }}
    >
      <Tab.Screen
        name="Kufry?"
        component={Tasks}
        options={{ tabBarLabel: 'Kufry?' }}
        initialParams={MockDataChildDetailTasks}
      />
      <Tab.Screen
        name="Statistiky"
        component={Statistics}
        options={{ tabBarLabel: 'Statistiky' }}
      />
      <Tab.Screen
        name="Poznámky"
        component={Notes}
        options={{ tabBarLabel: 'Poznámky' }}
      />
    </Tab.Navigator>
  );
}
