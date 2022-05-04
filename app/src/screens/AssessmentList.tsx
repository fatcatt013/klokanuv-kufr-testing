import React from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Card, Headline, Text } from 'react-native-paper';

const styles = StyleSheet.create({
  task: {
    margin: 10,
    borderRadius: 10,
    fontSize: 30,
  },
  moreInfo: {
    alignSelf: 'flex-end',
  },
});

const Assessments = [
  { name: "Přiřadí barvu", date: "16. 1. 2022", teacher: 'Anežka Dobrá' },
  { name: "Odliší jiný obrázek v řadě", date: "11. 1. 2022", teacher: 'Marie Vystrčilová' },
  { name: "Určí, zda se dvě slova rýmují", date: "20. 12. 2021", teacher: 'Anežka Dobrá' },
]

export function AssessmentList() {
  return (
    <FlatList
      data={Assessments}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => (
        <Card style={{ margin: 5, padding: 10 }}>
          <Headline>{item.name}</Headline>
          <Text>Hodnotil(a): {item.teacher}</Text>
          <Text>{item.date}</Text>
        </Card>
      )}
    />
  );
}

export const MockDataChildDetailTasks = [
  { id: 1, name: 'Barvy' },
  { id: 2, name: 'Šepot' },
  { id: 3, name: 'Rýmovačky' },
  { id: 4, name: 'Ptáci' },
  { id: 5, name: 'Tkaničky' },
  { id: 6, name: 'Knoflíky' },
  { id: 7, name: 'Pozdravy' },
];

const Task = ({ name }: { name: string; }) => (
  <SafeAreaView style={{ flex: 1, margin: 10 }}>
    <Button mode='contained' style={styles.task} labelStyle={{ fontSize: 16 }} icon='briefcase'>{name}</Button>
  </SafeAreaView>
);

export function Tasks() {
  return (
    <SafeAreaView style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
      <Headline>Seznam kufrů?</Headline>
      <FlatList
        data={MockDataChildDetailTasks}
        renderItem={({ item }) => <Task name={item.name} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        style={{ minWidth: 300, marginRight: 20 }}
      />
    </SafeAreaView>
  );
}
