import React from 'react';
import { useAuth } from './use-auth';
import { RootStack } from './lib/navigation';

import { LoginScreen } from './screens/Login';
import { RegisterScreen } from './screens/Register';
import { ForgotPasswordScreen } from './screens/ForgotPassword';
import { ClassSelectScreen } from './screens/ClassSelect';
import { ChildScreen } from './screens/Child';
import { ClassScreen } from "./screens/Class";
import { ChildSelect } from './components/ChildSelect';
import { Header } from './components/Header';
import { GroupSelect } from './components/ClassSelect';
import { TaskScreen } from './screens/TaskScreen';
import { TaskListScreen } from './screens/TaskListScreen';
import { ProfileScreen } from './screens/Profile';
import { CreateAssessmentScreen } from './screens/CreateAssessment';
import { AssessmentScreen } from './screens/Assessment';
import { CreateNoteScreen } from './screens/CreateNoteScreen';
import AppLoading from 'expo-app-loading';

export function App() {
  const { initializing, authenticated } = useAuth();

  if (initializing) {
    return <AppLoading />;
  }

  if (!authenticated) {
    return (
      <RootStack.Navigator initialRouteName="Login">
        <RootStack.Group screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Login" component={LoginScreen} />
          <RootStack.Screen name="Register" component={RegisterScreen} />
          <RootStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </RootStack.Group>
      </RootStack.Navigator>
    );
  }

  return (
    <RootStack.Navigator initialRouteName="ClassSelect">
      <RootStack.Group screenOptions={{
        animationEnabled: true,
        header: (props) => <Header {...props} />,
      }}>
        <RootStack.Screen
          name="ClassSelect"
          component={ClassSelectScreen}
          options={{ title: 'Výběr třídy' }}
        />
        <RootStack.Screen
          name="Class"
          component={ClassScreen}
          options={({ route, navigation }) => ({
            headerTitle: (props) => <GroupSelect
              selected={route.params.classId}
              selectGroup={classId => navigation.setParams({ classId })}
              {...props}
            />
          })}
        />

        <RootStack.Screen
          name="Child"
          component={ChildScreen}
          options={({ route, navigation }) => ({
            headerTitle: (props) => <ChildSelect
              selected={route.params.childId}
              selectChild={childId => navigation.setParams({ childId })}
              {...props}
            />
          })}
        />

        <RootStack.Screen
          name="TaskList"
          component={TaskListScreen}
          options={{ title: 'Úkoly' }}
        />
        <RootStack.Screen
          name="Task"
          component={TaskScreen}
          options={{ title: 'Úkol' }}
        />

        <RootStack.Screen
          name="CreateAssessment"
          component={CreateAssessmentScreen}
          options={{ title: 'Hodnotit dítě' }}
        />
        <RootStack.Screen
          name="Assessment"
          component={AssessmentScreen}
          options={{ title: 'Hodnocení' }}
        />

        <RootStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profil' }}
        />
      </RootStack.Group>

      <RootStack.Group screenOptions={{
        presentation: 'transparentModal',
        headerShown: false,
      }}>
        <RootStack.Screen name="CreateNote" component={CreateNoteScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
