// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration (ecotrack-sustainable)
const firebaseConfig = {
    apiKey: "AIzaSyARD0B9C0L-8gKvkPbqB046qFpM4uir3as",
    authDomain: "ecotrack-sustainable.firebaseapp.com",
    projectId: "ecotrack-sustainable",
    storageBucket: "ecotrack-sustainable.firebasestorage.app",
    messagingSenderId: "389639471628",
    appId: "1:389639471628:web:6fe2048faa1a6eb87ce429",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
