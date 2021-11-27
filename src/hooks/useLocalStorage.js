
import { useState } from "react";

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(initialValue);

  const setValue = (value) => {
    localStorage.setItem(key, value);
    setStoredValue(value);
  }

  return [storedValue, setValue];
}
  
  export default useLocalStorage;