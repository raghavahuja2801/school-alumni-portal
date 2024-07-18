// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZR98QZvynDCg5v7_-WbrIoxseHHZ-pG4",
  authDomain: "bbps-alumni.firebaseapp.com",
  projectId: "bbps-alumni",
  storageBucket: "bbps-alumni.appspot.com",
  messagingSenderId: "161382472577",
  appId: "1:161382472577:web:9dc46e4e09ea035ada6680",
  measurementId: "G-Q0X7BECS1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)