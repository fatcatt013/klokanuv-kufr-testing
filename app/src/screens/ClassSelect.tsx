import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { FlatList } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { useRecoilValue } from 'recoil';
import { Background } from '../components/Background';
import { RootStackParamList } from '../lib/navigation';
import { groupsState } from '../store';

type Props = StackScreenProps<RootStackParamList, 'ClassSelect'>;

export default function ClassSelectScreen({ navigation }: Props) {
  const groups = useRecoilValue(groupsState);

  return (
    <Background>
      <FlatList
        data={groups}
        keyExtractor={x => x.id.toString()}
        renderItem={({ item }) => (
          <Card elevation={2} style={{ marginBottom: 8 }} onPress={() => navigation.replace('Class', { classId: item.id })}>
            <Card.Content>
              <Title>{item.name}</Title>
            </Card.Content>
          </Card>
        )}
      />
    </Background>
  );
}
