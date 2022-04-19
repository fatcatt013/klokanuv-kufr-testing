import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../../assets/kufr-logo.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 380,
    height: 100,
    marginBottom: 36,
  },
});

export default memo(Logo);
