import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ClassSelect: undefined;
  Class: { classId: number; };
  Child: { classId: number; childId: number; };
  Categories: undefined;
  Tasks: { categoryId: number; };
  Profile: undefined;
};

export const RootStack = createStackNavigator<RootStackParamList>();
