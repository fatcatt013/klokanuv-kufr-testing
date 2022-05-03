import { useMutation, useQuery } from "react-query";
import { Assessment, Category } from "./types";
import { useAuth } from "./use-auth";
import { fetcher, queryClient } from "./utils";

export function useGlobalState() {
  const { userId } = useAuth();

  const { data: categories } = useQuery('categories', async () => {
    const response = await fetcher.get<Category[]>('/categories/')
    return response.data;
  });

  const { data: assessments } = useQuery('assessments', async () => {
    const response = await fetcher.get<Assessment[]>('/assessments/');
    return response.data;
  }, {
    enabled: !!userId,
  });

  const { mutate: createAssessment } = useMutation(async (x: Assessment) => {
    return fetcher.post('/assessments/', x)
  }, {
    onSuccess: () => queryClient.invalidateQueries('assessments'),
  });

  return { categories, assessments, createAssessment };
}
