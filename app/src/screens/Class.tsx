import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Notes } from "../components/Notes";
import { FAB, Portal, useTheme } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { ClassOverview } from '../components/ClassOverview';
import { AssessmentList } from '../components/AssessmentList';
import { Background } from '../components/Background';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ClassIDContext } from '../lib/contexts';

type Props = StackScreenProps<RootStackParamList, 'Class'>;
const Tab = createMaterialBottomTabNavigator();

export const ClassScreen = React.memo(function ClassScreen({ navigation, route }: Props) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

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
          component={Notes}
          options={{ tabBarIcon: "note-multiple-outline" }}
        />
      </Tab.Navigator>
    </ClassIDContext.Provider>

    <Portal>
      <FAB.Group
        visible={true}
        open={open}
        icon={open ? 'close' : 'plus'}
        color="white"
        style={{ position: 'absolute', paddingBottom: insets.bottom + 54, paddingRight: insets.right }}
        fabStyle={{ backgroundColor: theme.colors.blue }}
        actions={[
          {
            icon: 'note-plus',
            label: 'Poznámka',
            onPress: () => navigation.push('CreateNote'),
          },
          {
            icon: 'order-bool-ascending-variant',
            label: 'Vyhodnocení',
            onPress: () => navigation.push('CreateAssessment'),
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  </Background>;
})
