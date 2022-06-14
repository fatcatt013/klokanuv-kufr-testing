import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput as Input, Text } from 'react-native-paper';
import { theme } from '../theme';

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

export const TextInput = React.memo(({ errorText, ...props }: Props) => (
  <View style={styles.container}>
    <Input
      style={styles.input}
      selectionColor={theme.colors.primary}
      underlineColor="transparent"
      mode="outlined"
      {...props}
    />
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
));

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 4,
  },
  input: {
    backgroundColor: theme.colors.surface,
    minHeight: 50,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});
