import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../theme';
import { emailValidator, passwordValidator } from '../utils';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<{ Dashboard: {}; RegisterScreen: {}; ForgotPasswordScreen: {}; HomeScreen: {}; }>;
};

const HomeScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    navigation.navigate('ClassSelectScreen');
  };

  return <Background>
    <Logo />

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
      autoComplete="current-password"
      secureTextEntry
    />

    <View style={styles.forgotPassword}>
      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPasswordScreen')}
      >
        <Text style={styles.label}>Zapomněli jste heslo?</Text>
      </TouchableOpacity>
    </View>

    <Button mode="contained" onPress={_onLoginPressed}>
      Přihlásit se
    </Button>

    <View style={styles.row}>
      <Text style={styles.label}>Nemáte účet? </Text>
      <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={styles.link}>Aktivujte si ho</Text>
      </TouchableOpacity>
    </View>
  </Background>
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
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

export default memo(HomeScreen);
