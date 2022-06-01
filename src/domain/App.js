import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Exercise1 } from "./Exercise1";
import { Exercise2 } from "./Exercise2";
import { Home } from "./Home";
import { useData } from "hooks/";
import Header from "./Header";

export const App = () => {
  const [t] = useTranslation("global");
  const { currency, width, axis, readOnly, decimals } = useData();
  const propsRange = { currency, width, axis, readOnly, decimals, t };

  return (
    <>
      <Header aria-label={t("header.aria-title")} main={true}>
        {t("header.title")}
      </Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="exercise1" element={<Exercise1 {...propsRange} />} />
        <Route path="exercise2" element={<Exercise2 {...propsRange} />} />
      </Routes>
    </>
  );
};
