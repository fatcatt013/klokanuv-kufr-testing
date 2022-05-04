import React from 'react';
import { useAuth } from './use-auth';
import { RootStack } from './lib/navigation';

import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import ClassSelect from './screens/ClassSelect';
import ChildDetail from './screens/Child';
import ClassDetail from "./screens/Class";
import CompleteTask from './screens/CompleteTask';
import { AssessmentList } from './screens/AssessmentList';
import { useTheme } from 'react-native-paper';
import { ChildSelect } from './components/ChildSelect';
import { Header } from './components/Header';
import { GroupSelect } from './components/ClassSelect';

export function App() {
  const theme = useTheme();
  const { isSignedIn } = useAuth();

  return (
    <RootStack.Navigator initialRouteName={isSignedIn ? "Login" : "ClassSelect"}>
      {isSignedIn ? (
        <RootStack.Group screenOptions={{
          animationEnabled: true,
          header: (props) => <Header {...props} />,
          headerStyle: { backgroundColor: theme.colors.primary },
          headerTintColor: '#fff',
        }}>
          <RootStack.Screen
            name="ClassSelect"
            component={ClassSelect}
            options={{ title: 'Výběr třídy' }}
          />
          <RootStack.Screen
            name="Class"
            component={ClassDetail}
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
            component={ChildDetail}
            options={({ route, navigation }) => ({
              headerTitle: (props) => <ChildSelect
                selected={route.params.childId}
                selectChild={childId => navigation.setParams({ childId })}
                {...props}
              />
            })}
          />
          {/* <RootStack.Screen
              name="CategoryList"
              component={CategoryList}
              options={{ title: 'Kategorie úkolů' }}
              />
              <RootStack.Screen
              name="TaskList"
              component={TaskList}
              options={{ title: 'Úkoly' }}
              /> */}
        </RootStack.Group>
      ) : (
        <RootStack.Group screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Login" component={Login} />
          <RootStack.Screen name="Register" component={Register} />
          <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
        </RootStack.Group>
      )}
    </RootStack.Navigator>
  );
}
