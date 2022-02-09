import { useState, useEffect } from "react";
import { API } from "api/";
import { useLocalStorage } from ".";

export const useAxios = (urlEndPoint, keys) => {
  const [response, setResponse] = useState(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { getlocalStorage } = useLocalStorage(response);

  const fetchData = async (endPoint) => {
    try {
      const result = await API.get(endPoint);
      result?.data && setResponse(result.data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const includesAll = (array1, array2) =>
    array1.every((r) => array2.includes(r));
  useEffect(() => {
    if (!includesAll(keys, Object.keys(localStorage))) {
      fetchData(urlEndPoint);
    } else {
      setResponse(localStorage);
    }
  }, []);

  return { response, error, loading, getlocalStorage };
};
