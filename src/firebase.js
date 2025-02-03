// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC9QJLHUqSnkbMjgJqHbKz0QALlwbtqRH0",
  authDomain: "krushi-kalpa.firebaseapp.com",
  projectId: "krushi-kalpa",
  storageBucket: "krushi-kalpa.firebasestorage.app",
  messagingSenderId: "1035924995818",
  appId: "1:1035924995818:web:d2a2f25a305da869f0e193",
  measurementId: "G-QBCFTDKDFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);