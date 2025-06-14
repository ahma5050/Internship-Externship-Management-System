// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY ,
  authDomain: "internshep-managment-system.firebaseapp.com",
  projectId: "internshep-managment-system",
  storageBucket: "internshep-managment-system.firebasestorage.app",
  messagingSenderId: "415607563614",
  appId: "1:415607563614:web:a8829a473e6a658d9b9bcf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);