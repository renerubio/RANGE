import React from "react";
import { render } from "react-dom";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { App } from "./domain";

import global_en from "./resources/en/global.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
  },
});
const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </BrowserRouter>,
  rootElement
);
