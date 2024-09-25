import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpEOEttUUnJ6fFA-cBsE63loQYC5M1jOM",
  authDomain: "eventify-fe426.firebaseapp.com",
  projectId: "eventify-fe426",
  storageBucket: "eventify-fe426.appspot.com",
  messagingSenderId: "7878698700",
  appId: "1:7878698700:web:71e51ac1d0e268cee64469",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into react app whenever it is needed
export const db = getFirestore(app);
