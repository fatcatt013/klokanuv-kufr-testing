import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Notes } from '../components/Notes';
import { FAB, Portal } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { ChildOverview } from '../components/ChildOverview';
import { AssessmentList } from './AssessmentList';

type Props = StackScreenProps<RootStackParamList, 'Child'>;
const Tab = createMaterialBottomTabNavigator();

export default function ChildScreen({ route }: Props) {
  const initialParams = { classId: route.params.childId };

  return <>
    <Tab.Navigator shifting={true} sceneAnimationEnabled={false}>
      <Tab.Screen name="Přehled" component={ChildOverview} initialParams={initialParams} />
      <Tab.Screen name="Hodnocení" component={AssessmentList} initialParams={initialParams} />
      <Tab.Screen name="Poznámky" component={Notes} initialParams={initialParams} />
    </Tab.Navigator>
    <Portal>
      <FAB icon="plus" style={{ position: 'absolute', bottom: 100, right: 16 }} />
    </Portal>
  </>;
}
