import { SvgProps } from 'react-native-svg';
import Hra from './Hra';
import Motorika from './Motorika';
import OrientaceVCase from './OrientaceVCase';
import OrientaceVProstoru from './OrientaceVProstoru';
import Rec from './Rec';
import Sebeobsluha from './Sebeobsluha';
import SluchoveVnimaniAPamet from './SluchoveVnimaniAPamet';
import SocialniDovednosti from './SocialniDovednosti';
import ZakladniMatematickePredstavy from './ZakladniMatematickePredstavy';
import ZrakoveVnimaniAPamet from './ZrakoveVnimaniAPamet';

export const icons: { [k: string]: (p: SvgProps) => JSX.Element } = {
  "Vnímání času": OrientaceVCase,
  "Vnímání prostoru": OrientaceVProstoru,

  "Sluchové vnímání a paměť": SluchoveVnimaniAPamet,
  "Řeč": Rec,
  "Základní matematické představy": ZakladniMatematickePredstavy,

  "Hra": Hra,
  "Sociální dovednosti": SocialniDovednosti,
  "Sebeobsluha-samostatnost": Sebeobsluha,

  "Hrubá motorika, grafomotorika a kresba": Motorika,
  "Zrakové vnímání a paměť": ZrakoveVnimaniAPamet,
};
