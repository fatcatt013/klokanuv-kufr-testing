import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { Button, Caption, useTheme } from 'react-native-paper';
import { TextInput } from '../components/TextInput';
import { Modal } from '../components/Modal';

type Props = StackScreenProps<RootStackParamList, 'Child'>;

export const CreateNoteScreen = React.memo(function CreateNoteScreen(props: Props) {
  const { route, navigation } = props;
  const [note, setNote] = React.useState({ value: '', error: '' });

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

    <Button labelStyle={{ color: "white" }} mode='contained' onPress={() => navigation.pop()}>Vytvořit poznámku</Button>
  </Modal>;
});
