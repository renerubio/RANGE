import i18next from "i18next";
import global_en from "./en/global.json";
i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
  },
});
export default i18next;
