import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Background } from '../components/Background';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import { BackButton } from '../components/BackButton';
import { theme } from '../theme';
import { nameValidator, emailValidator, passwordValidator } from '../utils';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { Headline } from 'react-native-paper';

type Props = StackScreenProps<RootStackParamList, 'Register'>;

export const RegisterScreen = React.memo(({ navigation }: Props) => {
  const [name, setName] = React.useState({ value: '', error: '' });
  const [email, setEmail] = React.useState({ value: '', error: '' });
  const [password, setPassword] = React.useState({ value: '', error: '' });

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    navigation.push('ClassSelect');
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.pop()} />

      <Logo />

      <Headline>Aktivovat účet</Headline>

      <TextInput
        label="Aktivační kód"
        returnKeyType="next"
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        autoComplete="name"
      />

      <TextInput
        label="E-mail"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoComplete="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput
        label="Heslo"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        autoComplete="new-password"
      />

      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        Aktivovat
      </Button>

      <View style={styles.row}>
        <Text>Už máte účet? </Text>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Text style={styles.link}>Přihlásit se</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
});

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
