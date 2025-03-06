// firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // For Firestore (optional)
import { getAuth } from "firebase/auth"; // For Authentication (optional)
import { getAnalytics } from "firebase/analytics"; // For Analytics (optional)

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-Rf9oO3ICl9i30hFRrOCS3zKXcZXjQ80",
  authDomain: "hobbyfinder1914.firebaseapp.com",
  projectId: "hobbyfinder1914",
  storageBucket: "hobbyfinder1914.firebasestorage.app",
  messagingSenderId: "708180761282",
  appId: "1:708180761282:web:09ab27740036a974daf95b",
  measurementId: "G-V6XMLF5PND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Initialize Firebase services
const analytics = getAnalytics(app); // For Analytics
const auth = getAuth(app); // For Authentication
const db = getFirestore(app); // For Firestore

export { app, auth, db, analytics }; // Export the services
