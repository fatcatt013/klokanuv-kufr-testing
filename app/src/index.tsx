import React from 'react';
import { useAuth } from './use-auth';
import { RootStack } from './lib/navigation';

import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ClassSelectScreen from './screens/ClassSelectScreen';
import ChildDetail from './screens/ChildDetail';
import ClassDetail from "./screens/ClassDetail";
import CompleteTask from './screens/CompleteTask';
import AvailableTasksList from './screens/AvailableTasksList';
import { useTheme } from 'react-native-paper';

export function App() {
  const theme = useTheme();
  const { isSignedIn } = useAuth();

  return (
    <RootStack.Navigator
      initialRouteName={isSignedIn ? "Login" : "ClassSelect"}
      screenOptions={{
        headerStyle: { backgroundColor: theme.colors.primary },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <RootStack.Screen
        name="Login"
        options={{ title: 'Přihlášení', headerShown: false }}
        component={LoginScreen}
        navigationKey={isSignedIn ? 'user' : 'guest'}
      />
      <RootStack.Screen
        name="Register"
        options={{ title: 'Registrace', headerShown: false }}
        component={RegisterScreen}
        navigationKey={isSignedIn ? 'user' : 'guest'}
      />
      <RootStack.Screen
        name="ForgotPassword"
        options={{ title: 'Zapomenuté heslo', headerShown: false }}
        component={ForgotPasswordScreen}
        navigationKey={isSignedIn ? 'user' : 'guest'}
      />
      <RootStack.Screen
        name="ClassSelect"
        options={{ title: 'Výběr třídy' }}
        component={ClassSelectScreen}
        navigationKey={isSignedIn ? 'user' : 'guest'}
      />
      <RootStack.Screen
        name="Class"
        options={{ title: 'Přehled třídy' }}
        component={ClassDetail}
        navigationKey={isSignedIn ? 'user' : 'guest'}
      />
      <RootStack.Screen
        name="Child"
        options={{ title: 'Dítě' }}
        component={ChildDetail}
        navigationKey={isSignedIn ? 'user' : 'guest'}
      />
      <RootStack.Screen
        name="Categories"
        options={{ title: 'Kategorie úkolů' }}
        component={AvailableTasksList}
        navigationKey={isSignedIn ? 'user' : 'guest'}
      />
      <RootStack.Screen
        name="Tasks"
        options={{ title: 'Úkoly' }}
        component={CompleteTask}
        navigationKey={isSignedIn ? 'user' : 'guest'}
      />
    </RootStack.Navigator>
  );
}
