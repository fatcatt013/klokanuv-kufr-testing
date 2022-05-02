import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClientProvider } from 'react-query'
import { theme } from './src/theme';
import { queryClient } from './src/utils';
import App from './src';

const Main = () => (
  <Provider theme={theme}>
    <NavigationContainer>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  </Provider>
);

export default Main;

//export {default} from './storybook';
