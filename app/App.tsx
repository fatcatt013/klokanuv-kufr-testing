import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CompletedTasksList from './screens/CompletedTasksList';
import CompleteTask from './screens/CompleteTask';
import ClassDetail from './screens/ClassDetail';
import AvailableTasksList from './screens/AvailableTasksList';
import DrawerContent from './components/DrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
        <NavigationContainer>
            <Drawer.Navigator
                useLegacyImplementation
                drawerContent={(props) => <DrawerContent
                    {...props} />}
            >
                <Drawer.Screen name="Detail třídy" component={ClassDetail}/>
                <Drawer.Screen name="Dostupné úkoly" component={AvailableTasksList}/>
                <Drawer.Screen name="Vyplnit úkol" component={CompleteTask}/>
                <Drawer.Screen name="Dokončené úkoly" component={CompletedTasksList}/>
            </Drawer.Navigator>
        </NavigationContainer>
  );
}
