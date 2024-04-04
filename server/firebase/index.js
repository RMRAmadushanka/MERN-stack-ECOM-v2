import admin from "firebase-admin";
import serviceAccount from "../config/ecomudmy-firebase-adminsdk.json" assert { type: "json" };
import { initializeApp } from "firebase-admin/app";

const firebaseApp =  initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default firebaseApp;