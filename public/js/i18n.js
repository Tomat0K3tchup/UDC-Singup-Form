import { translate, initLitI18n } from "https://cdn.jsdelivr.net/npm/lit-i18n@4.1.0/+esm";
import i18next from "https://cdn.jsdelivr.net/npm/i18next@20.4.0/+esm";
import jqueryI18next from "https://cdn.jsdelivr.net/npm/jquery-i18next@1.2.1/+esm";
import HttpBackend from "https://cdn.jsdelivr.net/npm/i18next-http-backend@3.0.2/+esm";
import LanguageDetector from "https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@8.0.4/+esm";

// TODO: Transform to have this work with esm modules

const namespaces = ["form", "liability", "medical", "safeDiving", "tAndC"];
// export const supportedLngs = ["en", "es"];
export const supportedLngs = ["en"];

// Show spinner when i18n starts loading
// Wait for custom element to be fully rendered before showing
customElements.whenDefined("spinner-modal").then(() => {
  const spinnerElement = document.querySelector("spinner-modal");
  if (spinnerElement) {
    spinnerElement.updateComplete.then(() => {
      toggleSpinner(true);
    });
  }
});

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
  if ($.i18n) {
    $("body").localize();
  }
  updateFormLanguage(lng);
});

function updateFormLanguage(lng) {
  const langInput = document.getElementById("form_language");
  if (langInput) langInput.value = lng;
}

document.addEventListener("DOMContentLoaded", updateFormLanguage);

export const i18n = i18next;
export const t = translate;
