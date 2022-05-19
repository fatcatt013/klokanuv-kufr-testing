import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { ClassNotes } from "../components/ClassNotes";
import { useTheme } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { ClassOverview } from '../components/ClassOverview';
import { AssessmentList } from '../components/AssessmentList';
import { Background } from '../components/Background';
import { ClassIDContext } from '../lib/contexts';

type Props = StackScreenProps<RootStackParamList, 'Class'>;
const Tab = createMaterialBottomTabNavigator();

export const ClassScreen = React.memo(function ClassScreen({ route }: Props) {
  const theme = useTheme();

  return <Background>
    <ClassIDContext.Provider value={route.params.classId}>
      <Tab.Navigator
        sceneAnimationEnabled={false}
        barStyle={{ backgroundColor: theme.colors.primary }}
        activeColor="white"
        inactiveColor="rgba(255, 255, 255, 0.5)"
      >
        <Tab.Screen
          name="Přehled"
          component={ClassOverview}
          options={{ tabBarIcon: "account-multiple" }}
        />
        <Tab.Screen
          name="Úkoly"
          component={AssessmentList}
          options={{ tabBarIcon: "order-bool-descending-variant" }}
        />
        <Tab.Screen
          name="Poznámky"
          component={ClassNotes}
          options={{ tabBarIcon: "note-multiple-outline" }}
        />
      </Tab.Navigator>
    </ClassIDContext.Provider>

  </Background>;
})
