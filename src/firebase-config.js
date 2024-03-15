import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB64rrIxuf9LCEQqW7btqaULyl8Y0LBqM0",
  authDomain: "chargingit-50971.firebaseapp.com",
  projectId: "chargingit-50971",
  storageBucket: "chargingit-50971.appspot.com",
  messagingSenderId: "625931027078",
  appId: "1:625931027078:web:a223e95a1aaa887ea58707",
  measurementId: "G-3HS707C9WV",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
