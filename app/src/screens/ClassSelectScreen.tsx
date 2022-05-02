import { StackNavigationProp } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { Header } from '../components/Header';
import { Background } from '../components/Background';
import { Button } from '../components/Button';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  moreInfo: {
    alignSelf: 'flex-end',
  },
});

type Props = {
  navigation: StackNavigationProp<{ "Třída": {}; }>;
};

export default function ClassSelectScreen({ navigation }: Props) {
  return (
    <Background>
      <Header>Vyberte třídu</Header>
      <View style={{ width: 400, display: 'flex' }}>
        <TouchableOpacity onPress={() => navigation.push("Třída")}>
          <Card style={styles.card}>
            <Header>Žabičky</Header>
            <Text>Pedagog: Marie Vystrčilová</Text>
            <Button mode="contained" style={styles.moreInfo} onPress={() => navigation.push("Třída")}>Vybrat</Button>
          </Card>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
