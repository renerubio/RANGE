import React from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { DataProvider, DataRangeProvider } from "context";

import { Exercise1 } from "./Exercise1";
import { Exercise2 } from "./Exercise2";
import { Home } from "./Home";
import Header from "./Header";

export const App = () => {
  const [t] = useTranslation("global");
  return (
    <>
      <Header aria-label={t("header.aria-title")} main={true}>
        {t("header.title")}
      </Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="exercise1"
          element={
            <DataProvider>
              <Exercise1 />
            </DataProvider>
          }
        />
        <Route
          path="exercise2"
          element={
            <DataRangeProvider>
              <Exercise2 />
            </DataRangeProvider>
          }
        />
      </Routes>
    </>
  );
};
