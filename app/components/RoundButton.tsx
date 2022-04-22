import * as React from 'react';
import { Button } from 'react-native-paper';

export default function RoundButton() {
  return (
        <Button compact={'true'} labelStyle={{ fontSize: 30 }} icon='plus' style={[styles.button, styles.roundButton]}></Button>
  );
}
