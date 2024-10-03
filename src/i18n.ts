import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import uzTranslation from "./locales/uz/translation.json";
import ruTranslation from "./locales/ru/translation.json";
import trTranslation from "./locales/tr/translation.json";
import aeTranslation from "./locales/ae/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: ruTranslation,
    },
    uz: {
      translation: uzTranslation,
    },
    tr: {
      translation: trTranslation,
    },
    ae: {
      translation: aeTranslation,
    },
  },
  lng: "uz",
  fallbackLng: "uz",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
