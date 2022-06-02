import React from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import { combinePromises } from './combine-promises';
import { Components } from './server';
import { useApi } from './use-fetch';

type CoreData = {
  categories: Components.Schemas.Category[];
  subcategories: Components.Schemas.Subcategory[];
  tasks: Components.Schemas.Task[];
  assessmentTypes: Components.Schemas.AssessmentType[];
};

type Subcategory = Omit<Components.Schemas.Subcategory, 'tasks'> & {
  tasks: Components.Schemas.Task[];
};

type Category = Omit<Components.Schemas.Category, 'subcategories'> & {
  subcategories: (Components.Schemas.Subcategory & {
    data: Task[];
  })[];
};

type Task = Components.Schemas.Task;

const CoreDataContext = React.createContext<UseQueryResult<CoreData>>(null as any);

export const ProvideCoreData: React.FC = React.memo(
  function ProvideCoreData({ children }) {
    const { authAxios, authEnabled } = useApi();
    const result = useQuery('core', async () => {
      const data = {
        categories: authAxios.get('/categories/').then(x => x.data as any),
        subcategories: authAxios.get('/subcategories/').then(x => x.data as any),
        tasks: authAxios.get('/tasks/').then(x => x.data as any),
        assessmentTypes: authAxios.get('/assessment-types/').then(x => x.data as any),
      };
      return combinePromises(data);
    }, {
      staleTime: Infinity,
      cacheTime: Infinity,
      enabled: authEnabled,
    });
    return <CoreDataContext.Provider value={result}>{children}</CoreDataContext.Provider>;
  },
);

export const useCoreData = () => {
  const data = React.useContext(CoreDataContext);
  if (data === null) {
    throw new Error('You must use `useCoreData` from inside a provider');
  }
  return data;
};

export const useCategory = (id: number): Category | null => {
  const { data } = useCoreData();
  const category = data?.categories?.find(x => x.id === id);
  if (!category) {
    return null;
  }
  return {
    ...category,
    subcategories: (data?.subcategories?.filter(x => category?.subcategories.includes(x.id!)) || []).map(x => ({
      ...x,
      data: data?.tasks?.filter(x => x.subcategory === id) || [],
    })),
  };
};

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
};

export const useTask = (id: number): Task | null => {
  const { data } = useCoreData();
  const task = data?.tasks?.find(x => x.id === id);
  if (!task) {
    return null;
  }
  return task;
};

export const useAssessmentType = (id: number): Components.Schemas.AssessmentType | null => {
  const { data } = useCoreData();
  const assessmentType = data?.assessmentTypes?.find(x => x.id === id);
  if (!assessmentType) {
    return null;
  }
  return assessmentType;
};
