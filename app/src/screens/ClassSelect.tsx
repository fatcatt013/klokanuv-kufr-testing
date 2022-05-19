import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { FlatList } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { Background } from '../components/Background';
import { RootStackParamList } from '../lib/navigation';
import { useClassrooms } from '../use-school-data';

type Props = StackScreenProps<RootStackParamList, 'ClassSelect'>;

export const ClassSelectScreen = React.memo(function ClassSelectScreen({ navigation }: Props) {
  const classrooms = useClassrooms();

  return <Background>
    <FlatList
      data={classrooms}
      keyExtractor={x => x.id!.toString()}
      renderItem={({ item }) => (
        <Card elevation={2} style={{ marginBottom: 8 }} onPress={() => navigation.replace('Class', { classId: item.id! })}>
          <Card.Content>
            <Title>{item.label}</Title>
          </Card.Content>
        </Card>
      )}
    />
  </Background>;
})
