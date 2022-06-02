import React from "react";
import { useState, createContext } from "react";

export const DataContext = createContext();
export const DataRangeContext = createContext();

export const DataProvider = ({ children }) => {
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [width, setwidth] = useState(300);
  const [currency, setcurrency] = useState("€");
  const [axis, setaxis] = useState("x");
  const [decimals, setdecimals] = useState(0);
  return (
    <DataContext.Provider
      value={{
        min,
        setMin,
        max,
        setMax,
        width,
        setwidth,
        currency,
        setcurrency,
        axis,
        setaxis,
        decimals,
        setdecimals,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const DataRangeProvider = ({ children }) => {
  const [min, setMin] = useState();
  const [max, setMax] = useState();
  const [width, setwidth] = useState(300);
  const [currency, setcurrency] = useState("€");
  const [axis, setaxis] = useState("x");
  const [readOnly, setreadOnly] = useState(true);
  const [rangeVal, setRangeVal] = useState(null);
  return (
    <DataRangeContext.Provider
      value={{
        min,
        setMin,
        max,
        setMax,
        width,
        setwidth,
        currency,
        setcurrency,
        axis,
        setaxis,
        readOnly,
        setreadOnly,
        rangeVal,
        setRangeVal,
      }}
    >
      {children}
    </DataRangeContext.Provider>
  );
};
