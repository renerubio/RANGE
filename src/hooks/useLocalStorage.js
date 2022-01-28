import { useState, useEffect } from "react";

export const useLocalStorage = (localStorageObject) => {
  const [getlocalStorage, setgetlocalStorage] = useState(null);

  const setLocalStorageByObject = () => {
    Object.entries(localStorageObject).map((currentValue) => {
      localStorage.setItem(currentValue[0], currentValue[1]);
    });
  };

  useEffect(() => {
    if (typeof localStorageObject === "object") {
      setLocalStorageByObject();
      setgetlocalStorage(localStorage);
    }
  }, [localStorageObject, getlocalStorage]);

  return { getlocalStorage, localStorageObject };
};
