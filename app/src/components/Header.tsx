import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, IconButton, Menu } from 'react-native-paper';
import { theme } from '../theme';
import { useAuth } from '../use-auth';

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});

export const Header = React.memo(function Header({ back, options, navigation }: StackHeaderProps) {
  const { signOut } = useAuth();
  const [visible, setVisible] = React.useState(false);
  const color = options.headerTintColor;

  const title
    = typeof options.headerTitle === 'string' ? options.headerTitle
      : typeof options.headerTitle === 'undefined' ? options.title
        : React.createElement(
          options.headerTitle as () => JSX.Element,
          { children: [options.title || ''] },
        )

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction color={color} onPress={navigation.goBack} size={20} /> : null}
      <Appbar.Content title={title} color={color} titleStyle={{ fontSize: 18 }} />

      <IconButton color={color} icon="briefcase-search-outline" onPress={() => navigation.push('CategoryList')} />
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
