// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaWPcsrdmCBRAJIUpZG6GbmYC2md43iPw",
  authDomain: "cowqr-inda.firebaseapp.com",
  projectId: "cowqr-inda",
  storageBucket: "cowqr-inda.appspot.com",
  messagingSenderId: "270823434794",
  appId: "1:270823434794:web:b0fae13bc035a668c5b153",
  measurementId: "G-NKGKE61RVR"
}


// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const analytics = getAnalytics(app)
const firestore = getFirestore(app)
