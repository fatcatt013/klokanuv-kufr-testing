import * as React from 'react';
import {
  FlatList, SafeAreaView, StyleSheet, Image, View,
} from 'react-native';
import { Text } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Button from '../components/Button';
import { theme } from '../theme';
import RecentActivityCard from '../components/RecentActivityCard';
import { MockDataClassDetailChildren, MockDataRecentActivityCard } from '../mockDatas';

const styles = StyleSheet.create({
  child: {
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

type ChildProps = {
  name: string
};

type ChildrenProps = {
  data: [{ id: string, name: string }]
};

const Child = (props: ChildProps) => (
  <SafeAreaView style={{ flex: 1, margin: 10 }}>
    <Button mode='contained' style={[styles.child, styles.blueChild]}>{props.name}</Button>
  </SafeAreaView>
);

function Children(props: ChildrenProps) {
  const renderItem = ({ item }) => (
      <Child name={item.name} />
  );

  return (
      <SafeAreaView style={[styles.center]}>
        <Text style={{ fontSize: 30 }}>Seznam dětí</Text>
          <FlatList
              data={props.data}
              renderItem={renderItem}
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

function Notes() {
  return (
    <View>

      <RecentActivityCard props={MockDataRecentActivityCard}/>
    </View>
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
        initialParams={MockDataClassDetailChildren}
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
