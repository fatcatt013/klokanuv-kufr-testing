import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { Appbar, Menu, Portal } from 'react-native-paper';
import { useAuth } from '../use-auth';
import { CategoryGrid } from './CategoryGrid';
import { SubcategoryPicker } from './SubcategoryPicker';

export const Header = React.memo(function Header({ back, options, navigation }: StackHeaderProps) {
  const { logOut } = useAuth();
  const [visible, setVisible] = React.useState(false);
  const [gridVisible, setGridVisible] = React.useState(false);
  const [category, setCategory] = React.useState(-1);
  const [subVisible, setSubVisible] = React.useState(false);

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

      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={<Appbar.Action icon="menu" color="white" onPress={() => setVisible(true)} />}
      >
        <Menu.Item onPress={() => { setVisible(false); setGridVisible(true); }} title="Procházet kufr" />
        <Menu.Item onPress={() => logOut()} title="Odhlásit se" />
      </Menu>

      <Portal>
        <CategoryGrid open={gridVisible} onClose={() => setGridVisible(false)}
          onSelect={(id) => { setCategory(id); setSubVisible(true) }} />
        <SubcategoryPicker open={subVisible} category={category} onClose={() => setSubVisible(false)} onSelect={(id) => navigation.navigate('Subcategory', { subcategoryId: id })} />
      </Portal>
    </Appbar.Header>
  )
});
