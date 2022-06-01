import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const [t] = useTranslation("global");
  return (
    <nav>
      <Link to="/exercise1" aria-label={t("nav.aria-link-exercise-1")}>
        {t("header.exercise-1")}
      </Link>
      <br />
      <Link to="/exercise2" aria-label={t("nav.aria-link-exercise-2")}>
        {t("header.exercise-2")}
      </Link>
    </nav>
  );
};
