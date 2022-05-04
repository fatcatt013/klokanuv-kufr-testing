import React from 'react';
import { useQuery } from 'react-query';
import { LoadingScreen } from '../components/LoadingScreen';
import { fetcher } from '../utils';

export default function TasksList() {
  const { data } = useQuery('tasks', () => fetcher.get('/tasks'));
  console.log(data);

  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </React.Suspense>
  );
}
