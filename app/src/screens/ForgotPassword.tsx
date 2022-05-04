import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { emailValidator } from '../utils';
import { Background } from '../components/Background';
import { BackButton } from '../components/BackButton';
import { Logo } from '../components/Logo';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { Headline } from 'react-native-paper';

type Props = StackScreenProps<RootStackParamList, 'ForgotPassword'>;

export const ForgotPasswordScreen = React.memo(({ navigation }: Props) => {
  const [email, setEmail] = React.useState({ value: '', error: '' });

  const _onSendPressed = () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    navigation.pop();
  };

  return (
    <Background center>
      <BackButton goBack={() => navigation.pop()} />

      <Logo />

      <Headline>Zapomněli jste heslo?</Headline>

      <TextInput
        label="E-mail"
        returnKeyType="done"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <Button mode="contained" onPress={_onSendPressed} style={styles.button}>
        Obnovit heslo
      </Button>

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.pop()}
      >
        <Text style={styles.label}>← Zpět na přihlášení</Text>
      </TouchableOpacity>
    </Background>
  );
});

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    width: '100%',
  },
});
