import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import axios from "axios";
// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyC9QJLHUqSnkbMjgJqHbKz0QALlwbtqRH0",
    authDomain: "krushi-kalpa.firebaseapp.com",
    projectId: "krushi-kalpa",
    storageBucket: "krushi-kalpa.appspot.com",
    messagingSenderId: "1035924995818",
    appId: "1:1035924995818:web:d2a2f25a305da869f0e193",
    measurementId: "G-QBCFTDKDFH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// Register Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
            console.log("Service Worker registered successfully:", registration);
        })
        .catch((error) => {
            console.error("Service Worker registration failed:", error);
        });
}

export const generateToken = async (email) => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, { vapidKey: "BCa1gTlmFcUW_CaaenSm5_Af0SFUKfEjZNm2h6mmN6yYk6w3KgVP7SPqSzIo-E7xM5uVURQHdDqOREUoNCRxcx4" });
        console.log("FCM Token:", token);
  
        // Store token in MongoDB
        await axios.post("http://localhost:5000/store-token", { email, fcmToken: token });
  
        return token;
      } else {
        console.warn("Notifications permission denied.");
      }
    } catch (error) {
      console.error("Error getting FCM token:", error);
    }
  };
// Listen for foreground messages
onMessage(messaging, (payload) => {
    console.log("Message received in foreground:", payload);
    alert(`New Notification: ${payload.notification.title}`);
});

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

export { app, auth, analytics, provider, db, messaging };
