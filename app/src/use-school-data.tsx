import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { combinePromises } from "./combine-promises";
import { Components } from "./server";
import { useApi } from "./use-fetch";

type SchoolData = {
  school?: Components.Schemas.School[];
  users?: Components.Schemas.User[];
  classes?: Components.Schemas.Classroom[];
  children?: Components.Schemas.Child[];
};

type Class = Omit<Components.Schemas.Classroom, 'children'> & {
  children: Components.Schemas.Child[];
};

const SchoolDataContext = React.createContext<UseQueryResult<SchoolData>>(null as any);

export const ProvideSchoolData: React.FC = React.memo(
  function ProvideSchoolData({ children }) {
    const { authAxios, authEnabled } = useApi();
    const result = useQuery('school', async () => {
      const data = {
        school: authAxios.get('/school/').then(x => x.data as any),
        users: authAxios.get('/user/').then(x => x.data as any),
        classes: authAxios.get('/classes/').then(x => x.data as any),
        children: authAxios.get('/children/').then(x => x.data as any),
      };
      return combinePromises(data);
    }, {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: authEnabled,
    });
    return <SchoolDataContext.Provider value={result}>{children}</SchoolDataContext.Provider>;
  }
);

export const useSchoolData = () => {
  const data = React.useContext(SchoolDataContext);
  if (data === null) {
    throw new Error('You must use `useSchoolData` from inside a provider');
  }
  return data;
}

export const useClassrooms = (): Components.Schemas.Classroom[] => {
  const { data } = useSchoolData();
  return data?.classes || [];
}

export const useChildren = (): Components.Schemas.Child[] => {
  const { data } = useSchoolData();
  return data?.children || [];
}

export const useClassroom = (id: number): Class | null => {
  const { data } = useSchoolData();
  const item = data?.classes?.find(x => x.id === id);
  if (!item) {
    return null;
  }
  return {
    ...item,
    children: data?.children?.filter(x => item?.children.includes(x.id!!)) || [],
  };
}

export const useChild = (id: number): Components.Schemas.Child | null => {
  const { data } = useSchoolData();
  const item = data?.children?.find(x => x.id === id);
  if (!item) {
    return null;
  }
  return item;
}
