import { StyleSheet, View } from 'react-native';
import { Button, Card, Headline } from 'react-native-paper';
// Neco jako Recent activity, data kdy co udelalo dite za task

const styles = StyleSheet.create({
  card: {
    width: '100%', margin: '10px', padding: '10px',
  },
  moreInfo: {
    alignSelf: 'flex-end',
  },
});

export default function CompletedTasksList() {
  return (
        <View>
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
