import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// TO SET UP FIREBASE:
// 1. Go to console.firebase.google.com
// 2. Create a new project (or use existing)
// 3. Enable Firestore Database (Create database → Start in test mode)
// 4. Register a web app (click the </> icon)
// 5. Copy your Firebase config and replace the values below
// 6. Set isFirebaseEnabled to true once configured

const firebaseConfig = {
  apiKey: "AIzaSyC3fz0TVXco2vam7qhJckgU_5Is4MBWyjQ",
  authDomain: "findr-bfb3a.firebaseapp.com",
  projectId: "findr-bfb3a",
  storageBucket: "findr-bfb3a.firebasestorage.app",
  messagingSenderId: "937277964846",
  appId: "1:937277964846:web:646b9e8abecc306015d5bf"
};

// Firebase is now enabled and configured
export const isFirebaseEnabled = true;

// Initialize Firebase only if enabled
let app;
let db;

if (isFirebaseEnabled) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
}

export { db };
