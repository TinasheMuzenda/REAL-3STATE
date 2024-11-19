// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-real-estatess.firebaseapp.com",
  projectId: "mern-real-estatess",
  storageBucket: "mern-real-estatess.firebasestorage.app",
  messagingSenderId: "866017880674",
  appId: "1:866017880674:web:58efc287e06641cd95bf3b",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
