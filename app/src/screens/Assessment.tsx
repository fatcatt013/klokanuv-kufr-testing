import React from 'react';
import { View } from 'react-native';
import { Button, Checkbox, Text } from 'react-native-paper';
import { ChildPicker } from '../components/ChildPicker';

export function AssessmentScreen() {
  return (
    <View>
      <Text>Název úkolu</Text>
      <Text>Třída</Text>
      <Checkbox status={'unchecked'}>Anicka</Checkbox>
      <Checkbox status={'unchecked'}>Petr</Checkbox>
      <Checkbox status={'unchecked'}>Tomas</Checkbox>
      <Checkbox status={'unchecked'}>Jana</Checkbox>
      <ChildPicker classId={1} selectChildren={() => { }} />
      <Button> Vyplnit</Button>
    </View>
  );
}
