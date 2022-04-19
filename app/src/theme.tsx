import { DefaultTheme } from 'react-native-paper';

const colors = {
  orange: '#eb803f',
  red: '#e04221',
  blue: '#006bcc',
  green: '#91c861',
  yellow: '#e7a91e',
};

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
    primary: colors.blue,
    secondary: colors.orange,
    error: colors.red,
  },
};
