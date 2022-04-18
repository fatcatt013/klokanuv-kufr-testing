import * as React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';
import { Provider } from 'react-native-paper';
import { theme } from './src/theme';
import App from './src';

const Main = () => (
  <Provider theme={theme}>
    <SafeAreaProvider>
      <App />
    </SafeAreaProvider>
  </Provider>
);

export default Main;

//export {default} from './storybook';
