import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { QueryClient } from 'react-query'
import { persistQueryClient } from 'react-query/persistQueryClient-experimental'
import { createAsyncStoragePersistor } from 'react-query/createAsyncStoragePersistor-experimental'

export const fetcher = axios.create({
  baseURL: 'https://klokan.zarybnicky.com/',
  timeout: 10000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // suspense: true,
    },
  },
});

persistQueryClient({
  queryClient,
  persistor: createAsyncStoragePersistor({
    storage: AsyncStorage
  }),
})

export const emailValidator = (email: string) => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email cannot be empty.';
  if (!re.test(email)) return 'Ooops! We need a valid email address.';

  return '';
};

export const passwordValidator = (password: string) => {
  if (!password || password.length <= 0) return 'Password cannot be empty.';

  return '';
};

export const nameValidator = (name: string) => {
  if (!name || name.length <= 0) return 'Name cannot be empty.';

  return '';
};
