import React from 'react';
import { useAuth } from './use-auth';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import OpenAPIClientAxios from 'openapi-client-axios';
import { Client } from './server';
import definition from '../openapi-schema.json';

interface ApiContextType {
  publicClient: Client,
  authClient: Client,
}

const ApiContext = React.createContext<ApiContextType | null>(null);

export const useApi = (): ApiContextType => {
  const context = React.useContext(ApiContext);
  if (context === null) {
    throw new Error("You cannot use `useApi` outside of an AuthContext");
  }
  return context;
};

export const ApiProvider: React.FC = ({ children }) => {
  const { getAccessToken, refresh, logOut, updateAccessToken } = useAuth();

  const publicApi = new OpenAPIClientAxios({
    definition: definition as any,
    withServer: { url: 'https://klokan.zarybnicky.com/' },
  });
  const publicClient = publicApi.initSync<Client>();

  const authApi = new OpenAPIClientAxios({
    definition: definition as any,
    withServer: { url: 'https://klokan.zarybnicky.com/' },
  });
  const authClient = authApi.initSync<Client>();

  authClient.interceptors.request.use((config) => {
    if (config.headers && !config.headers?.Authorization) {
      config.headers.Authorization = `Bearer ${getAccessToken()}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  createAuthRefreshInterceptor(authClient, async (failedRequest: any) => {
    try {
      const response = await publicClient.createTokenRefresh(null, { refresh: refresh as string });
      await updateAccessToken(response.data.access!!);
      failedRequest.response.config.headers.Authorization = `Bearer ${response.data.access}`;
    } catch (e) {
      logOut();
    }
  });

  const context = { authClient, publicClient };
  return <ApiContext.Provider value={context}>{children}</ApiContext.Provider>;
};
