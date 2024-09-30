import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBZaYxzsv21C-rbIJKrnv9VZr2jg3vM_r8",
  authDomain: "park-city-fa548.firebaseapp.com",
  databaseURL: "https://park-city-fa548-default-rtdb.firebaseio.com",
  projectId: "park-city-fa548",
  storageBucket: "park-city-fa548.appspot.com",
  messagingSenderId: "846104089542",
  appId: "1:846104089542:web:c3d336db5172fea040d8c7",
  measurementId: "G-5N04MHS5V0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export initialized instances for use in your app
export const realTimeDB = getDatabase(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const firestore = getFirestore(app);

export default app;
