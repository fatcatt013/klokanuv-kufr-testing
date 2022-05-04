import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, IconButton, Menu, Title } from 'react-native-paper';
import { theme } from '../theme';

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: theme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
});

export const Header = React.memo(function Header({ back, options, navigation }: StackHeaderProps) {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const title
    = typeof options.headerTitle === 'string' ? <Title>{options.headerTitle}</Title>
      : options.headerTitle ? React.createElement(
        options.headerTitle as () => JSX.Element,
        { children: [options.title || ''] },
      ) : <></>;

  return (
    <Appbar.Header>
      {back ? <Appbar.BackAction onPress={navigation.goBack} size={20} /> : null}
      <Appbar.Content
        title={title}
        color={options.headerTintColor}
        titleStyle={{ fontSize: 18 }}
      />

      <IconButton icon="briefcase-search-outline" onPress={() => navigation.push('CategoryList')} />
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={<Appbar.Action icon="menu" color="white" onPress={openMenu} />}
      >
        <Menu.Item onPress={() => { console.log('Option 1 was pressed') }} title="Option 1" />
        <Menu.Item onPress={() => { console.log('Option 2 was pressed') }} title="Option 2" />
        <Menu.Item onPress={() => { console.log('Option 3 was pressed') }} title="Option 3" disabled />
      </Menu>
    </Appbar.Header>
  )
});
