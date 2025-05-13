import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDlvZtdvHCCyGGwMMZPEmjpE_0b8_nzZT0",
  authDomain: "projeto-ddd8a.firebaseapp.com",
  databaseURL: "https://projeto-ddd8a-default-rtdb.firebaseio.com",
  projectId: "projeto-ddd8a",
  storageBucket: "projeto-ddd8a.firebasestorage.app",
  messagingSenderId: "175715420871",
  appId: "1:175715420871:web:dcb7a5c062d77a90f9cce2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
