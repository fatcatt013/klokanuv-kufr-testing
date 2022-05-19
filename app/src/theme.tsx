import { configureFonts, DefaultTheme } from 'react-native-paper';

const colors = {
  orange: '#eb803f',
  red: '#e04221',
  blue: '#006bcc',
  lightBlue: '#92caff',
  green: '#91c861',
  yellow: '#e7a91e',
  grey: '#7a7a7a',
};

const fontConfig: ReactNativePaper.ThemeFonts = {
  regular: {
    fontFamily: 'Poppins-Regular',
    fontWeight: 'normal',
  },
  medium: {
    fontFamily: 'Poppins-Medium',
    fontWeight: 'normal',
  },
  light: {
    fontFamily: 'Poppins-Light',
    fontWeight: 'normal',
  },
  thin: {
    fontFamily: 'Poppins-Thin',
    fontWeight: 'normal',
  },
};

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    ...colors,
    primary: colors.blue,
    error: colors.red,
  } as ReactNativePaper.ThemeColors,
  fonts: configureFonts({ android: fontConfig, ios: fontConfig, web: fontConfig }),
};

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      orange: string;
      red: string;
      blue: string;
      lightBlue: string;
      green: string;
      yellow: string;
      grey: string;
    }
  }
}
