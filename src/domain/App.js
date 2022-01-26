import React from "react";
import { Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Exercise1 } from "./Exercise1";
import { Exercise2 } from "./Exercise2";
import { Home } from "./Home";


export const App = () => {
  const [t] = useTranslation("global");
  return (
    <>
      <header>
        <h1 aria-label={t("header.aria-title")}>{t("header.title")}</h1>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="exercise1" element={<Exercise1 />} />
        <Route path="exercise2" element={<Exercise2 />} />
      </Routes>
    </>
  );
};




