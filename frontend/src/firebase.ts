import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDgFH74k2pOBWnYew00OMVBjnQYXcYzZdY",
  authDomain: "resolutydashboard.firebaseapp.com",
  projectId: "resolutydashboard",
  storageBucket: "resolutydashboard.firebasestorage.app",
  messagingSenderId: "948695454342",
  appId: "1:948695454342:web:f0f28af286ef883353f707"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;
