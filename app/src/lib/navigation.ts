import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
  About: undefined;

  ClassList: undefined;
  Class: { classId: number; };
  Child: { childId: number; };

  ClassCategory: { classId: number; categoryId: number; };
  ClassTask: { classId: number; taskId: number; };

  ChildCategory: { childId: number; categoryId: number; };
  ChildTask: { childId: number; taskId: number; };

  CreateAssessment: {
    classId?: number;
    childIds?: number[];
    categoryId?: number;
    subcategoryId?: number;
    taskIds?: number[];
  };
  Assessment: { assessmentId: number; };

  ForgotPassword: undefined;
  Login: undefined;
  Profile: undefined;
  Register: undefined;
};

export const RootStack = createStackNavigator<RootStackParamList>();
