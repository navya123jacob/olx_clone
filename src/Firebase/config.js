
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCdIvJwJSSX8YiSzFuEUWKK51qZhUG9G38",
  authDomain: "myolx-6b292.firebaseapp.com",
  projectId: "myolx-6b292",
  storageBucket: "myolx-6b292.appspot.com",
  messagingSenderId: "560847004824",
  appId: "1:560847004824:web:3164399b799200e8785ced",
  measurementId: "G-03L8ZPDBD0"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const auth=getAuth(firebaseapp)
const firestore = getFirestore(firebaseapp);

const storage=getStorage(firebaseapp)

export {firebaseapp,auth,firestore,storage};
