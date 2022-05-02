import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ClassSelectScreen from './screens/ClassSelectScreen';
import ChildDetail from './screens/ChildDetail';
import ClassDetail from "./screens/ClassDetail";
import CompletedTasksList from './screens/CompletedTasksList';
import CompleteTask from './screens/CompleteTask';
import AvailableTasksList from './screens/AvailableTasksList';

const Stack = createStackNavigator();

export function App() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
      <Stack.Screen name="Výběr třídy" component={ClassSelectScreen} />
      <Stack.Screen name="Třída" component={ClassDetail} />
      <Stack.Screen name="Žák" component={ChildDetail} />

      <Stack.Screen name="Dostupné úkoly" component={AvailableTasksList} />
      <Stack.Screen name="Vyplnit úkol" component={CompleteTask} />
      <Stack.Screen name="Dokončené úkoly" component={CompletedTasksList} />
    </Stack.Navigator>
  );
}
