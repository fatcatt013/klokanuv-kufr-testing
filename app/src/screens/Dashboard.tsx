import React, { memo } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CompletedTasksList from './CompletedTasksList';
import CompleteTask from './CompleteTask';
import ClassDetail from './ClassDetail';
import AvailableTasksList from './AvailableTasksList';

import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { NavigationProp } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const Dashboard = ({ navigation }: { navigation: NavigationProp<{}> }) => (
  <Drawer.Navigator initialRouteName={'Detail třídy'}>
    <Drawer.Screen name="Detail třídy" component={ClassDetail} />
    <Drawer.Screen name="Dostupné úkoly" component={AvailableTasksList} />
    <Drawer.Screen name="Vyplnit úkol" component={CompleteTask} />
    <Drawer.Screen name="Dokončené úkoly" component={CompletedTasksList} />
  </Drawer.Navigator>
);

/* <Background>
    <Logo />
    <Header>Let’s start</Header>
    <Paragraph>
    Your amazing app starts here. Open you favourite code editor and start
    editing this project.
    </Paragraph>
    <Button mode="outlined" onPress={() => navigation.navigate('HomeScreen')}>
    Logout
    </Button>
    </Background>
    ); */

export default memo(Dashboard);
