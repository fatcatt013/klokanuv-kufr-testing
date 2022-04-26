import React, { memo } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationProp } from '@react-navigation/native';

import CompletedTasksList from './CompletedTasksList';
import CompleteTask from './CompleteTask';
import ClassDetail from './ClassDetail';
import AvailableTasksList from './AvailableTasksList';

const Drawer = createDrawerNavigator();

const Dashboard = ({ navigation }: { navigation: NavigationProp<{}> }) => (
  <Drawer.Navigator initialRouteName={'Detail třídy'}>
    <Drawer.Screen name="Detail třídy" component={ClassDetail} />
    <Drawer.Screen name="Dostupné úkoly" component={AvailableTasksList} />
    <Drawer.Screen name="Vyplnit úkol" component={CompleteTask} />
    <Drawer.Screen name="Dokončené úkoly" component={CompletedTasksList} />
  </Drawer.Navigator>
);

export default memo(Dashboard);
