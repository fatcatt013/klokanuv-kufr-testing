import { StyleSheet, View } from 'react-native';
import { Button, Checkbox, Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
  },
});

export default function CompleteTask() {
  return (
        <View style={styles.container}>
            <Text>Název úkolu</Text>
            <Text>Třída</Text>
            <Checkbox status={'unchecked'}>Anicka</Checkbox>
            <Checkbox status={'unchecked'}>Petr</Checkbox>
            <Checkbox status={'unchecked'}>Tomas</Checkbox>
            <Checkbox status={'unchecked'}>Jana</Checkbox>
            <Button>Vyplnit</Button>
        </View>
  );
}
