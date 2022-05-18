import React from "react";
import { useQuery, UseQueryResult } from "react-query";
import { combinePromises } from "./combine-promises";
import { Components } from "./server";
import { useApi } from "./use-fetch";

type CoreData = {
  categories: Components.Schemas.Category[];
  subcategories: Components.Schemas.Subcategory[];
  tasks: Components.Schemas.Task[];
  assessmentTypes: Components.Schemas.AssessmentType[];
};

type Category = Omit<Components.Schemas.Category, 'subcategories'> & {
  subcategories: Components.Schemas.Subcategory[];
};

type Subcategory = Omit<Components.Schemas.Subcategory, 'tasks'> & {
  tasks: Components.Schemas.Task[];
};

type Task = Components.Schemas.Task;

const CoreDataContext = React.createContext<UseQueryResult<CoreData>>(null as any);

export const ProvideCoreData: React.FC = React.memo(
  function ProvideCoreData({ children }) {
    const { authClient } = useApi();
    const result = useQuery('core', async () => {
      const data = {
        categories: authClient.listCategorys().then(x => x.data.results || []),
        subcategories: authClient.listSubcategorys().then(x => x.data.results || []),
        tasks: authClient.listTasks().then(x => x.data.results || []),
        assessmentTypes: authClient.listAssessmentTypes().then(x => x.data.results || []),
      };
      return combinePromises(data);
    }, {
      staleTime: Infinity
    });
    return <CoreDataContext.Provider value={result}>{children}</CoreDataContext.Provider>;
  }
);

export const useCoreData = () => {
  const data = React.useContext(CoreDataContext);
  if (data === null) {
    throw new Error('You must use `useCoreData` from inside a provider');
  }
  return data;
}

export const useCategory = (id: number): Category | null => {
  const { data } = useCoreData();
  const category = data?.categories?.find(x => x.id === id);
  if (!category) {
    return null;
  }
  return {
    ...category,
    subcategories: data?.subcategories?.filter(x => category?.subcategories.includes(x.id!!)) || [],
  };
}

export const useSubcategory = (id: number): Subcategory | null => {
  const { data } = useCoreData();
  const subcategory = data?.subcategories?.find(x => x.id === id);
  if (!subcategory) {
    return null;
  }
  return {
    ...subcategory,
    tasks: data?.tasks?.filter(x => x.subcategory === id) || [],
  };
}

export const useTask = (id: number): Task | null => {
  const { data } = useCoreData();
  const task = data?.tasks?.find(x => x.id === id);
  if (!task) {
    return null;
  }
  return task;
}
