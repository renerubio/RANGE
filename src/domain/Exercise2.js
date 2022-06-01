import React from "react";
import { Link } from "react-router-dom";
import { Range, Loading } from "components/";
import { API_ENDPOINT_RANGE_VALUES } from "api/";
import { useState, useEffect } from "react";
import { useFetch } from "hooks/";
import Header from "./Header";

export const Exercise2 = (props) => {
  const { currency, width, axis, readOnly, t } = props;

  const [min, setMin] = useState();
  const [max, setMax] = useState();

  const [rangeVal, setRangeVal] = useState(null);

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
