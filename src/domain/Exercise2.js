import React from "react";
import { Link } from "react-router-dom";
import { Range, Loading } from "../components";
import { API, API_RANGE_VALUES } from "../../api";
import { useState, useEffect } from "react";

export const Exercise2 = () => {
  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);
  const [rangeVal, setRangeVal] = useState(null);

  useEffect(() => {
     if (
      localStorage.getItem("min2") === null ||
      localStorage.getItem("max2") === null ||
      localStorage.getItem("rangeVal") === null
    ) {
      API.get(API_RANGE_VALUES).then(res => {
        let rangeValues = res?.data?.rangeValues;
        setMin(rangeValues[0]);
        setMax(rangeValues[rangeValues.length - 1]);
        setRangeVal(rangeValues);

        localStorage.setItem("min2", rangeValues[0]);
        localStorage.setItem("max2", rangeValues[rangeValues.length - 1]);
        localStorage.setItem("rangeVal", rangeValues);
      });
    } else {
      setMin(Number(localStorage.getItem("min2")));
      setMax(Number(localStorage.getItem("max2")));
      let arrayRangeVal = localStorage
        .getItem("rangeVal")
        .split(",")
        .map((iNum) => Number(iNum));
      setRangeVal(arrayRangeVal);
    }
  }, []);

  return (
    <>
      <header>
        <h2>Exercise 2</h2>
      </header>
      <nav>
        <Link to="/">Back to Home</Link>
      </nav>
      {min && max && rangeVal?.length ? (
        <Range
          min={min}
          max={max}
          longRange={300}
          currencyType="€"
          fixed={2}
          grid={[300/(rangeVal.length-1), 0]}
          readOnly={true}
          rangeVal={rangeVal}
        />
      ) : (
        <Loading text="Range is loading..." />
      )}
    </>
  );
};