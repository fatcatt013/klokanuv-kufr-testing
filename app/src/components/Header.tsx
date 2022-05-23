import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { Appbar, Menu } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../use-auth';

export const Header = React.memo(function Header({ back, options, navigation }: StackHeaderProps) {
  const { logOut } = useAuth();
  const [visible, setVisible] = React.useState(false);

  const title
    = typeof options.headerTitle === 'string' ? options.headerTitle
      : typeof options.headerTitle === 'undefined' ? options.title
        : React.createElement(
          options.headerTitle as () => JSX.Element,
          { children: [options.title || ''] },
        )
  return (
    <Appbar.Header>
      <SafeAreaView>
        {back ? <Appbar.BackAction color="white" onPress={navigation.goBack} size={20} /> : null}
        <Appbar.Content title={title} titleStyle={{ fontSize: 18, color: 'white' }} />

        <Menu
          visible={visible}
          onDismiss={() => setVisible(false)}
          anchor={<Appbar.Action icon="menu" color="white" onPress={() => setVisible(true)} />}
        >
          <Menu.Item onPress={() => { setVisible(false); navigation.navigate('CategoryList') }} title="Procházet kufr" />
          <Menu.Item onPress={() => { setVisible(false); navigation.navigate('About') }} title="O aplikaci" />
          <Menu.Item onPress={() => { setVisible(false); logOut() }} title="Odhlásit se" />
        </Menu>
      </SafeAreaView>
    </Appbar.Header>
  )
});
