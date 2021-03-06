import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Portal, useTheme } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { ClassNotes } from '../components/class/ClassNotes';
import { RootStackParamList } from '../lib/navigation';
import { ChildList } from '../components/child/ChildList';
import { Background } from '../components/Background';
import { ClassIDContext } from '../lib/contexts';
import { ClassCategorySelect } from '../components/class/ClassCategorySelect';
import { ClassOverview } from '../components/class/ClassOverview';
import { MultiFAB } from '../components/MultiFAB';
import { useIsFocused } from '@react-navigation/native';

type Props = StackScreenProps<RootStackParamList, 'Class'>;
const Tab = createMaterialBottomTabNavigator();

export const ClassScreen = React.memo(function ClassScreen({ route }: Props) {
  const theme = useTheme();
  const isFocused = useIsFocused();

  return <Background>
    <ClassIDContext.Provider value={route.params.classId}>
      <Tab.Navigator
        sceneAnimationEnabled={false}
        barStyle={{ backgroundColor: theme.colors.orange }}
        activeColor="white"
        inactiveColor="rgba(255, 255, 255, 0.5)"
      >
        <Tab.Screen
          name="Seznam dětí"
          component={ChildList}
          options={{ tabBarIcon: 'account-multiple' }}
        />
        <Tab.Screen
          name="Klokanův kufr"
          component={ClassCategorySelect}
          options={{ tabBarIcon: 'briefcase-outline' }}
        />
        <Tab.Screen
          name="Statistiky"
          component={ClassOverview}
          options={{ tabBarIcon: 'order-bool-descending-variant' }}
        />
        <Tab.Screen
          name="ClassNotes"
          component={ClassNotes}
          options={{ title: 'Poznámky', tabBarIcon: 'note-multiple-outline' }}
        />
      </Tab.Navigator>
      <Portal><MultiFAB visible={isFocused} tabs /></Portal>
    </ClassIDContext.Provider>
  </Background>;
});
