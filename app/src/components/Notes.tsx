import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { theme } from '../theme';
import { RecentActivityCard } from './RecentActivityCard';

const styles = StyleSheet.create({
  task: {
    margin: 10,
    borderRadius: 10,
  },
  blueChild: {
    backgroundColor: theme.colors.lightBlue,
  },
  spiderGraph: {
    width: 300,
    height: 300,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.blue,
  },
});

export const MockDataRecentActivityCard = {
  taskName: 'Přiřadí barvu',
  date: '16.1.2022',
  pedagog: 'Anežka Dobrá',
  note: 'Toto je popis k vypněnému úkolu, možná se to nebude vyplňovat často a tak by bylo dobré zavést nějaký obecný'
    + ' placeholder nebo nějak naznačit, že zde není žádný popis naschvál a ne omylem.',
};

export const Notes = () => {
  return (
    <View style={{ flex: 1 }}>
      <RecentActivityCard {...MockDataRecentActivityCard} />
      <FAB style={styles.fab} icon="plus" />
    </View>
  );
}
