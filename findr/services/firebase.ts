// TO USE A REAL DATABASE:
// 1. Go to console.firebase.google.com
// 2. Create a new project
// 3. Register a web app
// 4. Paste the configuration below
// 5. Update storageService.ts to use these functions instead of localStorage

/*
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
*/

export const isFirebaseEnabled = false;
