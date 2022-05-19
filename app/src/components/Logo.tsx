import React from 'react';
import { Image, StyleSheet } from 'react-native';

export const Logo = React.memo(() => (
  <Image source={require('../../assets/kufr-logo.png')} style={styles.image} />
));

const styles = StyleSheet.create({
  image: {
    width: 313,
    height: 100,
    marginBottom: 36,
  },
});
