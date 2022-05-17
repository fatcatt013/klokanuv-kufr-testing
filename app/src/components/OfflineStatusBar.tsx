import React from 'react';
import { Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  bar: {
    fontSize: 18, backgroundColor: 'red', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
  },
});

const OfflineStatusBar = (props: { show: boolean }) => {
  const title = 'Bez připojení k internetu.';
  if (props.show) {
    return <View>
      <Text style={styles.bar} >{title}</Text>
    </View>;
  }
  return <View></View>;
};

export default OfflineStatusBar;
