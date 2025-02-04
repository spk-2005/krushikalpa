import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9QJLHUqSnkbMjgJqHbKz0QALlwbtqRH0",
  authDomain: "krushi-kalpa.firebaseapp.com",
  projectId: "krushi-kalpa",
  storageBucket: "krushi-kalpa.appspot.com",  // fixed typo
  messagingSenderId: "1035924995818",
  appId: "1:1035924995818:web:d2a2f25a305da869f0e193",
  measurementId: "G-QBCFTDKDFH"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app); // Initialize Firestore with the app

// Authentication Functions
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log("User signed in:", result.user);
      alert(`Welcome ${result.user.displayName}`);
    })
    .catch((error) => {
      console.error("Error signing in:", error);
    });
};

export const logout = () => {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
      alert("Logged out successfully!");
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
};

// Export the initialized Firebase app

export { app, auth, analytics, provider, db }; // Export db
