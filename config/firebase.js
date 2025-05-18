// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArCRVKiVbSGombGcWuQ6qzKuHNQmtvDzg",
  authDomain: "ticky-tango.firebaseapp.com",
  projectId: "ticky-tango",
  storageBucket: "ticky-tango.firebasestorage.app",
  messagingSenderId: "1092432555992",
  appId: "1:1092432555992:web:5de5703c51c52f03318cad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export default firestore;
