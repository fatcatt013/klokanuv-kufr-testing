import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { Components } from "./server";
import { useApi } from "./use-fetch";
import { useSchoolData } from "./use-school-data";
import { queryClient } from "./utils";

type AssessmentData = {
  assessments?: UseQueryResult<Components.Schemas.Assessment[]>;
  classNotes?: UseQueryResult<Components.Schemas.ClassroomNote[]>;
  childNotes?: UseQueryResult<Components.Schemas.ChildNote[]>;
};

const AssessmentDataContext = React.createContext<AssessmentData>(null as any);

export const ProvideAssessmentData: React.FC = React.memo(
  function ProvideAssessmentData({ children }) {
    const { authAxios, authEnabled } = useApi();
    const assessments = useQuery('assessments', () => (
      authAxios.get('/assessments/').then(x => x.data as any || [])
    ), {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: authEnabled,
    });
    const classNotes = useQuery('classNotes', () => (
      authAxios.get('/class-notes/').then(x => x.data as any || [])
    ), {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: authEnabled,
    });
    const childNotes = useQuery('childNotes', () => (
      authAxios.get('/child-notes/').then(x => x.data as any || [])
    ), {
      staleTime: 60 * 60 * 1000,
      cacheTime: Infinity,
      enabled: authEnabled,
    });
    return <AssessmentDataContext.Provider value={{
      assessments, classNotes, childNotes
    }}>{children}</AssessmentDataContext.Provider>;
  }
);

export const useAssessmentData = () => {
  const data = React.useContext(AssessmentDataContext);
  if (data === null) {
    throw new Error('You must use `useAssessmentData` from inside a provider');
  }
  return data;
}

export const useChildNotes = (id: number): Components.Schemas.ChildNote[] | null => {
  const { childNotes } = useAssessmentData();
  return childNotes?.data?.filter(x => x.child === id) || null;
};

export const useChildNoteOps = () => {
  const { authAxios } = useApi();
  return {
    async addChildNote(child: number, note: string) {
      await authAxios.post('/child-notes/', { child, note });
      await queryClient.invalidateQueries('childNotes');
    },
    async editChildNote(noteId: number, child: number, note: string) {
      await authAxios.put(`/child-notes/${noteId}`, { child, note });
      await queryClient.invalidateQueries('childNotes');
    },
    async deleteChildNote(noteId: number) {
      await authAxios.delete(`/child-notes/${noteId}`);
      await queryClient.invalidateQueries('childNotes');
    },
  };
};

export const useClassNotes = (id: number): Components.Schemas.ClassroomNote[] | null => {
  const { classNotes } = useAssessmentData();
  return classNotes?.data?.filter(x => x.classroom === id) || null;
};

export const useClassroomNoteOps = () => {
  const { authAxios } = useApi();
  return {
    async addClassroomNote(classroom: number, note: string) {
      await authAxios.post('/class-notes/', { classroom, note });
      await queryClient.invalidateQueries('classNotes');
    },
    async editClassroomNote(noteId: number, classroom: number, note: string) {
      await authAxios.put(`/class-notes/${noteId}`, { classroom, note });
      await queryClient.invalidateQueries('classNotes');
    },
    async deleteClassroomNote(noteId: number) {
      await authAxios.delete(`/class-notes/${noteId}`);
      await queryClient.invalidateQueries('classNotes');
    },
  };
};

export const useChildAssessments = (id: number): Components.Schemas.Assessment[] | null => {
  const { assessments } = useAssessmentData();
  return assessments?.data?.filter(x => x.child === id) || null;
};

export const useClassAssessments = (id: number): Components.Schemas.Assessment[] | null => {
  const { data } = useSchoolData();
  const { assessments } = useAssessmentData();
  const children = data?.classes?.find(x => x.id === id)?.children || [];
  return assessments?.data?.filter(x => children.includes(x.child)) || null;
};

export const useAssessmentOps = () => {
  const { authAxios } = useApi();
  return {
    async addAssessment(data: Components.Schemas.Assessment) {
      await authAxios.post('/assessments/', data);
      await queryClient.invalidateQueries('assessments');
    },
    async editAssessment(assessmentId: number, data: Components.Schemas.Assessment) {
      await authAxios.put(`/assessments/${assessmentId}`, data);
      await queryClient.invalidateQueries('assessments');
    },
    async deleteAssessment(assessmentId: number) {
      await authAxios.delete(`/assessments/${assessmentId}`);
      await queryClient.invalidateQueries('assessments');
    },
  };
};
