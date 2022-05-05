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
  "Hra": Hra,
  "Hrubá motorika, grafomotorika a kresba": Motorika,
  "Vnímání času": OrientaceVCase,
  "Vnímání prostoru": OrientaceVProstoru,
  "Řeč": Rec,
  "Sebeobsluha-samostatnost": Sebeobsluha,
  "Sluchové vnímání a paměť": SluchoveVnimaniAPamet,
  "Sociální dovednosti": SocialniDovednosti,
  "Základní matematické představy": ZakladniMatematickePredstavy,
  "Zrakové vnímání a paměť": ZrakoveVnimaniAPamet,

  "Soustředení na hru": Hra,
};
