import React from 'react';
import { useAuth } from './use-auth';
import { RootStack } from './lib/navigation';
import { LoginScreen } from './screens/Login';
import { RegisterScreen } from './screens/Register';
import { ForgotPasswordScreen } from './screens/ForgotPassword';
import { ClassListScreen } from './screens/ClassList';
import { CategoryListScreen } from './screens/CategoryList';
import { ChildScreen } from './screens/Child';
import { ClassScreen } from "./screens/Class";
import { ChildHeader } from './components/ChildHeader';
import { ClassHeader } from './components/ClassHeader';
import { TaskScreen } from './screens/Task';
import { SubcategoryScreen } from './screens/Subcategory';
import { ProfileScreen } from './screens/Profile';
import { CreateAssessmentScreen } from './screens/CreateAssessment';
import { AssessmentScreen } from './screens/Assessment';
import AppLoading from 'expo-app-loading';
import { CategoryScreen } from './screens/Category';
import { AboutScreen } from './screens/About';
import { CategoryHeader } from './components/CategoryHeader';
import { SubcategoryHeader } from './components/SubcategoryHeader';
import { HeaderMenu } from './components/HeaderMenu';
import { useTheme } from 'react-native-paper';
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
          name="CategoryList"
          component={CategoryListScreen}
          options={{ title: 'Kategorie' }}
        />
        <RootStack.Screen
          name="Category"
          component={CategoryScreen}
          options={({ route }) => {
            const category = useCategory(route.params.categoryId);
            return { headerTitle: category?.label };
          }}
        />
        <RootStack.Screen
          name="Subcategory"
          component={SubcategoryScreen}
          options={({ route }) => {
            const subcategory = useSubcategory(route.params.subcategoryId);
            return { headerTitle: subcategory?.label };
          }}
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
