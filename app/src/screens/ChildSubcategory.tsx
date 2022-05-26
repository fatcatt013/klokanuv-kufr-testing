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

type Props = StackScreenProps<RootStackParamList, 'ChildSubcategory'>;

export const ChildSubcategoryScreen = React.memo(function ChildSubcategoryScreen({ route, navigation }: Props) {
  const { childId, subcategoryId } = route.params;
  const subcategory = useSubcategory(subcategoryId);
  const isFocused = useIsFocused();
  return <Background>
    <FlatList
      data={subcategory?.tasks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <TaskListItem
        item={item}
        onPress={() => navigation.push('ChildTask', { childId, taskId: item.id! })}
      />}
    />
    <Portal>
      <MultiFAB visible={isFocused} initial={{ childIds: [childId], subcategoryId }} />
    </Portal>
  </Background >;
});
