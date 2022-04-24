import { DefaultTheme } from 'react-native-paper';

const colors = {
  orange: '#eb803f',
  red: '#e04221',
  blue: '#006bcc',
  light_blue: '#92caff',
  green: '#91c861',
  yellow: '#e7a91e',
  grey: '#7a7a7a',
};

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
    primary: colors.orange,
    secondary: colors.blue,
    error: colors.red,
  },
};
