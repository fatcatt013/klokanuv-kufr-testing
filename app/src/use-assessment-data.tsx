import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { Components } from "./server";
import { useApi } from "./use-fetch";
import { queryClient } from "./utils";

type AssessmentData = {
  assessments?: UseQueryResult<Components.Schemas.Assessment[]>;
  classNotes?: UseQueryResult<Components.Schemas.ClassroomNote[]>;
  childNotes?: UseQueryResult<Components.Schemas.ChildNote[]>;
};

const AssessmentDataContext = React.createContext<AssessmentData>(null as any);

export const ProvideAssessmentData: React.FC = React.memo(
  function ProvideAssessmentData({ children }) {
    const { authClient } = useApi();
    const assessments = useQuery('assessments', () => (
      authClient.listAssessments().then(x => x.data.results || [])
    ), {
      staleTime: 60 * 60 * 1000,
    });
    const classNotes = useQuery('classNotes', () => (
      authClient.listClassroomNotes().then(x => x.data.results || [])
    ), {
      staleTime: 60 * 60 * 1000,
    });
    const childNotes = useQuery('childNotes', () => (
      authClient.listChildNotes().then(x => x.data.results || [])
    ), {
      staleTime: 60 * 60 * 1000,
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

export const useChildNotes = (id: number): [
  Components.Schemas.ChildNote[] | null,
  (note: string) => Promise<void>
] => {
  const { childNotes } = useAssessmentData();
  const { authClient } = useApi();
  return [
    childNotes?.data?.filter(x => x.child === id) || null,
    async (note: string) => {
      await authClient.createChildNote(null, { child: id, note });
      await queryClient.invalidateQueries('childNotes');
    },
  ];
};
