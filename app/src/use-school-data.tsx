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

const SchoolDataContext = React.createContext<UseQueryResult<SchoolData>>(null as any);

export const ProvideSchoolData: React.FC = React.memo(
  function ProvideSchoolData({ children }) {
    const { authClient } = useApi();
    const result = useQuery('school', async () => {
      const data = {
        school: authClient.listSchools().then(x => x.data as any),
        users: authClient.listUsers().then(x => x.data as any),
        classes: authClient.listClassrooms().then(x => x.data as any),
        children: authClient.listChilds().then(x => x.data as any),
      };
      return combinePromises(data);
    }, {
      staleTime: Infinity,
      cacheTime: Infinity,
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
