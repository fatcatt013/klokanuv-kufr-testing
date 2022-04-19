import { NavigationProp } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';
import Header from '../components/Header';
import Background from '../components/Background';
import Button from '../components/Button';

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
  navigation: NavigationProp<{ Dashboard: {}; HomeScreen: {}; }>;
};

export default function ClassSelectScreen({ navigation }: Props) {
  return (
    <Background>
      <Header>Vyberte třídu</Header>
      <View style={{ width: 400, display: 'flex' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
          <Card style={styles.card}>
            <Header>Žabičky</Header>
            <Text>Pedagog: Marie Vystrčilová</Text>
            <Button mode="contained" style={styles.moreInfo} onPress={() => navigation.navigate('Dashboard')}>Vybrat</Button>
          </Card>
        </TouchableOpacity>
      </View>
    </Background>
  );
}
