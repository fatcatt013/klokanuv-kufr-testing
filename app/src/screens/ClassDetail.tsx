import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const styles = StyleSheet.create({
  flexBoxWrap: {
    flexWrap: 'wrap', flexDirection: 'row',
  },
  child: {
    width: 'calc(50% - 20px)', margin: '10px',
  },
  redChild: {
    width: 'calc(50% - 20px)', margin: '10px', backgroundColor: 'red',
  },
  blueChild: {
    width: 'calc(50% - 20px)', margin: '10px', backgroundColor: 'blue',
  },
});

function Children() {
  return (
      // <div style={styles.flexBoxWrap}>
      //           <Button mode={'contained'} style={styles.redChild}>Pepa</Button>
      //           <Button mode={'outlined'} style={styles.child}>Jarek</Button>
      //           <Button mode={'contained'} style={styles.blueChild}>Franta</Button>
      //           <Button mode={'outlined'} style={styles.child}>Lukas</Button>
      //           <Button mode={'outlined'} style={styles.child}>Betka</Button>
      //   </div>
      <Text>Statistika třídy</Text>
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
            sceneAnimationEnabled={false}
            screenOptions={{
              tabBarActiveTintColor: '#e91e63',
              tabBarLabelStyle: { fontSize: 12 },
              tabBarStyle: { backgroundColor: 'powderblue' },
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
        </Tab.Navigator>
   );
}
