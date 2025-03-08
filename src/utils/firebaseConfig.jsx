// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCJ6GJkw4swIqgTCfxfHtHPFVrcsFSTWFw",
    authDomain: "tourbuddy29.firebaseapp.com",
    projectId: "tourbuddy29",
    storageBucket: "tourbuddy29.firebasestorage.app",
    messagingSenderId: "208346003096",
    appId: "1:208346003096:web:cd16d64204aea90ee4c2ed",
    measurementId: "G-VLC7WD0S8Q"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);