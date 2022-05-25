import React from 'react';
import { FlatList } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { Background } from '../components/Background';
import { useSubcategory } from '../use-core-data';

type Props = StackScreenProps<RootStackParamList, 'ClassSubcategory'>;

const difficultyIcons = {
  EASIER: 'plus',
  SAME: 'equal',
  HARDER: 'minus',
};

export const ClassSubcategoryScreen = React.memo(function ClassSubcategoryScreen({ route, navigation }: Props) {
  const classId = route.params.classId;
  const subcategory = useSubcategory(route.params.subcategoryId);
  return <Background>
    <FlatList
      data={subcategory?.tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card style={{ margin: 3 }} onPress={() => navigation.push('ClassTask', { classId, taskId: item.id! })}>
          <Card.Content style={{ flexDirection: 'row' }}>
            {item.difficulty &&
              <Icon size={15} style={{ marginRight: 5 }} name={difficultyIcons[item.difficulty]} />}
            <Paragraph>
              {item.task_description}
            </Paragraph>
          </Card.Content>
        </Card>
      )}
    />
  </Background>;
});
