import * as React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Button from '../components/Button';
import { theme } from '../theme';
import { MockDataClassDetailChildren } from '../mockDatas';
import Notes from "../components/Notes";
import { NavigationProp } from '@react-navigation/native';

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
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.secondary,
  },
});

type ChildrenProps = {
  navigation: NavigationProp<{ Child: {}; HomeScreen: {}; }>;
};

// <Stack.Screen name="TestWorker" component={ChildDetail} />

function Children({ navigation }: ChildrenProps) {
  const children = MockDataClassDetailChildren;
  return (
    <SafeAreaView style={[styles.center]}>
      <Text style={{ fontSize: 30 }}>Seznam dětí</Text>
      <FlatList
        renderItem={({ item }) => (
          <SafeAreaView style={{ flex: 1, margin: 10 }}>
            <Button
              mode='contained' style={[styles.task, styles.blueChild]}
              onPress={() => }
            >
              {item.name}
            </Button>
          </SafeAreaView>
        )}
        data={children}
        keyExtractor={(item) => item.id}
        numColumns={2}
        style={{ alignSelf: 'center', minWidth: 300 }}
      />
    </SafeAreaView>
  );
}

function Statistics() {
  return (
    <SafeAreaView style={[styles.center]}>
      <Text style={{ fontSize: 30 }}>Statistika třídy</Text>
      <Image
        source={require('../../assets/pavouk.png')}
        style={styles.spiderGraph}
      />
    </SafeAreaView>

  );
}

const Tab = createMaterialTopTabNavigator();

export default function ClassDetail() {
  return (
    <Tab.Navigator
      initialRouteName="Detail třídy"
      screenOptions={{ tabBarActiveTintColor: theme.colors.orange }}
    >
      <Tab.Screen name="Děti" component={Children} />
      <Tab.Screen name="Statistiky" component={Statistics} />
      <Tab.Screen name="Poznámky" component={Notes} />
    </Tab.Navigator>
  );
}
