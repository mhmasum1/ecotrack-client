import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAdhNRWng42om0GnRrWt3VDcPVee21J828",
    authDomain: "ecotrack-a2cdd.firebaseapp.com",
    projectId: "ecotrack-a2cdd",
    storageBucket: "ecotrack-a2cdd.firebasestorage.app",
    messagingSenderId: "969630008644",
    appId: "1:969630008644:web:2bf2c96b63305520f88311"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
