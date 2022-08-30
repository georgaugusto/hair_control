import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useEventListener from '../UseEventListener';

type SetValue<Type> = Dispatch<SetStateAction<Type>>;

function parseJSON<Type>(value: string | null): Type | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch (error) {
    console.log('parsing error on', { value });
    return undefined;
  }
}

function useLocalStorage<Type>(
  key: string,
  initialValue: Type,
): [Type, SetValue<any>] {
  const readValue = (): Type => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? (parseJSON(item) as Type) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState<Type>(readValue);

  const setValue: SetValue<Type> = (value) => {
    if (typeof window === 'undefined') {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`,
      );
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  const handleStorageChange = () => {
    setStoredValue(readValue());
  };

  useEventListener('local-storage', handleStorageChange);

  return [storedValue, setValue];
}

export default useLocalStorage;
