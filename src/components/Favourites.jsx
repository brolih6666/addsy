import React, { useState, useEffect } from 'react'
import useFirestore from '../hooks/useFirestore'
import DisplayListings from './DisplayListings'
import back from '../assets/arrow_back.svg'
import heartIcon from '../assets/favouriteIconBar.svg'
import heartIconFull from '../assets/favouriteIconFull.svg'
import { useNavigate } from 'react-router-dom'
const Favourites = () => {
	const { getDocument, activeUser, collectionDocuments } = useFirestore('listings')
	const navigate = useNavigate()
	const [favListings, setFavListings] = useState(true)
	const [favSearches, setFavSearches] = useState(false)
	const [favourites, setFavourites] = useState([])
	const fetchFavs = () => {
		setFavourites([])
		let favList = []
		activeUser &&
			activeUser?.favourites.forEach(async fav => {
				const listing = await getDocument(fav)

				setFavourites(prev => [...prev, listing])
			})
	}

	useEffect(() => {
		fetchFavs()
	}, [activeUser])

	return (
		<div className='bg-slate-50 w-full h-full min-h-screen text-teal-950 flex flex-col items-center'>
			<div className='flex flex-col items-start   w-full justify-start p-4'>
				<img
					onClick={() => {
						navigate('/')
					}}
					src={back}
					className='w-9 h-7 pl-2 cursor-pointer  '
					alt=''
				/>
				<h2 className='text-4xl my-8 mb-2 text-left font-semibold'>Favourites</h2>
			</div>

			<div className='w-full  '>
				<button
					onClick={() => {
						setFavListings(true)
						setFavSearches(false)
						console.log('s')
					}}
					className={`w-1/2 border-b-2  py-4 ${favListings ? 'border-black font-bold' : 'border-gray-400'}`}>
					Listings {`[${favourites.length}/150]`}
				</button>
				<button
					onClick={() => {
						setFavListings(false)
						setFavSearches(true)
						console.log('a')
					}}
					className={`w-1/2 border-b-2  py-4 ${favSearches ? 'border-black font-bold' : 'border-gray-400'}`}>
					Create account
				</button>
			</div>

			<div className='w-full h-full  pt-12 flex flex-col justify-center items-center'>
				{favourites.length == 0 && (
					<div className='w-[65%] h-full flex flex-col my-4 justify-center items-center'>
						<div className='w-full flex justify-center items-center h-1/4'>
							<img className='w-1/2 pulsate-bck' src={heartIconFull} alt='' />
						</div>
						<h2 className='text-3xl font-bold  py-6'>Add interesting listings to your favourites</h2>
						<p className='px-8'>Click ♡, when you want to add listing to your favourites and see it here.</p>
					</div>
				)}
				{favourites.length != 0 && (
					<div className='flip-in-hor-bottom w-full'>
						<p className='text-left w-full  text-teal-950 text-xs pt-4 px-6 font-semibold '>{`WE'VE FOUND ${
							favourites.length > 1 ? `${favourites.length} LISTINGS` : '1 LISTING'
						}`}</p>
						<DisplayListings dataArray={favourites} widthFull={true} setFavourites={setFavourites} />
					</div>
				)}
			</div>
		</div>
	)
}

export default Favourites
