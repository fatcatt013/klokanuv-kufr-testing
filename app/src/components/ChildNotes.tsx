import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { FAB, Portal, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChildIDContext } from '../lib/contexts';
import { RootStackParamList } from '../lib/navigation';
import { useChildNotes } from '../use-assessment-data';
import { RecentActivityCard } from './RecentActivityCard';

export const MockDataRecentActivityCard = {
  taskName: 'Přiřadí barvu',
  date: '16.1.2022',
  pedagog: 'Anežka Dobrá',
  note: 'Toto je popis k vypněnému úkolu, možná se to nebude vyplňovat často a tak by bylo dobré zavést nějaký obecný'
    + ' placeholder nebo nějak naznačit, že zde není žádný popis naschvál a ne omylem.',
};

type Props = StackScreenProps<RootStackParamList, 'Child'>;

export const ChildNotes = ({ navigation }: Props) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const childId = React.useContext(ChildIDContext);
  const [notes, addNote] = useChildNotes(childId);

  React.useEffect(() => {
    addNote('Test');
  }, []);

  return <>
    <RecentActivityCard {...MockDataRecentActivityCard} />
    <Portal>
      <FAB
        visible={isFocused}
        icon="note-plus-outline"
        color="white"
        style={{ backgroundColor: theme.colors.blue, position: 'absolute', paddingBottom: insets.bottom + 54, paddingRight: insets.right }}
        onPress={() => navigation.push('CreateNoteChild', { childId })}
      />
    </Portal>
  </>;
}
