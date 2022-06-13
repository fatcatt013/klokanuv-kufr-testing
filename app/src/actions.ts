import { useSetRecoilState } from 'recoil';
import {
  allChildNotesState,
  allClassNotesState,
  assessmentsState,
  assessmentTypesState,
  categoriesState,
  childrenState,
  classesState,
  schoolState,
  subcategoriesState,
  tasksState,
  usersState,
} from './store';
import { useApi } from './use-fetch';
import { Components } from "./server";

export const useFetchers = () => {
  const { authAxios } = useApi();
  const setCategories = useSetRecoilState(categoriesState);
  const setSubcategories = useSetRecoilState(subcategoriesState);
  const setTasks = useSetRecoilState(tasksState);
  const setAssessmentTypes = useSetRecoilState(assessmentTypesState);
  const setSchool = useSetRecoilState(schoolState);
  const setUsers = useSetRecoilState(usersState);
  const setClasses = useSetRecoilState(classesState);
  const setChildren = useSetRecoilState(childrenState);
  const setAssessments = useSetRecoilState(assessmentsState);
  const setAllChildNotes = useSetRecoilState(allChildNotesState);
  const setAllClassNotes = useSetRecoilState(allClassNotesState);

  return {
    async fetchCategories() {
      setCategories(await authAxios.get('/categories/').then(x => x.data as any || []));
    },
    async fetchSubcategories() {
      setSubcategories(await authAxios.get('/subcategories/').then(x => x.data as any || []));
    },
    async fetchTasks() {
      setTasks(await authAxios.get('/tasks/').then(x => x.data as any || []));
    },
    async fetchAssessmentTypes() {
      setAssessmentTypes(await authAxios.get('/assessment-types/').then(x => x.data as any || []));
    },

    async fetchSchool() {
      setSchool(await authAxios.get('/school/').then(x => x.data as any || []));
    },
    async fetchUsers() {
      setUsers(await authAxios.get('/user/').then(x => x.data as any || []));
    },
    async fetchClasses() {
      setClasses(await authAxios.get('/classes/').then(x => x.data as any || []));
    },
    async fetchChildren() {
      setChildren(await authAxios.get('/children/').then(x => x.data as any || []));
    },

    async fetchAssessments() {
      setAssessments(await authAxios.get('/assessments/').then(x => x.data as any || []));
    },
    async fetchAllChildNotes() {
      setAllChildNotes(await authAxios.get('/child-notes/').then(x => x.data as any || []));
    },
    async fetchAllClassNotes() {
      setAllClassNotes(await authAxios.get('/class-notes/').then(x => x.data as any || []));
    },
  };
};

export const useChildNoteOps = () => {
  const { authAxios } = useApi();
  const setData = useSetRecoilState(allChildNotesState);
  return {
    async addChildNote(child: number, note: string) {
      const { data } = await authAxios.post('/child-notes/', { child, note });
      setData(xs => [...xs, data]);
    },
    async editChildNote(noteId: number, child: number, note: string) {
      const { data } = await authAxios.put(`/child-notes/${noteId}`, { child, note });
      setData(xs => xs.map(x => x.id! === noteId ? data : x));
    },
    async deleteChildNote(noteId: number) {
      await authAxios.delete(`/child-notes/${noteId}`);
      setData(xs => xs.filter(x => x.id! !== noteId));
    },
  };
};

export const useClassroomNoteOps = () => {
  const { authAxios } = useApi();
  const setData = useSetRecoilState(allClassNotesState);
  return {
    async addClassroomNote(classroom: number, note: string) {
      const { data } = await authAxios.post('/class-notes/', { classroom, note });
      setData(xs => [...xs, data]);
    },
    async editClassroomNote(noteId: number, classroom: number, note: string) {
      const { data } = await authAxios.put(`/class-notes/${noteId}`, { classroom, note });
      setData(xs => xs.map(x => x.id! === noteId ? data : x));
    },
    async deleteClassroomNote(noteId: number) {
      await authAxios.delete(`/class-notes/${noteId}`);
      setData(xs => xs.filter(x => x.id! !== noteId));
    },
  };
};

export const useAssessmentOps = () => {
  const { authAxios } = useApi();
  const setData = useSetRecoilState(assessmentsState);
  return {
    async addAssessment(assessment: Components.Schemas.Assessment) {
      const { data } = await authAxios.post('/assessments/', assessment);
      setData(xs => [...xs, data]);
    },
    async editAssessment(assessmentId: number, assessment: Components.Schemas.Assessment) {
      const { data } = await authAxios.put(`/assessments/${assessmentId}`, assessment);
      setData(xs => xs.map(x => x.id! === assessmentId ? data : x));
    },
    async deleteAssessment(assessmentId: number) {
      await authAxios.delete(`/assessments/${assessmentId}`);
      setData(xs => xs.filter(x => x.id! !== assessmentId));
    },
  };
};