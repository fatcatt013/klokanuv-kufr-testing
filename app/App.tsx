import React from 'react';
import { Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from 'react-query';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { RecoilRoot } from 'recoil';
import NetInfo from '@react-native-community/netinfo';
import { queryClient } from './src/utils';
import { theme } from './src/theme';
import { App } from './src';
import OfflineStatusBar from './src/components/OfflineStatusBar';

const PERSISTENCE_KEY = 'NAVIGATION_STATE';

export default () => {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();
  const [offline, setOffline] = React.useState(false);

  /* eslint-disable global-require */
  const [fontsLoaded] = useFonts({
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
    'Poppins-Thin': require('./assets/fonts/Poppins-Thin.ttf'),
    'Luzanky-Display': require('./assets/fonts/Luzanky-Display.ttf'),
  });
  /* eslint-enable global-require */

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();
        if (Platform.OS === 'web' || initialUrl == null) {
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

  if (!isReady || !fontsLoaded) {
    return <AppLoading />;
  }
  // If you call the function returned from addEventListener(), you execute unsubscribe.
  NetInfo.addEventListener((state) => {
    if (!state.isConnected !== offline) {
      setOffline(!state.isConnected);
    }
  });

  return <Provider theme={theme}>
    <RecoilRoot>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer
            initialState={initialState}
            onStateChange={(state) => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}
          >
            <React.Suspense fallback={<AppLoading />}>
              <OfflineStatusBar show={offline}/>
              <App />
            </React.Suspense>
          </NavigationContainer>
        </QueryClientProvider>
      </SafeAreaProvider>
    </RecoilRoot >
  </Provider >;
};
