// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlvZtdvHCCyGGwMMZPEmjpE_0b8_nzZT0",
  authDomain: "projeto-ddd8a.firebaseapp.com",
  projectId: "projeto-ddd8a",
  storageBucket: "projeto-ddd8a.firebasestorage.app",
  messagingSenderId: "175715420871",
  appId: "1:175715420871:web:dcb7a5c062d77a90f9cce2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };