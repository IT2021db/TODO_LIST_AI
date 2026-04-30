// import pliki JSON from src/locales
import enJson from "./en.json";
import plJson from "./pl.json";
import esJson from "./es.json";

// list of available languages (locales)
export const availableLocales = ["en", "pl", "es"] as const;

// objekt with all translations
export const messages = { en: enJson, pl: plJson, es: esJson };
