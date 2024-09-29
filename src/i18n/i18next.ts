// src/i18n/i18n.ts
import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { database } from '../firebase/firebaseConfig';
import { ref, get } from 'firebase/database';


// Firebase konfiguratsiyasi
// const db = getFirestore(app);

// Tarjima obyektining tipi
interface TranslationData {
  [key: string]: string;
}

// Firebase'dan tarjima resurslarini olish funksiyasi
const fetchTranslationsFromFirebase = async (lng: string): Promise<TranslationData> => {
  const dbRef = ref(database, `translations/${lng}`);
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    return snapshot.val() as TranslationData;  // Tarjima obyektini qaytarish
  } else {
    console.log("Tarjima topilmadi!");
    return {};
  }
};

// i18next sozlamalari
const options: InitOptions = {
  fallbackLng: 'en',
  debug: true,
  interpolation: {
    escapeValue: false, // React uchun kerak emas
  },
  load: 'languageOnly',  // Faqat tilni yuklash (dialektlarsiz)
};

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(options);

// Dinamik tarjima yuklash
export const loadTranslations = async (lng: string): Promise<void> => {
  const translations = await fetchTranslationsFromFirebase(lng);
  if (Object.keys(translations).length) {
    i18n.addResourceBundle(lng, 'translations', translations, true, true);
  } else {
    console.warn(`Tarjima resurslari topilmadi: ${lng}`);
  }
};

// Default eksport qilish
export default i18n;
