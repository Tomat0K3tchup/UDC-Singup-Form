import i18next from "https://cdn.jsdelivr.net/npm/i18next@20.4.0/+esm";
import HttpBackend from "https://cdn.jsdelivr.net/npm/i18next-http-backend@3.0.2/+esm";
import LanguageDetector from "https://cdn.jsdelivr.net/npm/i18next-browser-languagedetector@8.0.4/+esm";

const namespaces = ["form", "liability", "medical", "safeDiving", "tAndC"];
export const supportedLngs = ["en", "es"];

export { i18next };

export default function alpineI18nPlugin(Alpine) {
  Alpine.magic("t", () => (key, opts) => {
    // Access reactive properties so Alpine re-evaluates when i18n loads / language changes
    void Alpine.store("i18n").ready;
    void Alpine.store("i18n").lang;
    return i18next.t(key, opts);
  });

  Alpine.store("i18n", { ready: false, lang: "en" });

  i18next
    .use(HttpBackend)
    .use(LanguageDetector)
    .init({
      debug: false,
      load: "languageOnly",
      preload: supportedLngs,
      backend: { loadPath: "/locales/{{lng}}/{{ns}}.json" },
      ns: namespaces,
      supportedLngs,
      fallbackLng: "en",
      defaultNS: "form",
    })
    .then(() => {
      Alpine.store("i18n").ready = true;
      Alpine.store("i18n").lang = i18next.language;
    });

  i18next.on("languageChanged", (lng) => {
    Alpine.store("i18n").lang = lng;
  });
}
