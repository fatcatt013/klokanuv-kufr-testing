import React from 'react';
import * as Keychain from 'react-native-keychain';

interface AuthContextState {
  initializing: boolean;
  authenticated: boolean | null;
  accessToken: string | null;
  refreshToken: string | null;
}

export interface AuthContextType extends AuthContextState {
  logIn: (args: { accessToken: string; refreshToken: string; }) => Promise<void>;
  logOut: () => Promise<void>;
  getAccessToken: () => string | null;
  updateAccessToken: (refreshToken: string) => Promise<void>;
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
    accessToken: null,
    refreshToken: null,
    authenticated: null,
    initializing: true,
  });

  React.useEffect(() => {
    (async () => {
      try {
        const value = await Keychain.getGenericPassword();
        const jwt = JSON.parse(value ? value.password : '{}');

        setAuthState({
          accessToken: jwt.accessToken || null,
          refreshToken: jwt.refreshToken || null,
          authenticated: jwt.accessToken !== null,
          initializing: false,
        });
      } catch (error) {
        console.log(`Keychain Error: ${error.message}`);
        setAuthState({
          accessToken: null,
          refreshToken: null,
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
        accessToken: null,
        refreshToken: null,
        authenticated: false,
        initializing: false,
      });
    },
    async updateAccessToken(accessToken: string) {
      setAuthState({ ...authState, accessToken });
      await Keychain.setGenericPassword(
        'token',
        JSON.stringify({
          accessToken,
          refreshToken: authState.refreshToken,
        }),
      );
    },
    getAccessToken() {
      return authState.accessToken;
    }
  };
  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
