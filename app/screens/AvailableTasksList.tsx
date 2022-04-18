import * as React from 'react';
import { Button, Card, Text } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
// 3 urovne/kategorie tasku

// NOT DONE YET ... TODO ... BROKEN

// const Cat2Stack = createStackNavigator();
// const Cat1Stack = createStackNavigator();
// const TasksStack = createStackNavigator();

// function Task() {
//   return (
//       <Card>
//           <Button mode={'outlined'}>Ukol dane kategorie</Button>
//       </Card>
//
//   );
// }
// function Tasks() {
//   return (
//         <TasksStack.Navigator>
//             <TasksStack.Screen name={'Ukol 1'} component={Task}/>
//             <TasksStack.Screen name={'Ukol 2'} component={Task}/>
//             <TasksStack.Screen name={'Ukol 3'} component={Task}/>
//         </TasksStack.Navigator>
//
//   );
// }
// function Category2() {
//   return (
//         <Cat2Stack.Navigator>
//             <Cat2Stack.Screen name={'Kategorie úroveň 2'} component={Tasks}/>
//         </Cat2Stack.Navigator>
//
//   );
// }
//
// function Category1() {
//   return (
//         <Cat1Stack.Navigator>
//             <Cat1Stack.Screen name={'Kategorie úroveň 1'} component={Category2}/>
//         </Cat1Stack.Navigator>
//
//   );
// }

function Placeholder() {
  return (
      <Text>Not implemented yet.</Text>);
}

export default function AvailableTasksList() {
  const Stack = createStackNavigator();
  return (
      <Placeholder/>
      // <View>
      // <Stack.Navigator>
      //     <Stack.Screen name="Úkoly" component={Placeholder} />
      // </Stack.Navigator>
      // </View>
  );
}
