import { createContext, useContext, useEffect, useState } from 'react'
import { auth, googleProvider } from '../firebase'
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth'

const UserContext = createContext()
export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({})
	const createUser = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password)
	}
	const signIn = async (email, password) => {
		await signInWithEmailAndPassword(auth, email, password)
	}

	const googleSignIn = async () => {
		signInWithPopup(auth, googleProvider)
			.then(result => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result)
				const token = credential.accessToken
				// The signed-in user info.
				const user = result.user
				console.log(user)
				// IdP data available using getAdditionalUserInfo(result)
				// ...
			})
			.catch(error => {
				// Handle Errors here.
				const errorCode = error.code
				const errorMessage = error.message
				// The email of the user's account used.
				const email = error.customData.email
				// The AuthCredential type that was used.
				const credential = GoogleAuthProvider.credentialFromError(error)
				// ...
			})
	}

	const logout = () => {
		return signOut(auth)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, currentUser => {
			console.log(currentUser)
			setUser(currentUser)
		})

		return () => {
			unsubscribe()
		}
	}, [])

	return (
		<UserContext.Provider value={{ createUser, user, logout, signIn, googleSignIn }}>{children}</UserContext.Provider>
	)
}
export const UserAuth = () => {
	return useContext(UserContext) || {}
}
