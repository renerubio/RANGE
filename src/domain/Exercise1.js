import React from "react";
import { Link } from "react-router-dom";
import { Range, Loading } from "../components";
import { API, API_RANGE } from "../../api";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

export const Exercise1 = () => {
  const [t] = useTranslation("global");

  const [min, setMin] = useState(null);
  const [max, setMax] = useState(null);

  useEffect(() => {
    if (
      localStorage.getItem("min") === null ||
      localStorage.getItem("max") === null
    ) {
      API.get(API_RANGE).then((res) => {
        setMin(Number(res.data.min));
        setMax(Number(res.data.max));

        localStorage.setItem("min", res.data.min);
        localStorage.setItem("max", res.data.max);
      });
    } else {
      setMin(Number(localStorage.getItem("min")));
      setMax(Number(localStorage.getItem("max")));
    }
  }, []);

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
