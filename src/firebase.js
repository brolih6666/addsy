// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAHg9Xr_gwflQse8R1QlXbfVJyvVZ2jKps',
	authDomain: 'addsy-b9e35.firebaseapp.com',
	projectId: 'addsy-b9e35',
	storageBucket: 'addsy-b9e35.appspot.com',
	messagingSenderId: '910407982649',
	appId: '1:910407982649:web:9be34b186a49c8e1c977e8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export default app
