import * as React from 'react';
import { Text } from 'react-native-paper';

import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';
import { LoadingScreen } from '../components/LoadingScreen';
import { fetcher } from '../utils';
import { useQuery } from 'react-query';

// 3 urovne/kategorie tasku

// NOT DONE YET ... TODO ... BROKEN

// const Cat2Stack = createStackNavigator();
// const Cat1Stack = createStackNavigator();
// const TasksStack = createStackNavigator();

// function Task() {
//   return (
//       <Card>
//           <Button mode={'outlined'}>Ukol dane kategorie</Button>
//       </Card>
//
//   );
// }
// function Tasks() {
//   return (
//         <TasksStack.Navigator>
//             <TasksStack.Screen name={'Ukol 1'} component={Task}/>
//             <TasksStack.Screen name={'Ukol 2'} component={Task}/>
//             <TasksStack.Screen name={'Ukol 3'} component={Task}/>
//         </TasksStack.Navigator>
//
//   );
// }
// function Category2() {
//   return (
//         <Cat2Stack.Navigator>
//             <Cat2Stack.Screen name={'Kategorie úroveň 2'} component={Tasks}/>
//         </Cat2Stack.Navigator>
//
//   );
// }
//
// function Category1() {
//   return (
//         <Cat1Stack.Navigator>
//             <Cat1Stack.Screen name={'Kategorie úroveň 1'} component={Category2}/>
//         </Cat1Stack.Navigator>
//
//   );
// }

function Placeholder() {
  return <Text>Not implemented yet.</Text>;
}

export default function AvailableTasksList() {
  const { data } = useQuery('tasks', () => fetcher.get('/tasks'));
  console.log(data);

  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </React.Suspense>
  );

  // <Stack.Navigator>
  //     <Stack.Screen name="Úkoly" component={Placeholder} />
  // </Stack.Navigator>
}

// 
// import React from 'react';
// import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { useTheme } from 'react-native-paper';
// 
// import { useInfiniteMovies } from '@app/screens/hooks/useInfiniteMovies';
// import { Divider } from '@app/components/Divider';
// import type { MainStack } from '@app/navigation/types';
// import { ListItem, LIST_ITEM_HEIGHT } from '@app/components/ListItem';
// import { LIST_LEFT_SPACING } from '@app/styles/constants';
// import { MovieFragment } from '@app/services/graphql';
// import { useOnlineStatus } from '@app/providers/hooks/useOnlineStatus';
// import { useRefreshOnFocus } from '@app/hooks/useRefreshOnFocus';
// import { useRefreshByUser } from '@app/hooks/useRefreshByUser';
// import { ListFooterComponent } from '@app/components/ListFooterComponent';
// import { MOVIES_LIST } from '@app/test/testIDs';
// 
// type MoviesListScreenNavigationProp = StackNavigationProp<
//   MainStack,
//   'MoviesList'
// >;
// 
// type Props = {
//   navigation: MoviesListScreenNavigationProp;
// };
// 
// export function MoviesList({ navigation }: Props) {
//   const theme = useTheme();
//   const isOnline = useOnlineStatus();
// 
//   const { movies, refetch, fetchNextPage, isFetchingNextPage } =
//     useInfiniteMovies();
// 
//   const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);
//   useRefreshOnFocus(refetch);
// 
//   const onListItemPress = React.useCallback(
//     (movie: MovieFragment) => {
//       navigation.navigate('MovieDetails', {
//         movie,
//       });
//     },
//     [navigation]
//   );
// 
//   function onEndReached() {
//     console.log('onEndReached');
//     fetchNextPage();
//   }
// 
//   const renderItem = React.useCallback(
//     ({ item }: { item: MovieFragment }) => {
//       return <ListItem item={item} onPress={onListItemPress} />;
//     },
//     [onListItemPress]
//   );
// 
//   return (
//     <View style={[styles.fill]}>
//       <FlatList
//         testID={MOVIES_LIST}
//         refreshControl={
//           isOnline ? (
//             <RefreshControl
//               refreshing={isRefetchingByUser}
//               onRefresh={refetchByUser}
//               tintColor={theme.colors.primary}
//             />
//           ) : undefined
//         }
//         data={movies}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={renderItem}
//         onEndReached={onEndReached}
//         onEndReachedThreshold={1}
//         style={[
//           styles.fill,
//           {
//             backgroundColor: theme.colors.background,
//           },
//         ]}
//         ItemSeparatorComponent={() => (
//           <Divider
//             style={{
//               marginLeft: LIST_LEFT_SPACING,
//             }}
//           />
//         )}
//         ListFooterComponent={
//           <ListFooterComponent isFetchingNextPage={isFetchingNextPage} />
//         }
//         getItemLayout={(_data, index) => ({
//           length: LIST_ITEM_HEIGHT,
//           offset: LIST_ITEM_HEIGHT * index,
//           index,
//         })}
//       />
//     </View>
//   );
// }
// 
// const styles = StyleSheet.create({
//   fill: {
//     flex: 1,
//   },
// });
