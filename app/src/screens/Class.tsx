import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Notes } from "../components/Notes";
import { FAB, Portal } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { ClassOverview } from '../components/ClassOverview';
import { AssessmentList } from './AssessmentList';

type Props = StackScreenProps<RootStackParamList, 'Class'>;
const Tab = createMaterialBottomTabNavigator();

export default function ClassDetail({ route }: Props) {
  const initialParams = { classId: route.params.classId };
  return <>
    <Tab.Navigator shifting={true} sceneAnimationEnabled={false}>
      <Tab.Screen name="Přehled" component={ClassOverview} initialParams={initialParams} />
      <Tab.Screen name="Úkoly" component={AssessmentList} initialParams={initialParams} />
      <Tab.Screen name="Poznámky" component={Notes} initialParams={initialParams} />
    </Tab.Navigator>
    <Portal>
      <FAB icon="plus" style={{ position: 'absolute', bottom: 100, right: 16 }} />
    </Portal>
  </>;
}
