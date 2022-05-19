import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Button, Caption, Card, Dialog, FAB, Headline, Portal, Text, useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChildIDContext } from '../lib/contexts';
import { RootStackParamList } from '../lib/navigation';
import { useChildNoteOps, useChildNotes } from '../use-assessment-data';
import { useChild } from '../use-school-data';
import { TextInput } from './TextInput';

type Props = StackScreenProps<RootStackParamList, 'Child'>;

export const ChildNotes = ({ }: Props) => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const isFocused = useIsFocused();
  const childId = React.useContext(ChildIDContext);
  const child = useChild(childId);
  const notes = useChildNotes(childId);
  const ops = useChildNoteOps();

  const [noteId, setNoteId] = React.useState<number | null>(null);
  const [note, setNote] = React.useState<string>('');
  const [open, setOpen] = React.useState(false);

  return <>
    <FlatList
      data={notes}
      keyExtractor={(item) => item.id!.toString()}
      renderItem={({ item }) => (
        <Card
          style={{ margin: 5, padding: 10 }}
          onPress={() => {
            setNoteId(item.id!);
            setNote(item.note);
            setOpen(true);
          }}
        >
          <Text>{item.note}</Text>
        </Card>
      )}
    />

    <Portal>
      <FAB
        visible={isFocused}
        icon="note-plus-outline"
        color="white"
        style={{
          backgroundColor: theme.colors.blue,
          position: 'absolute',
          bottom: insets.bottom + 54 + 16,
          right: insets.right + 16
        }}
        onPress={() => { setNoteId(null); setNote(''); setOpen(true) }}
      />

      <Dialog visible={open} onDismiss={() => setOpen(false)}>
        <Dialog.Content>
          <Headline>{child?.first_name} {child?.last_name}</Headline>
          <Caption>19. 5. 2022</Caption>
          <TextInput
            returnKeyType="done"
            value={note}
            onChangeText={text => setNote(text)}
            autoComplete="none"
            multiline={true}
            numberOfLines={4}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button onPress={async () => {
              if (noteId) {
                await ops.editChildNote(noteId, childId, note);
              } else {
                await ops.addChildNote(childId, note);
              }
              setOpen(false);
            }}>Uložit</Button>

            {noteId && <Button onPress={async () => {
              await ops.deleteChildNote(noteId);
              setOpen(false);
            }}>Odstranit</Button>}
          </View>
        </Dialog.Content>
      </Dialog>

    </Portal>
  </>;
}
