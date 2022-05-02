import React, { memo, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { emailValidator } from '../utils';
import { Background } from '../components/Background';
import { BackButton } from '../components/BackButton';
import { Logo } from '../components/Logo';
import { Header } from '../components/Header';
import { TextInput } from '../components/TextInput';
import { Button } from '../components/Button';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';

type Props = StackScreenProps<RootStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState({ value: '', error: '' });

  const _onSendPressed = () => {
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }

    navigation.pop();
  };

  return (
    <Background>
      <BackButton goBack={navigation.pop} />

      <Logo />

      <Header>Zapomněli jste heslo?</Header>

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
};

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

export default memo(ForgotPasswordScreen);
