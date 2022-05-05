import { useRecoilState } from 'recoil';
import { authState } from './store';

export function useAuth() {
  const [auth, setAuth] = useRecoilState(authState);

  return {
    isSignedIn: auth.signedIn,
    classId: 1,
    userId: 1,
    signIn: () => setAuth({ ...auth, signedIn: true }),
    signOut: () => setAuth({ ...auth, signedIn: false }),
  }
}
