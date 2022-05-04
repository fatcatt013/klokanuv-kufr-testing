import React from 'react';
import { ImageBackground, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { useTheme } from 'react-native-paper';

type Props = {
  center?: boolean;
  children: React.ReactNode;
};

export const Background = React.memo(({ center, children }: Props) => {
  const theme = useTheme()
  return <ImageBackground
    source={require('../../assets/background_dot.png')}
    resizeMode="repeat"
    style={[styles.background, { backgroundColor: theme.colors.background }]}
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
    padding: 20,
    width: '100%',
  },
  center: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
