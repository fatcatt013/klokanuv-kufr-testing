import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import { NavigationProp } from '@react-navigation/native';

type Props = {
  navigation: NavigationProp<{ LoginScreen: {}; RegisterScreen: {} }>;
};

const HomeScreen = ({ navigation }: Props) => (
  <Background>
    <Logo />

    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Přihlásit se
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}
    >
      Aktivovat účet
    </Button>
  </Background>
);

export default memo(HomeScreen);
