import React from "react";
import { Link } from "react-router-dom";
import { Range, Loading } from "@components/";
import { API, API_RANGE_VALUES } from "@api/";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAxios } from "@hooks/";

export const Exercise2 = () => {
  const [t] = useTranslation("global");

  const [min, setMin] = useState();
  const [max, setMax] = useState();

  const [rangeVal, setRangeVal] = useState(null);
  const width = 300;

  const { getlocalStorage } = useAxios(API_RANGE_VALUES,["rangeValues"]);

  useEffect(() => {
    if (getlocalStorage) {
      let rangeValues = getlocalStorage?.rangeValues;
      rangeValues = rangeValues.split(",").map((element) => Number(element));
      let minValue = rangeValues[0];
      let maxValue = rangeValues[rangeValues.length - 1];
      
      setMin(minValue);
      setMax(maxValue);
      setRangeVal(rangeValues);
    }
  }, [getlocalStorage]);

  return (
    <>
      <header>
        <h2 data-cy="title-exercise2" aria-label={t("header.exercise-2")}>
          {t("header.exercise-2")}
        </h2>
      </header>
      <nav>
        <Link data-cy="back-to-home" to="/" aria-label={t("nav.back-to-home")}>
          {t("nav.back-to-home")}
        </Link>
      </nav>
      {min && max && rangeVal && width ? (
        <Range
          min={min}
          max={max}
          width={width}
          currencyType="€"
          readOnly={true}
          rangeVal={rangeVal}
          decimals={2}
          axis="x"
        />
      ) : (
        <Loading text={t("loading")} />
      )}
    </>
  );
};
