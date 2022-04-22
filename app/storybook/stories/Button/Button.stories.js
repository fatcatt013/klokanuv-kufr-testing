import { storiesOf } from '@storybook/react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import CenterView from '../CenterView';

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 10,
  },
    roundButton: {
      fontSize: 30,
      borderRadius: 25,
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
      },
});

storiesOf('Button', module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .add('Button variants', () => (
      <View>
        <Button mode={'outlined'} style={styles.button}>Outlined</Button>
        <Button mode={'contained'} style={styles.button}>Filled/contained</Button>
        <Button mode={'text'} style={styles.button}>Plain text button</Button>
        <Button mode={'contained'} icon='camera' style={styles.button}>With icon</Button>
        <Button mode={'contained'} loading='true' style={styles.button}>With loading</Button>

      </View>
  ));
