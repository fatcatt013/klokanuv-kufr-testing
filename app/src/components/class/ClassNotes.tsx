import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Button, Card, Portal, Dialog, Text, Headline, Caption } from 'react-native-paper';
import { ClassIDContext } from '../../lib/contexts';
import { RootStackParamList } from '../../lib/navigation';
import { useClassNotes, useClassroomNoteOps } from '../../use-assessment-data';
import { useClassroom } from '../../use-school-data';
import { MultiFAB } from '../MultiFAB';
import { TextInput } from '../TextInput';

type Props = StackScreenProps<RootStackParamList, 'Class'>;

export const ClassNotes = ({ route, navigation }: Props) => {
  const isFocused = useIsFocused();
  const classId = React.useContext(ClassIDContext);
  const classroom = useClassroom(classId);
  const notes = useClassNotes(classId);
  const ops = useClassroomNoteOps();

  const [noteId, setNoteId] = React.useState<number | null>(null);
  const [note, setNote] = React.useState<string>('');
  const [open, setOpen] = React.useState((route.params as any).openAdd);

  React.useEffect(() => {
    if ((route.params as any).openAdd) {
      setNoteId(null);
      setNote('');
      setOpen(true);
    }
  }, [(route.params as any).openAdd, setNoteId, setNote, setOpen]);

  const closeDialog = React.useCallback(() => {
    setOpen(false);
    navigation.setParams({ openAdd: false } as any);
  }, [navigation, setOpen]);

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
      <MultiFAB tabs visible={isFocused} initial={{ classId }} />

      <Dialog visible={open} onDismiss={closeDialog}>
        <Dialog.Content>
          <Headline>{classroom?.label}</Headline>
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
                await ops.editClassroomNote(noteId, classId, note);
              } else {
                await ops.addClassroomNote(classId, note);
              }
              closeDialog();
            }}>Uložit</Button>

            {noteId && <Button onPress={async () => {
              await ops.deleteClassroomNote(noteId);
              closeDialog();
            }}>Odstranit</Button>}
          </View>
        </Dialog.Content>
      </Dialog>
    </Portal>
  </>;
}