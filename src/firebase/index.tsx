import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBMWvKKu98AgJfFpUbq2SeBagFupFmsY0I",
    authDomain: "klusterton-hackerthon.firebaseapp.com",
    projectId: "klusterton-hackerthon",
    storageBucket: "klusterton-hackerthon.appspot.com",
    messagingSenderId: "308549536811",
    appId: "1:308549536811:web:76f10a363f8967dfe36e6e",
    measurementId: "G-BRPFMQ1H04"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;