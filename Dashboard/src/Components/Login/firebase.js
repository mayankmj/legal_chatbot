// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCnHs_KEVoa9AtUEHyCuWYnKZCeByr9aiQ",
  authDomain: "nyaysetu.firebaseapp.com",
  projectId: "nyaysetu",
  storageBucket: "nyaysetu.appspot.com",
  messagingSenderId: "763184090685",
  appId: "1:763184090685:web:2319db4a774cf80965a454",
  measurementId: "G-DYQ7BPD784"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export {auth}