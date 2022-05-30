import React from 'react';
import { StyleSheet, KeyboardAvoidingView } from 'react-native';

type Props = {
  center?: boolean;
  children: React.ReactNode;
};

export const Background = React.memo(({ center, children }: Props) => {
  return <KeyboardAvoidingView style={[styles.container, center && styles.center]} behavior="height">
    {children}
  </KeyboardAvoidingView>
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
