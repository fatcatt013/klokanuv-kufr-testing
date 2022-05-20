import React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { Background } from '../components/Background';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSubcategory } from '../use-core-data';
import { FlatList } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';

type Props = StackScreenProps<RootStackParamList, 'Subcategory'>;

const difficultyIcons = {
  'EASIER': 'plus',
  'SAME': 'equal',
  'HARDER': 'minus',
};

export const SubcategoryScreen = React.memo(function SubcategoryScreen({ route, navigation }: Props) {
  const subcategory = useSubcategory(route.params.subcategoryId);
  return <Background>
    <FlatList
      data={subcategory?.tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Card style={{ margin: 3 }} onPress={() => navigation.push('Task', { taskId: item.id! })}>
          <Card.Content>
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

/*
 *     <SectionList
 *       style={{ margin: 3 }}
 *       sections={(category?.subcategories || []).map(
 *         sub => ({ title: sub.label, data: sub.tasks })
 *       )}
 *       keyExtractor={(item) => item.id.toString()}
 *       renderSectionHeader={({ section }) => <Caption>{section.title}</Caption>}
 *       renderItem={({ item }) => (
 *         <Card style={{ flex: 1, margin: 2 }} onPress={() => navigation.push('Task', { taskId })}>
 *           <Card.Content style={{ flexDirection: 'row' }}>
 *
 *             <Text>{item.task_description}</Text>
 *           </Card.Content>
 *         </Card>
 *       )}
 *     /> */