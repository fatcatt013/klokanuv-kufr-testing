import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StackScreenProps } from '@react-navigation/stack';
import { Portal, useTheme } from 'react-native-paper';
import { ChildNotes } from '../components/child/ChildNotes';
import { RootStackParamList } from '../lib/navigation';
import { ChildOverview } from '../components/child/ChildOverview';
import { Background } from '../components/Background';
import { ChildIDContext } from '../lib/contexts';
import { ChildCategorySelect } from '../components/child/ChildCategorySelect';
import { MultiFAB } from '../components/MultiFAB';
import { useIsFocused } from '@react-navigation/native';

type Props = StackScreenProps<RootStackParamList, 'Child'>;
const Tab = createMaterialBottomTabNavigator();

export const ChildScreen = React.memo(function ChildScreen({ route }: Props) {
  const theme = useTheme();
  const isFocused = useIsFocused();

  return <Background>
    <ChildIDContext.Provider value={route.params.childId}>
      <Tab.Navigator
        sceneAnimationEnabled={false}
        barStyle={{ backgroundColor: theme.colors.orange }}
        activeColor="white"
        inactiveColor="rgba(255, 255, 255, 0.5)"
      >
        <Tab.Screen
          name="Profil"
          component={ChildOverview}
          options={{ tabBarIcon: 'account' }}
        />
        <Tab.Screen
          name="Klokanův kufr"
          component={ChildCategorySelect}
          options={{ tabBarIcon: 'briefcase-outline' }}
        />
        <Tab.Screen
          name="ChildNotes"
          component={ChildNotes}
          options={{ title: 'Poznámky', tabBarIcon: 'note-multiple-outline' }}
        />
      </Tab.Navigator>
      <Portal><MultiFAB visible={isFocused} tabs /></Portal>
    </ChildIDContext.Provider>
  </Background>;
});
