import { createStackNavigator } from '@react-navigation/stack';

export type RootStackParamList = {
  Profile: undefined;

  ClassSelect: undefined;
  Class: { classId: number; };
  ClassAssessmentList: { classId: number; taskId: number; };

  Child: { childId: number; };

  TaskList: { categoryId: number; };
  Task: { taskId: number; };

  CreateAssessment: undefined;
  CreateNoteChild: { childId: number; };
  CreateNoteClass: { classId: number; };
  Assessment: { assessmentId: number; };

  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export const RootStack = createStackNavigator<RootStackParamList>();
