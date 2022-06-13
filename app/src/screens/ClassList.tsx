import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { FlatList } from 'react-native';
import { Card, Title } from 'react-native-paper';
import { Background } from '../components/Background';
import { RootStackParamList } from '../lib/navigation';
import { useRecoilValue } from 'recoil';
import { classesState } from '../store';

type Props = StackScreenProps<RootStackParamList, 'ClassList'>;

export const ClassListScreen = React.memo(function ClassListScreen({ navigation }: Props) {
  const classrooms = useRecoilValue(classesState);

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
