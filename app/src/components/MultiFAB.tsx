import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FAB, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList } from '../lib/navigation';
import { useMultiFABScroll } from './MultiFABContext';

export interface MultiFABProps {
  multi?: boolean;
  initial?: RootStackParamList['CreateAssessment'];
}

export const MultiFAB: React.FC<{ visible?: boolean; tabs?: boolean }> = ({ visible, tabs }) => {
  const [open, setOpen] = React.useState(false);
  const { props: { initial, multi }, showButton } = useMultiFABScroll();
  const navigation = useNavigation() as any;
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const createNote = React.useCallback(() => {
    if (initial?.classId) {
      navigation.navigate('ClassNotes', { openAdd: true });
    } else {
      navigation.navigate('ChildNotes', { openAdd: true });
    }
  }, [initial, navigation]);

  const createAssessment = React.useCallback(() => {
    navigation.navigate('CreateAssessment', initial);
  }, [initial]);

  return (
    <FAB.Group
      visible={visible ? showButton : false}
      open={open}
      icon={multi ? 'order-bool-ascending-variant' : open ? 'close' : 'plus'}
      color="white"
      style={{
        position: 'absolute',
        paddingBottom: insets.bottom + (tabs ? 54 : 0),
        paddingRight: insets.right,
      }}
      fabStyle={{
        backgroundColor: !multi ? theme.colors.blue : theme.colors.green,
      }}
      actions={[
        { icon: 'note-plus', label: 'Přidat poznámku', onPress: createNote },
        { icon: 'order-bool-ascending-variant', label: 'Vyplnit úkol', onPress: createAssessment },
      ]}
      onStateChange={({ open }) => {
        if (!multi) {
          setOpen(open);
        }
      }}
      onPress={() => {
        if (!open && multi) {
          createAssessment();
        }
      }}
    />
  );
};
