// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjVCQ55QDU-16funDE0vy-6k4c8PnguFA",
  authDomain: "task-manager-3e477.firebaseapp.com",
  projectId: "task-manager-3e477",
  storageBucket: "task-manager-3e477.firebasestorage.app",
  messagingSenderId: "940291783559",
  appId: "1:940291783559:web:c1f502c371905cd231f122",
  measurementId: "G-SMMS7KGVLG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// Firebase services
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);