import { translate as t, initLitI18n } from "https://cdn.jsdelivr.net/npm/lit-i18n@4.1.0/+esm";
import i18next from "https://cdn.jsdelivr.net/npm/i18next@20.4.0/+esm";
import jqueryI18next from "https://cdn.jsdelivr.net/npm/jquery-i18next@1.2.1/+esm";
import HttpBackend from "https://cdn.jsdelivr.net/npm/i18next-http-backend@3.0.2/+esm";
import LanguageDetector from "https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@8.0.4/+esm";

// TODO: Transform to have this work with esm modules

const namespaces = ["form", "liability", "medical", "safeDiving", "tAndC"];
export const supportedLngs = ["en", "es"];

i18next
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initLitI18n)
  .init(
    {
      debug: false,
      load: "languageOnly",
      preload: supportedLngs,
      backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
      ns: namespaces,
      supportedLngs: supportedLngs,
      fallbackLng: "en",
      defaultNS: "form",
      useOptionsAttr: true,
    },
    (err, t) => {
      if (err) return console.error(err);
      jqueryI18next.init(i18next, window.$, { useOptionsAttr: true });

      $("body").localize();
      toggleSpinner(false);
    },
  );

i18next.on("languageChanged", function (lng) {
  console.log("languageChanged", lng);

  if ($.i18n) {
    $("body").localize();
  }
});

export const i18n = i18next;
