import React, { memo } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { QueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { NavigationProp } from '@react-navigation/native';
import { View, Text } from 'react-native';
import Button from '../components/Button';
import Background from '../components/Background';

import CompletedTasksList from './CompletedTasksList';
import CompleteTask from './CompleteTask';
import ClassDetail from './ClassDetail';
import AvailableTasksList from './AvailableTasksList';

const Drawer = createDrawerNavigator();

const Dashboard = ({ navigation }: { navigation: NavigationProp<{}> }) => (
  <Boundary>
    <Drawer.Navigator initialRouteName={'Detail třídy'}>
      <Drawer.Screen name="Detail třídy" component={ClassDetail} />
      <Drawer.Screen name="Dostupné úkoly" component={AvailableTasksList} />
      <Drawer.Screen name="Vyplnit úkol" component={CompleteTask} />
      <Drawer.Screen name="Dokončené úkoly" component={CompletedTasksList} />
    </Drawer.Navigator>
  </Boundary>
);

const Boundary: React.FC = ({ children }) => (
  <QueryErrorResetBoundary>
    {({ reset }) => (
      <ErrorBoundary
        onReset={reset}
        fallbackRender={({ resetErrorBoundary }) => (
          <Background>
            <Text>Nastala chyba!</Text>
            <Button mode='contained' onPress={() => resetErrorBoundary()}>Zkusit znovu</Button>
          </Background>
        )}
      >
        {children}
      </ErrorBoundary>
    )}
  </QueryErrorResetBoundary>
);

export default memo(Dashboard);
