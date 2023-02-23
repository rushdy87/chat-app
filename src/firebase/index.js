import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: 'chat-e93b1.firebaseapp.com',
  projectId: 'chat-e93b1',
  storageBucket: 'chat-e93b1.appspot.com',
  messagingSenderId: '826603525602',
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// create Auth
export const auth = getAuth();

// Create a root reference
export const storage = getStorage();

// Create DB
export const db = getFirestore();
