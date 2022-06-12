import React from 'react';
import { Linking, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { useNetInfo } from '@react-native-community/netinfo';
import { theme } from './src/theme';
import { App } from './src';
import OfflineStatusBar from './src/components/OfflineStatusBar';
import { AuthProvider } from './src/use-auth';
import { ApiProvider } from './src/use-fetch';
import { RecoilRoot } from 'recoil';

export default function AppRoot() {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();
  const { isConnected } = useNetInfo();

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
          const savedStateString = await AsyncStorage.getItem('NAVIGATION_STATE');
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

  return <SafeAreaProvider>
    <RecoilRoot>
      <React.Suspense fallback={<AppLoading />}>
        <AuthProvider>
          <ApiProvider>
            <NavigationContainer
              initialState={initialState}
              onStateChange={state => AsyncStorage.setItem('NAVIGATION_STATE', JSON.stringify(state))}
            >
              <Provider theme={theme}>
                <OfflineStatusBar show={!isConnected} />
                <App />
              </Provider>
            </NavigationContainer>
          </ApiProvider>
        </AuthProvider>
      </React.Suspense>
    </RecoilRoot>
  </SafeAreaProvider>;
}
