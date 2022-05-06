import React from 'react';
import { Button, Card, Divider, Headline, Paragraph, Text, useTheme } from 'react-native-paper';
import { SafeAreaView, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 15,
    minWidth: 300,
    minHeight: 160,
  },
  moreInfo: {
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  pedagog: {
    justifyContent: 'center',
  },
  taskName: {
    fontWeight: 'bold',
  },
});

type RecentActivityCardProps = {
  taskName: string,
  date: string,
  pedagog: string,
  note: string
};

export const RecentActivityCard = React.memo((props: RecentActivityCardProps) => {
  const theme = useTheme();

  return <SafeAreaView style={{ padding: 20, flex: 1 }}>
    <Card style={styles.card}>
      <Headline style={styles.taskName}>{props.taskName}</Headline>
      <Divider />
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Headline>{props.date}</Headline>
        </View>
        <View style={{ flex: 1 }} />
        <View style={styles.pedagog}>
          <Text style={{ color: theme.colors.grey }}>Pedagog: {props.pedagog}</Text>
        </View>
      </View>
      <Paragraph>{props.note}</Paragraph>
      <Button mode={'outlined'} style={styles.moreInfo}>Více</Button>
    </Card>
  </SafeAreaView>
});
