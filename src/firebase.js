// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth,GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from '@firebase/firestore'
import { getStorage, ref } from "firebase/storage";

import 'firebase/storage'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBGnthDSA_mQrLA9r8j6yficj0WtB4yUxk',
	authDomain: 'thedojosite-dec78.firebaseapp.com',
	projectId: 'thedojosite-dec78',
	storageBucket: 'thedojosite-dec78.appspot.com',
	messagingSenderId: '747669833036',
	appId: '1:747669833036:web:3542501374aca48db73be9',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
export const db = getFirestore(app)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()
export default app
