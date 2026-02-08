// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import type { Analytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import type { Auth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: "projet-fil-rouge-web-front",
  storageBucket: "projet-fil-rouge-web-front.firebasestorage.app",
  messagingSenderId: "938990585347",
  appId: "1:938990585347:web:afa7e88d4d1dbb5ccbb036",
  measurementId: "G-53KNFLBL7Y"
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const analytics: Analytics = getAnalytics(app);
const auth: Auth = getAuth(app);

export { app, auth };
