import React from 'react';
import { Platform } from 'react-native';
import * as Keychain from 'react-native-keychain';

let storage = {
  get: Keychain.getGenericPassword as () => Promise<false | Keychain.UserCredentials>,
  set: Keychain.setGenericPassword as (u: string, p: string) => Promise<false>,
  reset: Keychain.resetGenericPassword as () => Promise<false>
}
if (Platform.OS === 'web') {
  storage = {
    async get() {
      const tokens = localStorage.getItem('tokens');
      return tokens ? { username: 'token', password: tokens, service: '', storage: '' } : false;
    },
    async set(user, tokens) {
      localStorage.setItem('tokens', tokens);
      return false
    },
    async reset() {
      localStorage.removeItem('tokens');
      return false;
    }
  }
}

interface AuthContextState {
  initializing: boolean;
  authenticated: boolean | null;
  access: string | null;
  refresh: string | null;
}

export interface AuthContextType extends AuthContextState {
  logIn: (args: { access: string; refresh: string; }) => Promise<void>;
  logOut: () => Promise<void>;
  getAccessToken: () => string | null;
  updateAccessToken: (refresh: string) => Promise<void>;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error("You cannot use `useAuth` outside of an AuthContext");
  }
  return context;
};

export const AuthProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = React.useState<AuthContextState>({
    access: null,
    refresh: null,
    authenticated: null,
    initializing: true,
  });

  React.useEffect(() => {
    (async () => {
      try {
        const value = await storage.get();
        const jwt = JSON.parse(value ? value.password : '');

        setAuthState({
          access: jwt.access || null,
          refresh: jwt.refresh || null,
          authenticated: jwt.access !== null,
          initializing: false,
        });
      } catch (error) {
        console.log(`Keychain Error: ${error.message}`);
        setAuthState({
          access: null,
          refresh: null,
          authenticated: false,
          initializing: false,
        });
      }
    })()
  }, []);

  const context: AuthContextType = {
    ...authState,
    async logIn(tokens) {
      setAuthState({ ...tokens, authenticated: true, initializing: false });
      await storage.set('token', JSON.stringify(tokens));
    },
    async logOut() {
      await storage.reset();
      setAuthState({
        access: null,
        refresh: null,
        authenticated: false,
        initializing: false,
      });
    },
    async updateAccessToken(access: string) {
      setAuthState({ ...authState, access });
      await storage.set('token', JSON.stringify({
        access,
        refresh: authState.refresh,
      }));
    },
    getAccessToken() {
      return authState.access;
    }
  };
  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
