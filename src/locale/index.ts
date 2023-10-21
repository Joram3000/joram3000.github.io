import i18next, { InitOptions } from "i18next";
import nl from "./nl";
import en from "./en";
import { initReactI18next } from "react-i18next";

export const resources: InitOptions["resources"] = {
  nl: {
    translation: nl,
  },
  en: {
    translation: en,
  },
};

i18next.use(initReactI18next).init({
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: "nl",
  lng: sessionStorage.getItem("language") ?? "nl",
  resources,
});

export type Translation = typeof nl;
export default i18next;
