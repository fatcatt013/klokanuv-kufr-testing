import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { Caption, Text, useTheme } from 'react-native-paper';
import { TextInput } from '../components/TextInput';
import { TouchableOpacity } from 'react-native';
import { Modal } from '../components/Modal';

type Props = StackScreenProps<RootStackParamList, 'Child'>;

export const CreateNoteScreen = React.memo(function CreateNoteScreen(props: Props) {
  const { route, navigation } = props;
  const theme = useTheme();
  const [note, setNote] = React.useState({ value: '', error: '' });

  return <Modal {...props}>
    <Caption>Poznámka ke třídě (...)</Caption>
    <TextInput
      label="Poznámka"
      returnKeyType="next"
      value={note.value}
      onChangeText={text => setNote({ value: text, error: '' })}
      error={!!note.error}
      errorText={note.error}
      autoComplete="none"
    />

    <TouchableOpacity onPress={() => navigation.pop()}>
      <Text style={{ color: theme.colors.primary }}>Vytvořit poznámku</Text>
    </TouchableOpacity>
  </Modal>;
});
