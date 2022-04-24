import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB } from 'react-native-paper';
import { theme } from '../theme';
import RecentActivityCard from './RecentActivityCard';
import { MockDataRecentActivityCard } from '../mockDatas';

const styles = StyleSheet.create({
  task: {
    margin: 10,
    borderRadius: 10,
  },
  blueChild: {
    backgroundColor: theme.colors.light_blue,
  },
  spiderGraph: {
    width: 300,
    height: 300,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.secondary,
  },
});

export default function Notes() {
  return (
    <View style={{ flex: 1 }}>
      <RecentActivityCard props={MockDataRecentActivityCard}/>
      <FAB style={styles.fab} icon="plus"/>
    </View>
  );
}
