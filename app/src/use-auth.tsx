import React from 'react';
import * as Keychain from 'react-native-keychain';

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
        const value = await Keychain.getGenericPassword();
        const jwt = JSON.parse(value ? value.password : '{}');

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
      await Keychain.setGenericPassword('token', JSON.stringify(tokens));
    },
    async logOut() {
      await Keychain.resetGenericPassword();
      setAuthState({
        access: null,
        refresh: null,
        authenticated: false,
        initializing: false,
      });
    },
    async updateAccessToken(access: string) {
      setAuthState({ ...authState, access });
      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          access,
          refresh: authState.refresh,
        }),
      );
    },
    getAccessToken() {
      return authState.access;
    }
  };
  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
