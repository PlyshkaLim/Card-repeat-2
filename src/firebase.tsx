// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//  Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3w2H64G1g6aeuYKRGlKMf6SCuOnjwYA4",
  authDomain: "card-repeat.firebaseapp.com",
  projectId: "card-repeat",
  storageBucket: "card-repeat.appspot.com",
  messagingSenderId: "800295270825",
  appId: "1:800295270825:web:5bf4f47289bc0d2a002cb8",
  measurementId: "G-X851T1HE6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);