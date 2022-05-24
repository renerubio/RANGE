import React from "react";
import { Link } from "react-router-dom";
import { Range, Loading } from "components/";
import { API_RANGE_VALUES } from "api/";
import { useState, useEffect } from "react";
import { useAxios } from "hooks/";
import Header from "./Header";

export const Exercise2 = (props) => {
  const { currency, width, axis, readOnly, decimals, t } = props;

  const [min, setMin] = useState();
  const [max, setMax] = useState();

  const [rangeVal, setRangeVal] = useState(null);

  const { getlocalStorage } = useAxios(API_RANGE_VALUES, ["rangeValues"]);

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
      <Header aria={t("header.exercise-2")}>{t("header.exercise-2")}</Header>
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
