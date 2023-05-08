import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { getDocs, collection } from 'firebase/firestore'
export default function useFirebase(collectionName) {
	console.log(collectionName)
	const [result, setResult] = useState()
	const collectionRef = collection(db, collectionName)
	const getCollection = async () => {
		const data = await getDocs(collectionRef)
		
		const filteredData = data.docs.map(doc => ({
			...doc.data(),
		}))
		setResult(filteredData)
	}

	console.log(result)
	useEffect(() => {
		getCollection()
	}, [])

	return { result }
}
