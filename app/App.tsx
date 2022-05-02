import * as React from 'react';
import { ActivityIndicator, Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from 'react-query'
import { theme } from './src/theme';
import { queryClient } from './src/utils';
import { App } from './src';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

const Main = () => {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (Platform.OS !== 'web' && initialUrl == null) {
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;
          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }
  }, [isReady]);

  if (!isReady) {
    return <ActivityIndicator />;
  }

  return <Provider theme={theme}>
    <NavigationContainer
      initialState={initialState}
      onStateChange={state => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}
    >
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  </Provider>
};

export default Main;

//export {default} from './storybook';
