import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
  Profile: undefined;

  ClassSelect: undefined;
  Class: { classId: number; };
  ClassAssessmentList: { classId: number; taskId: number; };

  Child: { childId: number; };

  Category: { categoryId: number; };
  Subcategory: { subcategoryId: number; };
  Task: { taskId: number; };

  CreateAssessment: { children: number[]; tasks: number[]; };
  CreateNoteChild: { childId: number; };
  CreateNoteClass: { classId: number; };
  Assessment: { assessmentId: number; };

  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export const RootStack = createStackNavigator<RootStackParamList>();
