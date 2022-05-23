import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Alert, Platform } from 'react-native';
import { Background } from '../components/Background';
import { Logo } from '../components/Logo';
import { Button } from '../components/Button';
import { TextInput } from '../components/TextInput';
import { theme } from '../theme';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { useAuth } from '../use-auth';
import { useApi } from '../use-fetch';

type Props = StackScreenProps<RootStackParamList, 'Login'>;

export const LoginScreen = React.memo(function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = React.useState({ value: '', error: '' });
  const [password, setPassword] = React.useState({ value: '', error: '' });
  const { logIn } = useAuth();
  const { publicAxios } = useApi();

  const _onLoginPressed = React.useCallback(async () => {
    const emailError = !email.value || email.value.length <= 0 ? 'Zadejte e-mail' : '';
    const passwordError = !password.value || password.value.length <= 0 ? 'Zadejte heslo' : '';
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    try {
      const response = await publicAxios.post('/api/token/', {
        email: email.value,
        password: password.value,
      });
      logIn(response.data as unknown as { access: string, refresh: string });
    } catch (e) {
      const alertText = e instanceof Error ? e.message : String(e);
      if (Platform.OS === 'web') {
        alert(alertText)
      } else {
        Alert.alert('Chyba', alertText)
      }
    }
  }, [email, password, logIn, publicAxios]);

  const _onDemoPressed = () => {
    //signInDemo();
  };

  return <Background center>
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
        onPress={() => navigation.push('ForgotPassword')}
      >
        <Text style={styles.link}>Zapomněli jste heslo?</Text>
      </TouchableOpacity>
    </View>

    <Button mode="contained" onPress={_onLoginPressed}>
      Přihlásit se
    </Button>

    <View style={styles.row}>
      <Text>Nemáte účet? </Text>
      <TouchableOpacity onPress={() => navigation.push('Register')}>
        <Text style={styles.link}>Aktivujte si ho</Text>
      </TouchableOpacity>
    </View>

    <Button labelStyle={{ color: theme.colors.primary }} mode="outlined" onPress={_onDemoPressed}>
      Přihlásit do demo verze
    </Button>
  </Background>
});

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 36,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
