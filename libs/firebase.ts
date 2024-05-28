// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU9V43srCdY5HmWnl4i5uSkaYkDhevnS0",
  authDomain: "e-shop-e00de.firebaseapp.com",
  projectId: "e-shop-e00de",
  storageBucket: "e-shop-e00de.appspot.com",
  messagingSenderId: "649808838796",
  appId: "1:649808838796:web:14e7b5ff9e8d54e7aebba9",
  measurementId: "G-WPEYSLTDZK"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(firebaseApp);


export default firebaseApp;