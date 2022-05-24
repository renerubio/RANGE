import React from "react";
import { useState, createContext } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [currency, setcurrency] = useState("€");
  const [width, setwidth] = useState(300);
  const [axis, setaxis] = useState("x");
  const [readOnly, setreadOnly] = useState(true);
  const [decimals, setdecimals] = useState(0);
  return (
    <DataContext.Provider
      value={{
        currency,
        setcurrency,
        width,
        setwidth,
        axis,
        setaxis,
        readOnly,
        setreadOnly,
        decimals,
        setdecimals,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider };

export default DataContext;
