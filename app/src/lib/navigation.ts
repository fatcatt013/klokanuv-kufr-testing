import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;

  Profile: undefined;
  ClassSelect: undefined;

  Class: { classId: number; };
  ClassAssessmentList: { classId: number; taskId: number; };

  Child: { childId: number; };

  CategoryList: undefined;
  TaskList: { categoryId: number; };
  Task: { taskId: number; };

  CreateAssessment: undefined;
  Assessment: { assessmentId: number; };
};

export const RootStack = createStackNavigator<RootStackParamList>();
