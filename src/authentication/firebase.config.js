// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXpkKumKjnx5MDTWBJjLWwBy9adud3HNs",
  authDomain: "task-management-656e9.firebaseapp.com",
  projectId: "task-management-656e9",
  storageBucket: "task-management-656e9.firebasestorage.app",
  messagingSenderId: "318709873598",
  appId: "1:318709873598:web:697ebaed225612c5ca17ef",
  measurementId: "G-L14XF5RWWQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);