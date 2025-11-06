// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCChSeaRA6jEokT0DiBdh3k22fFZzD3WGY",
  authDomain: "foodvilla-16f6a.firebaseapp.com",
  projectId: "foodvilla-16f6a",
  storageBucket: "foodvilla-16f6a.firebasestorage.app",
  messagingSenderId: "328340329884",
  appId: "1:328340329884:web:a543655fdb8d6203fba459",
  measurementId: "G-JJNXBL0YZM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
