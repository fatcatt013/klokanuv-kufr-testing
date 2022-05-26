import React from 'react';
import AppLoading from 'expo-app-loading';
import { useTheme } from 'react-native-paper';
import { useAuth } from './use-auth';
import { RootStack } from './lib/navigation';
import { LoginScreen } from './screens/Login';
import { RegisterScreen } from './screens/Register';
import { ForgotPasswordScreen } from './screens/ForgotPassword';
import { ClassListScreen } from './screens/ClassList';
import { ChildScreen } from './screens/Child';
import { ClassScreen } from './screens/Class';
import { ChildHeader } from './components/ChildHeader';
import { ClassHeader } from './components/ClassHeader';
import { ClassTaskScreen } from './screens/ClassTask';
import { ClassSubcategoryScreen } from './screens/ClassSubcategory';
import { ClassCategoryScreen } from './screens/ClassCategory';
import { ChildTaskScreen } from './screens/ChildTask';
import { ChildSubcategoryScreen } from './screens/ChildSubcategory';
import { ChildCategoryScreen } from './screens/ChildCategory';
import { ProfileScreen } from './screens/Profile';
import { CreateAssessmentScreen } from './screens/CreateAssessment';
import { AssessmentScreen } from './screens/Assessment';
import { AboutScreen } from './screens/About';
import { HeaderMenu } from './components/HeaderMenu';
import { useCategory, useSubcategory } from './use-core-data';

export function App() {
  const { initializing, authenticated } = useAuth();
  const theme = useTheme();

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
    <RootStack.Navigator initialRouteName="ClassList">
      <RootStack.Group screenOptions={({ navigation }) => ({
        animationEnabled: true,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#fff',
        headerRight: (props) => <HeaderMenu navigation={navigation} {...props} />
      })}>
        <RootStack.Screen
          name="ClassList"
          component={ClassListScreen}
          options={{ title: 'Výběr třídy' }}
        />
        <RootStack.Screen
          name="Class"
          component={ClassScreen}
          options={({ route, navigation }) => ({
            headerTitle: (props) => <ClassHeader
              selected={route.params.classId}
              selectClass={classId => navigation.setParams({ classId })}
              {...props}
            />
          })}
        />

        <RootStack.Screen
          name="Child"
          component={ChildScreen}
          options={({ route }) => ({
            headerTitle: (props) => <ChildHeader childId={route.params.childId} {...props} />
          })}
        />

        <RootStack.Screen
          name="ClassCategory"
          component={ClassCategoryScreen}
          options={({ route }) => ({ headerTitle: useCategory(route.params.categoryId)?.label })}
        />
        <RootStack.Screen
          name="ClassSubcategory"
          component={ClassSubcategoryScreen}
          options={({ route }) => ({ headerTitle: useSubcategory(route.params.subcategoryId)?.label })}
        />
        <RootStack.Screen
          name="ClassTask"
          component={ClassTaskScreen}
          options={{ title: 'Úkol' }}
        />

        <RootStack.Screen
          name="ChildCategory"
          component={ChildCategoryScreen}
          options={({ route }) => ({ headerTitle: useCategory(route.params.categoryId)?.label })}
        />
        <RootStack.Screen
          name="ChildSubcategory"
          component={ChildSubcategoryScreen}
          options={({ route }) => ({ headerTitle: useSubcategory(route.params.subcategoryId)?.label })}
        />
        <RootStack.Screen
          name="ChildTask"
          component={ChildTaskScreen}
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
          name="About"
          component={AboutScreen}
          options={{ title: 'O aplikaci' }}
        />

        <RootStack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profil' }}
        />
      </RootStack.Group>
    </RootStack.Navigator>
  );
}
