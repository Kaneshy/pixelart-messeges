// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz8hxck2dQMvJX4AT9avNc3QnyhJ2uADc",
  authDomain: "threeds-clone.firebaseapp.com",
  projectId: "threeds-clone",
  storageBucket: "threeds-clone.appspot.com",
  messagingSenderId: "188246956978",
  appId: "1:188246956978:web:aa25cbcb4890daa3c8e2ab",
  measurementId: "G-J272JH94FF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()

export default app