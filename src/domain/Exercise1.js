import React, { useState, useEffect, useContext } from "react";
import { DataContext, DataRangeContext } from "context";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Range, Loading } from "components/";
import { API_ENDPOINT_RANGE } from "api/";
import { useFetch } from "hooks/";
import Header from "./Header";

export const Exercise1 = () => {
  const { min, setMin, max, setMax, currency, width, axis, decimals } =
    useContext(DataContext);
  const [t] = useTranslation("global");

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
