import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CompletedTasksList from './screens/CompletedTasksList';
import CompleteTask from './screens/CompleteTask';
import ClassDetail from './screens/ClassDetail';
import AvailableTasksList from './screens/AvailableTasksList';
import DrawerContent from './components/DrawerContent';
import { Button, View } from 'react-native';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName={'Detail třídy'}>
        <Drawer.Screen name="Detail třídy" component={ClassDetail} />
        <Drawer.Screen name="Dostupné úkoly" component={AvailableTasksList} />
        <Drawer.Screen name="Vyplnit úkol" component={CompleteTask} />
        <Drawer.Screen name="Dokončené úkoly" component={CompletedTasksList} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
//export {default} from './storybook';
