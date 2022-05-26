import React from 'react';
import { FlatList } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Portal } from 'react-native-paper';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../lib/navigation';
import { Background } from '../components/Background';
import { useSubcategory } from '../use-core-data';
import { MultiFAB } from '../components/MultiFAB';
import { TaskListItem } from '../components/TaskListItem';

type Props = StackScreenProps<RootStackParamList, 'ClassSubcategory'>;

export const ClassSubcategoryScreen = React.memo(function ClassSubcategoryScreen({ route, navigation }: Props) {
  const { classId, subcategoryId } = route.params;
  const subcategory = useSubcategory(subcategoryId);
  const isFocused = useIsFocused();
  return <Background>
    <FlatList
      data={subcategory?.tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TaskListItem
        item={item}
        onPress={() => navigation.push('ClassTask', { classId, taskId: item.id! })}
      />}
    />

    <Portal>
      <MultiFAB visible={isFocused} initial={{ classId, subcategoryId }} />
    </Portal>
  </Background>;
});
