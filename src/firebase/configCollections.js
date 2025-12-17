import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_COLLECTIONS_API_KEY,
  authDomain: import.meta.env.VITE_COLLECTIONS_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_COLLECTIONS_PROJECT_ID,
  storageBucket: import.meta.env.VITE_COLLECTIONS_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_COLLECTIONS_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_COLLECTIONS_APP_ID
};

// Initialize Firebase (segunda instancia)
const collectionsApp = initializeApp(firebaseConfig, "collections");

// Initialize Firestore para colecciones
export const collectionsDb = getFirestore(collectionsApp);