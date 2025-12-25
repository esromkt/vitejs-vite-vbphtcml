import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// --- PASTE CONFIG DARI FIREBASE CONSOLE DI BAWAH INI ---
const firebaseConfig = {
  apiKey: 'AIzaSyCUE-8zEaSvIdpud1X00BW7w4pEdkIp0b8',
  authDomain: 'eratools-e5b47.firebaseapp.com',
  projectId: 'eratools-e5b47',
  storageBucket: 'eratools-e5b47.firebasestorage.app',
  messagingSenderId: '1038061293814',
  appId: '1:1038061293814:web:13cf9e01d3bcf0de465cd7',
};
// -------------------------------------------------------

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
