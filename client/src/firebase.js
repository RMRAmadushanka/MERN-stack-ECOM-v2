// import * as firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYVafKQ9O6MLLbnpvAs4JvKiG8pgrWJjY",
  authDomain: "ecomudmy.firebaseapp.com",
  projectId: "ecomudmy",
  storageBucket: "ecomudmy.appspot.com",
  messagingSenderId: "855984028122",
  appId: "1:855984028122:web:5adf7db02860aabe9128e3",
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
