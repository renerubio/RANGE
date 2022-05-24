import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Range, Loading } from "components/";
import { API_RANGE } from "api/";
import { useAxios } from "hooks/";
import Header from "./Header";

export const Exercise1 = (props) => {
  const { currency, width, axis, decimals, t } = props;

  const [min, setMin] = useState();
  const [max, setMax] = useState();

  const { getlocalStorage } = useAxios(API_RANGE, ["min", "max"]);

  useEffect(() => {
    if (getlocalStorage) {
      setMin(Number(getlocalStorage.min));
      setMax(Number(getlocalStorage.max));
    }
  }, [getlocalStorage]);

  return (
    <>
      <Header aria={t("header.exercise-1")}>{t("header.exercise-1")}</Header>
      <nav>
        <Link data-cy="back-to-home" to="/" aria-label={t("nav.back-to-home")}>
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
