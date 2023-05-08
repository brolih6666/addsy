import { useState, useEffect } from 'react'
import { db } from '../firebase'
import { doc, collection, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore'

// categories img
import Art from '../assets/categories/Art.svg'
import Electronics from '../assets/categories/Electronics.svg'
import Fashion from '../assets/categories/Fashion.svg'
import Health from '../assets/categories/Health.svg'
import Home from '../assets/categories/Home.svg'
import Kids from '../assets/categories/Kids.svg'
import Pets from '../assets/categories/Pets.svg'
import RealEstate from '../assets/categories/Real Estate.svg'
import Sports from '../assets/categories/Sports.svg'
import Work from '../assets/categories/Work.svg'
import { UserAuth } from '../context/AuthContext'
export default function useFirestore(collectionName) {
	const { user } = UserAuth()
	const [collectionDocuments, setCollectionDocuments] = useState([])
	const [activeUser, setActiveUser] = useState()

	const getCollection = async () => {
		const querySnapshot = await getDocs(collection(db, collectionName))
		const safetyArr = []

		await querySnapshot.forEach(async (doc, i) => {
			if (collectionDocuments.length != 0) return
			if (collectionName != 'categories') {
				safetyArr.push(doc.data())

				setCollectionDocuments(safetyArr)
			} else {
				const categoryName = doc.id
				const subCollections = doc.data().Subcollection
				const img = await import(`../assets/categories/${doc.id}.svg`)
				setCollectionDocuments(prev => [...prev, { name: categoryName, subCollections, img: img.default }])
				safetyArr.push({ categoryName, subCollections, img: img.default })
				setCollectionDocuments(safetyArr)
			}
		})

		return { collectionDocuments }
	}

	const getDocument = async docID => {
		const docRef = doc(db, collectionName, docID)
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			console.log('Document data:', docSnap.data())
			return docSnap.data()
		} else {
			// docSnap.data() will be undefined in this case
			console.log('No such document!')
		}
	}

	const addDocument = async (docObj, chosenCollection) => {
		console.log(docObj)
		await setDoc(doc(db, chosenCollection, docObj?.id), docObj)
	}

	const updateDocument = async (docObj, updatedData) => {
		const docRef = doc(db, collectionName, docObj?.id)

		await updateDoc(docRef, updatedData)
	}

	const activeUserFetch = async () => {
		const userObj = {
			id: user?.uid,
			email: user?.email,
			displayName: user?.displayName,
			favourites: [],
			listings: [],
			chats: [],
			avatarUrl: user?.photoURL,
			joined: new Date(),
		}

		let active = null
		const querySnapshot = await getDocs(collection(db, 'users'))

		await querySnapshot.forEach(dbUser => {
			if (dbUser.data()?.email == user?.email) {
				active = dbUser.data()

				setActiveUser(active)
				return
			} else {
				return
			}
		})

		if (active == null) {
			console.log('add')
			addDocument(userObj, 'users')

			return
		}

		return { activeUser }
	}

	const addFavourite = async id => {
		if (!activeUser?.email) navigate('/account')

		await updateDocument(activeUser, {
			favourites: activeUser?.favourites?.length > 0 ? [...activeUser?.favourites, id] : [id],
		})
		console.log('update done')
		activeUserFetch()
	}
	const removeFavourite = async (e, id) => {
		const removed = activeUser.favourites.filter(favID => {
			if (id == favID) return

			return favID
		})

		await updateDocument(activeUser, {
			favourites: [...removed],
		})
		console.log('favourite removed')
		await activeUserFetch()

		if (!widthFull) return

		const updatedArr = dataArray.filter(favID => {
			if (id == favID.id) return

			return favID
		})

		setFavourites(updatedArr)
	}

	!activeUser && user && Object?.keys(user)?.length && activeUserFetch()
	useEffect(() => {
		getCollection()
	}, [])

	return {
		getDocument,
		getCollection,
		collectionDocuments,
		activeUserFetch,
		addDocument,
		updateDocument,
		activeUser,
		addFavourite,
		removeFavourite,
	}
}
