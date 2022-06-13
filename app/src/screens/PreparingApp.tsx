import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Headline, Text, useTheme } from "react-native-paper";
import { useRecoilValue } from 'recoil';
import { useFetchers } from '../actions';
import { Background } from '../components/Background';
import { Logo } from '../components/Logo';
import { dataReadyState, tasksState } from '../store';
import { useAuth } from '../use-auth';

export const PreparingAppScreen = () => {
  const [value, setValue] = React.useState(0);
  const counter = React.useRef(new Animated.Value(0)).current;
  const theme = useTheme();
  const fetchers = useFetchers();
  const { logOut } = useAuth();

  React.useEffect(() => {
    Animated.timing(counter, {
      toValue: value / 7 * 100,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [value]);

  const width = counter.interpolate({
    inputRange: [0, 100],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp"
  });

  React.useEffect(() => {
    (async () => {
      try {
        await Promise.all([
          fetchers.fetchAllChildNotes(),
          fetchers.fetchAllClassNotes(),
          fetchers.fetchAssessments(),
          fetchers.fetchAssessmentTypes(),
          fetchers.fetchCategories(),
          fetchers.fetchChildren(),
          fetchers.fetchClasses(),
          fetchers.fetchSchool(),
          fetchers.fetchSubcategories(),
          fetchers.fetchTasks(),
          fetchers.fetchUsers(),
        ].map(x => x.then(x => {
          setValue(n => n + 1);
          return x;
        })));
      } catch {
        logOut();
      }
    })();
  }, []);

  return <Background center>
    <Logo />

    <Headline>Stahujeme data před prvním použití aplikace</Headline>

    <View style={styles.progressBar}>
      <Animated.View
        style={[StyleSheet.absoluteFill, {
          backgroundColor: theme.colors.orange,
          width
        }]}></Animated.View>
    </View>

    <Text>{Math.round(value / 7 * 100)}%</Text>
  </Background>;
};

const styles = StyleSheet.create({
  progressBar: {
    height: 20,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 5,
  },
});
