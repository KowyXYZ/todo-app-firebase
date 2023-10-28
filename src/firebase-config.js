// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdwd0XOwtSMjFJ7lZ2T05_zSxuGNvcJLw",
  authDomain: "todo-app-a80de.firebaseapp.com",
  projectId: "todo-app-a80de",
  storageBucket: "todo-app-a80de.appspot.com",
  messagingSenderId: "1047579365564",
  appId: "1:1047579365564:web:fd16b6bada2944963540b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)