import { getAuth } from "firebase/auth";
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
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export {auth}
