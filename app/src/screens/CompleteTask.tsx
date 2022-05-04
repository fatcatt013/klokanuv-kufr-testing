import React from 'react';
import { View } from 'react-native';
import { Button, Checkbox, Text } from 'react-native-paper';
import { PaperSelect } from 'react-native-paper-select';

export default function CreateAssessment() {
  const colorList = [
    { _id: '1', value: 'BLUE' },
    { _id: '2', value: 'RED' },
    { _id: '3', value: 'GREEN' },
    { _id: '4', value: 'YELLOW' },
    { _id: '5', value: 'BROWN' },
    { _id: '6', value: 'BLACK' },
    { _id: '7', value: 'WHITE' },
    { _id: '8', value: 'CYAN' },
  ];
  const [colors, setColors] = React.useState({
    value: '',
    selectedList: [],
    error: '',
  });

  return (
    <View>
      <Text>Název úkolu</Text>
      <Text>Třída</Text>
      <Checkbox status={'unchecked'}>Anicka</Checkbox>
      <Checkbox status={'unchecked'}>Petr</Checkbox>
      <Checkbox status={'unchecked'}>Tomas</Checkbox>
      <Checkbox status={'unchecked'}>Jana</Checkbox>
      <PaperSelect
        label="Select Colors"
        value={colors.value}
        onSelection={(value: any) => {
          setColors({
            ...colors,
            value: value.text,
            selectedList: value.selectedList,
          });
        }}
        arrayList={colorList}
        selectedArrayList={colors.selectedList}
        errorText=""
        multiEnable={true}
        textInputMode="flat"
      />
      <Button>Vyplnit</Button>
    </View>
  );
}
