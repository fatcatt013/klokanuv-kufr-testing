import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import Button from '../components/Button';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { theme } from '../theme';

const styles = StyleSheet.create({
  child: {
    margin: 10,
  },
  redChild: {
    margin: 10,
    backgroundColor: theme.colors.red,
  },
  blueChild: {
    margin: 10,
    backgroundColor: theme.colors.blue,
  },
});

function Children() {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
      <Button mode='contained' style={styles.redChild}>Pepa</Button>
      <Button mode='outlined' style={styles.child}>Jarek</Button>
      <Button mode='contained' style={styles.blueChild}>Franta</Button>
      <Button mode='outlined' style={styles.child}>Lukas</Button>
      <Button mode='outlined' style={styles.child}>Betka</Button>
    </View>
  );
}

function Statistics() {
  return (
    <Text>Statistika třídy</Text>
  );
}

function Notes() {
  return (
    <Text>Poznámky</Text>
  );
}

export default function ClassDetail() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Detail třídy"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.orange,
        // tabBarLabelStyle: { fontSize: 12 },
        // tabBarStyle: { backgroundColor: 'powderblue' },
      }}
    >
      <Tab.Screen
        name="Děti"
        component={Children}
        options={{ tabBarLabel: 'Děti' }}
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
    </Tab.Navigator >
  );
}
