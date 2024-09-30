// // src/i18n/i18n.ts
// import i18n, { InitOptions } from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import HttpApi from 'i18next-http-backend';
// import LanguageDetector from 'i18next-browser-languagedetector';
// // import { database } from '../firebase/firebaseConfig';
// import { ref, get } from 'firebase/database';


// interface TranslationData {
//   [key: string]: string;
// }

// const fetchTranslationsFromFirebase = async (lng: string): Promise<TranslationData> => {
//   const dbRef = ref(database, `translations/${lng}`);
//   const snapshot = await get(dbRef);

//   if (snapshot.exists()) {
//     return snapshot.val() as TranslationData;  
//   } else {
//     console.log("Tarjima topilmadi!");
//     return {};
//   }
// };

// const options: InitOptions = {
//   fallbackLng: 'en',
//   debug: true,
//   interpolation: {
//     escapeValue: false, 
//   },
//   load: 'languageOnly',  
// };

// i18n
//   .use(HttpApi)
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init(options);

// export const loadTranslations = async (lng: string): Promise<void> => {
//   const translations = await fetchTranslationsFromFirebase(lng);
//   if (Object.keys(translations).length) {
//     i18n.addResourceBundle(lng, 'translations', translations, true, true);
//   } else {
//     console.warn(`Tarjima resurslari topilmadi: ${lng}`);
//   }
// };

// export default i18n;
