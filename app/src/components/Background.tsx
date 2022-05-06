import React from 'react';
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native';

type Props = {
  center?: boolean;
  children: React.ReactNode;
};

export const Background = React.memo(({ center, children }: Props) => {
  return <ImageBackground
    source={require('../../assets/background_dot.png')}
    resizeMode="repeat"
    style={styles.background}
  >
    <KeyboardAvoidingView style={[styles.container, center && styles.center]} behavior="padding">
      {children}
    </KeyboardAvoidingView>
  </ImageBackground>
});

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    width: '100%',
  },
  center: {
    padding: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
