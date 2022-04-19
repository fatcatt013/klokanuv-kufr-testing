import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';
import { QueryClientProvider } from 'react-query'
import { theme } from './src/theme';
import { queryClient } from './src/utils';
import App from './src';

const Main = () => (
  <Provider theme={theme}>
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SafeAreaProvider>
  </Provider>
);

export default Main;

//export {default} from './storybook';
