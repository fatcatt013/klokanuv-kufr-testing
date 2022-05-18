import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { Button } from 'react-native-paper';
import { TextInput } from '../components/TextInput';
import { Modal } from '../components/Modal';
import { useApi } from '../use-fetch';

type Props = StackScreenProps<RootStackParamList, 'CreateNoteClass'>;

export const CreateNoteClassScreen = React.memo(function CreateNoteScreen(props: Props) {
  const { route, navigation } = props;
  const [note, setNote] = React.useState({ value: '', error: '' });
  const { authClient } = useApi();

  const createNote = async () => {
    await authClient.createClassroomNote(null, { classroom: route.params.classId, note: note.value });
    navigation.pop();
  };

  return <Modal {...props}>
    <TextInput
      label="Poznámka"
      returnKeyType="next"
      value={note.value}
      onChangeText={text => setNote({ value: text, error: '' })}
      error={!!note.error}
      errorText={note.error}
      autoComplete="none"
    />

    <Button labelStyle={{ color: "white" }} mode='contained' onPress={createNote}>Vytvořit poznámku</Button>
  </Modal>;
});
