import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

import { getFirestore, Timestamp, FieldValue } from 'firebase/firestore';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDq4HDTfSaR3DunZKnM3YoRcjtdaAU0rB0",
  authDomain: "customer-support-v3.firebaseapp.com",
  projectId: "customer-support-v3",
  storageBucket: "customer-support-v3.appspot.com",
  messagingSenderId: "720099373220",
  appId: "1:720099373220:web:a97a35db627fc1dc463631",
  measurementId: "G-F9P5WV2WFE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {auth, app, Timestamp, FieldValue, db, storage}