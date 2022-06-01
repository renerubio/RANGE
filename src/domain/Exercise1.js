import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Range, Loading } from "components/";
import { API_ENDPOINT_RANGE } from "api/";
import { useFetch } from "hooks/";
import Header from "./Header";

export const Exercise1 = (props) => {
  const { currency, width, axis, decimals, t } = props;

  const [min, setMin] = useState();
  const [max, setMax] = useState();

  const { getlocalStorage } = useFetch(API_ENDPOINT_RANGE, ["min", "max"]);

  useEffect(() => {
    if (getlocalStorage) {
      setMin(Number(getlocalStorage.min));
      setMax(Number(getlocalStorage.max));
    }
  }, [getlocalStorage]);

  return (
    <>
      <Header aria-label={t("header.exercise-1")}>
        {t("header.exercise-1")}
      </Header>
      <nav>
        <Link to="/" aria-label={t("nav.back-to-home")}>
          {t("nav.back-to-home")}
        </Link>
      </nav>
      {min && max ? (
        <Range
          min={min}
          max={max}
          width={width}
          currencyType={currency}
          axis={axis}
          decimals={decimals}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};
