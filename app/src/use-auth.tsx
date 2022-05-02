import React from 'react';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

export function useAuth() {
  const [value, setValue] = React.useState({});
  const { getItem, setItem } = useAsyncStorage('@storage_key');

  React.useEffect(() => {
    (async () => {
      setValue(JSON.parse(await getItem() || '{}'));
    })();
  }, []);

  const writeItemToStorage = async (newValue) => {
    await setItem(JSON.stringify(newValue));
    setValue(newValue);
  };

  return {
    isSignedIn: true,
    classId: 1,
  }
}
