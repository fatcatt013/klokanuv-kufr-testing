import React from 'react';
import axios, { AxiosInstance } from 'axios';
import { useAuth } from './use-auth';
import createAuthRefreshInterceptor from 'axios-auth-refresh';

interface FetchContextType {
  publicApi: AxiosInstance,
  authApi: AxiosInstance,
}

const FetchContext = React.createContext<FetchContextType | null>(null);

export const FetchProvider: React.FC = ({ children }) => {
  const { getAccessToken, refreshToken, logOut, updateAccessToken } = useAuth();

  const publicApi = axios.create({
    baseURL: 'https://klokan.zarybnicky.com/',
    timeout: 10000,
  });

  const authApi = axios.create({
    baseURL: 'https://klokan.zarybnicky.com/',
    timeout: 10000,
  });

  authApi.interceptors.request.use((config) => {
    if (config.headers && !config.headers?.Authorization) {
      config.headers.Authorization = `Bearer ${getAccessToken()}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  createAuthRefreshInterceptor(authApi, async (failedRequest: any) => {
    try {
      const tokenRefreshResponse = await axios({
        method: 'POST',
        data: { refreshToken },
        url: 'http://localhost:3000/api/refreshToken',
      })
      const accessToken = tokenRefreshResponse.data.accessToken;
      await updateAccessToken(accessToken);
      failedRequest.response.config.headers.Authorization = `Bearer ${accessToken}`;
    } catch (e) {
      logOut();
    }
  });

  const context = { authApi, publicApi };
  return <FetchContext.Provider value={context}>{children}</FetchContext.Provider>;
};
