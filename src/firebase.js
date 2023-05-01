import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const { getFirestore, Timestamp, FieldValue } = require('firebase/firestore');

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCqVrpeqdjkhKC_3Ax7t8OuUhf8M0S2npg",
    authDomain: "customer-support-messages.firebaseapp.com",
    projectId: "customer-support-messages",
    storageBucket: "customer-support-messages.appspot.com",
    messagingSenderId: "985768799147",
    appId: "1:985768799147:web:69401e8c51ac1ceb5a80ee",
    measurementId: "G-S1S0BR6Y17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export {auth, app, Timestamp, FieldValue, db, storage}