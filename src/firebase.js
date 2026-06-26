// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey: "AIzaSyBbjmfRb2zIdfZ-rIbzzfTdy_ot8FB46Jw",
    authDomain: "react-project-14d85.firebaseapp.com",
    databaseURL: "https://react-project-14d85-default-rtdb.firebaseio.com",
    projectId: "react-project-14d85",
    storageBucket: "react-project-14d85.firebasestorage.app",
    messagingSenderId: "6277801231",
    appId: "1:6277801231:web:129fed15c7335239ba8a7a",
    measurementId: "G-8MHFJD2PLW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);