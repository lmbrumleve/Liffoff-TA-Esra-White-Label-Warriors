// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFhZjp7_2ckScFL8RCZcV3TbnYQMixnI0",
  authDomain: "trip-wallet-6e3a1.firebaseapp.com",
  projectId: "trip-wallet-6e3a1",
  storageBucket: "trip-wallet-6e3a1.appspot.com",
  messagingSenderId: "569499673319",
  appId: "1:569499673319:web:01036d0542599123f77842",
  measurementId: "G-0WCL6ZDGPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { app, auth };