import { Button, Card, Headline } from 'react-native-paper';
import * as React from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  moreInfo: {
    alignSelf: 'flex-end',
  },
});

export default function RecentActivityCard() {
  return (
        <Card style={styles.card}>
            <Headline>Název úkolu: Přiřadí barvu</Headline>
            <Headline>Datum: 16.1.2022</Headline>
            <Headline>Pedagog: Anežka Dobrá</Headline>
            <Button mode={'outlined'} style={styles.moreInfo}>Více</Button>
        </Card>
  );
}
