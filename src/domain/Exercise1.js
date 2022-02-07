import React from "react";
import { Link } from "react-router-dom";
import { Range, Loading } from "@components/"
import { API_RANGE } from "@api/";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAxios } from "@hooks/";

export const Exercise1 = () => {
  const [t] = useTranslation("global");

  const [min, setMin] = useState();
  const [max, setMax] = useState();

  const { getlocalStorage } = useAxios(API_RANGE,["min","max"]);

  useEffect(() => {
    if (getlocalStorage) {
      setMin(Number(getlocalStorage.min));
      setMax(Number(getlocalStorage.max));
    }
  }, [getlocalStorage, getlocalStorage]);

  return (
    <>
      <header>
        <h2 data-cy="title-exercise1" aria-label={t("header.exercise-1")}>
          {t("header.exercise-1")}
        </h2>
      </header>
      <nav>
        <Link data-cy="back-to-home" to="/" aria-label={t("nav.back-to-home")}>
          {t("nav.back-to-home")}
        </Link>
      </nav>
      {min && max ? (
        <Range min={min} max={max} width={300} currencyType="€" axis="x" />
      ) : (
        <Loading text={t("loading")} />
      )}
    </>
  );
};
