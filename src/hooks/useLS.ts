import { useEffect, useState } from 'react';

function getSavedValue<T>(key: string, defaultValue: T): T {
  // забираем значение из local storage через getItem()
  const savedValue = localStorage.getItem(key);
  return (savedValue !== null ? JSON.parse(savedValue) : defaultValue);
}

function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => getSavedValue(key, initialValue));

  useEffect(() => {
    //записываем значение через метод JSON.stringify(), чтобы хранить в виде строк сложные типы данных
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
