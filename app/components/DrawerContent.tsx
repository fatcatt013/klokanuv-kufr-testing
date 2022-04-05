import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import * as React from 'react';

export default function DrawerContent(props) {
  return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>
  );
}
