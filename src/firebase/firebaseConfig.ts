// src/firebase/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
// import { getAnalytics } from "firebase/analytics"
// Firebase konfiguratsiyasi
const firebaseConfig = {
    apiKey: "AIzaSyBZaYxzsv21C-rbIJKrnv9VZr2jg3vM_r8",
    authDomain: "park-city-fa548.firebaseapp.com",
    projectId: "park-city-fa548",
    storageBucket: "park-city-fa548.appspot.com",
    messagingSenderId: "846104089542",
    appId: "1:846104089542:web:c3d336db5172fea040d8c7",
    measurementId: "G-5N04MHS5V0"
  };

// Firebase ilovasini boshqarish
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
export { database };
// const analytics = getAnalytics(app);
export default app;
