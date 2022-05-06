import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Notes } from '../components/Notes';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { ChildOverview } from '../components/ChildOverview';
import { AssessmentList } from '../components/AssessmentList';
import { Background } from '../components/Background';
import { ChildIDContext } from '../lib/contexts';

type Props = StackScreenProps<RootStackParamList, 'Child'>;
const Tab = createMaterialBottomTabNavigator();

export const ChildScreen = React.memo(function ChildScreen({ route }: Props) {
  return <Background>
    <ChildIDContext.Provider value={route.params.childId}>
      <Tab.Navigator sceneAnimationEnabled={false}>
        <Tab.Screen
          name="Přehled"
          component={ChildOverview}
          options={{ tabBarIcon: "account" }}
        />
        <Tab.Screen
          name="Hodnocení"
          component={AssessmentList}
          options={{ tabBarIcon: "order-bool-descending-variant" }}
        />
        <Tab.Screen
          name="Poznámky"
          component={Notes}
          options={{ tabBarIcon: "note-multiple-outline" }}
        />
      </Tab.Navigator>
    </ChildIDContext.Provider>
  </Background>;
});
