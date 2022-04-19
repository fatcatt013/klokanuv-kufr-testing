import React from 'react';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import Background from '../components/Background';

export function LoadingScreen() {
  const theme = useTheme();

  return (
    <Background>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </Background>
  );
}
