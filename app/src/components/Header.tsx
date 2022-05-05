import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { Appbar, IconButton, Menu } from 'react-native-paper';
import { useAuth } from '../use-auth';

export const Header = React.memo(function Header({ back, options, navigation }: StackHeaderProps) {
  const { signOut } = useAuth();
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
      {back ? <Appbar.BackAction color="white" onPress={navigation.goBack} size={20} /> : null}
      <Appbar.Content title={title} titleStyle={{ fontSize: 18, color: 'white' }} />

      <IconButton color="white" icon="briefcase-search-outline" onPress={() => navigation.push('TaskList')} />
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={<Appbar.Action icon="menu" color="white" onPress={() => setVisible(true)} />}
      >
        <Menu.Item onPress={() => signOut()} title="Odhlásit se" />
      </Menu>
    </Appbar.Header>
  )
});
