export interface Category {
  id: number;
  label: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: number;
  label: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  assessment_type: AssessmentType;
  codename: string;
  task_description: string;
  difficulty: TaskDifficulty;
  expected_age_from: string;
  expected_age_to: string;
  parent_task: string | null;
  subcategory: number;
}

export type TaskDifficulty
  = '+'
  | '='
  | '-'
  | null;

export interface AssessmentType {
  id: number;
  label: string;
  allows_note: boolean;
  options: AssessmentTypeOption[];
}

export interface AssessmentTypeOption {
  id: number;
  label: string;
}

export interface Assessment {
  id: number;
  childId: number;
  task: number;
  option: number;
  date_of_assessment: string;
  note: string;
}

export interface Class {
  id: number;
  name: string;
}

export interface Child {
  id: number;
  classId: number;
  name: string;
  yearOfBirth: number;
}
