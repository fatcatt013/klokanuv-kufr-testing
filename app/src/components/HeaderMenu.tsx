import React from 'react';
import { useAuth } from '../use-auth';
import { Appbar, Menu } from 'react-native-paper';

export const HeaderMenu = React.memo(function HeaderMenu({ navigation }: any) {
  const { logOut } = useAuth();
  const [visible, setVisible] = React.useState(false);
  return (
    <Menu
      visible={visible}
      onDismiss={() => setVisible(false)}
      anchor={<Appbar.Action icon="menu" color="white" onPress={() => setVisible(true)} />}
    >
      <Menu.Item onPress={() => { setVisible(false); navigation.navigate('CategoryList') }} title="Procházet kufr" />
      <Menu.Item onPress={() => { setVisible(false); navigation.navigate('About') }} title="O aplikaci" />
      <Menu.Item onPress={() => { setVisible(false); logOut() }} title="Odhlásit se" />
    </Menu>
  );
});
