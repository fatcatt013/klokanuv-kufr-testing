import React from 'react';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { Background } from './Background';

export function LoadingScreen() {
  const theme = useTheme();

  return (
    <Background center>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  );
}
