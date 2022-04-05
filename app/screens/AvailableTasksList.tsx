import { Button, Card } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
// 3 urovne/kategorie tasku

// NOT DONE YET ... TODO
const Stack = createStackNavigator();

function Task() {
  return (
      <Card>
          <Button mode={'outlined'}>Ukol dane kategorie</Button>
      </Card>

  );
}
function Tasks() {
  return (
        <Stack.Navigator>
            <Stack.Screen name={'Ukol 1'} component={Task}/>
            <Stack.Screen name={'Ukol 2'} component={Task}/>
            <Stack.Screen name={'Ukol 3'} component={Task}/>
        </Stack.Navigator>

  );
}
function Category2() {
  return (
        <Stack.Navigator>
            <Stack.Screen name={'Kategorie úroveň 2'} component={Tasks}/>
        </Stack.Navigator>

  );
}

function Category1() {
  return (
        <Stack.Navigator>
            <Stack.Screen name={'Kategorie úroveň 1'} component={Category2}/>
        </Stack.Navigator>

  );
}

export default function AvailableTasksList() {
  return (
      <Stack.Navigator>
          <Stack.Screen name="Úkoly" component={Category1} />
      </Stack.Navigator>
  );
}
