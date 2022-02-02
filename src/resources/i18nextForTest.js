import i18next from "i18next";
import test_en from "./en/test.json";
i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: test_en,
    },
  },
});
export default i18next;
