import React, { useState, useEffect, useContext } from "react";
import { DataRangeContext } from "context";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Range, Loading } from "components/";
import { API_ENDPOINT_RANGE_VALUES } from "api/";
import { useFetch } from "hooks/";
import Header from "./Header";

export const Exercise2 = () => {
  const {
    min,
    setMin,
    max,
    setMax,
    currency,
    width,
    axis,
    readOnly,
    rangeVal,
    setRangeVal,
  } = useContext(DataRangeContext);

  const [t] = useTranslation("global");

  const { getlocalStorage } = useFetch(API_ENDPOINT_RANGE_VALUES, [
    "rangeValues",
  ]);

  useEffect(() => {
    if (getlocalStorage) {
      let rangeValues = getlocalStorage?.rangeValues;
      rangeValues = rangeValues.split(",").map((element) => Number(element));
      let minValue = rangeValues[0];
      let maxValue = rangeValues.slice(-1)[0];

      setMin(minValue);
      setMax(maxValue);
      setRangeVal(rangeValues);
    }
  }, [getlocalStorage]);

  return (
    <>
      <Header aria-label={t("header.exercise-2")}>
        {t("header.exercise-2")}
      </Header>
      <nav>
        <Link to="/" aria-label={t("nav.back-to-home")}>
          {t("nav.back-to-home")}
        </Link>
      </nav>
      {min && max && rangeVal && width ? (
        <Range
          min={min}
          max={max}
          width={width}
          currencyType={currency}
          axis={axis}
          readOnly={readOnly}
          rangeVal={rangeVal}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};
