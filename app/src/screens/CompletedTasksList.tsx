import * as React from 'react';
import { FlatList, SafeAreaView, StyleSheet, View } from 'react-native';
import { Button, Card, Headline } from 'react-native-paper';
import { Header } from '../components/Header';

const styles = StyleSheet.create({
  task: {
    margin: 10,
    borderRadius: 10,
    fontSize: 30,
  },
  card: {
    flex: 1, margin: 10, padding: 10,
  },
  moreInfo: {
    alignSelf: 'flex-end',
  },
});

export default function CompletedTasksList() {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      <Card style={styles.card}>
        <Headline>Název úkolu: Přiřadí barvu</Headline>
        <Headline>Datum: 16.1.2022</Headline>
        <Headline>Pedagog: Anežka Dobrá</Headline>
        <Button style={styles.moreInfo}>Více</Button>
      </Card>
      <Card style={styles.card}>
        <Headline>Název úkolu: Odliší jiný obrázek v řadě</Headline>
        <Headline>Datum: 11.1.2022</Headline>
        <Headline>Pedagog: Marie Vystrčilová</Headline>
        <Button style={styles.moreInfo}>Více</Button>
      </Card>
      <Card style={styles.card}>
        <Headline>Název úkolu: Určí, zda se dvě slova rýmují</Headline>
        <Headline>Datum: 20.12.2021</Headline>
        <Headline>Pedagog: Marie Vystrčilová</Headline>
        <Button style={styles.moreInfo}>Více</Button>
      </Card>
    </View>
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

function Tasks() {
  return (
    <SafeAreaView style={{ flexDirection: 'column', flex: 1, alignItems: 'center' }}>
      <Header>Seznam kufrů?</Header>
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
