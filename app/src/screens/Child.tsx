import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ChildNotes } from '../components/ChildNotes';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { ChildOverview } from '../components/ChildOverview';
import { ChildAssessmentList } from '../components/ChildAssessmentList';
import { Background } from '../components/Background';
import { ChildIDContext } from '../lib/contexts';
import { useTheme } from 'react-native-paper';

type Props = StackScreenProps<RootStackParamList, 'Child'>;
const Tab = createMaterialBottomTabNavigator();

export const ChildScreen = React.memo(function ChildScreen({ route }: Props) {
  const theme = useTheme();

  return <Background>
    <ChildIDContext.Provider value={route.params.childId}>
      <Tab.Navigator
        sceneAnimationEnabled={false}
        barStyle={{ backgroundColor: theme.colors.blue }}
        activeColor="white"
        inactiveColor="rgba(255, 255, 255, 0.5)"
      >
        <Tab.Screen
          name="Přehled"
          component={ChildOverview}
          options={{ tabBarIcon: "account" }}
        />
        <Tab.Screen
          name="Hodnocení"
          component={ChildAssessmentList}
          options={{ tabBarIcon: "order-bool-descending-variant" }}
        />
        <Tab.Screen
          name="Poznámky"
          component={ChildNotes}
          options={{ tabBarIcon: "note-multiple-outline" }}
        />
      </Tab.Navigator>
    </ChildIDContext.Provider>
  </Background>;
});
