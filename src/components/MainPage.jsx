import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

import useFirebase from '../hooks/useFirebase'
import useFirestore from '../hooks/useFirestore'
import DisplayListings from './DisplayListings'
import MainCategories from './MainCategories'
import Searchbar from './Searchbar'
export default function MainPage({ activeUserFetch }) {
	const { activeUser } = useFirestore('listings')
	const { collectionDocuments } = useFirestore('listings')
	const wrap = useRef()

	const mountComponent = () => {
		setTimeout(() => {
			wrap && wrap.current.classList.remove('opacity-0')
		}, 200)
	}
	useEffect(() => {
		mountComponent()
	}, [])
	return (
		<div ref={wrap} className='opacity-0 transition-all'>
			<Searchbar />
			<div className='min-w-screen  md:max-w-[1300px] flex items-center mx-auto'>
				<div className=' text-teal-950 flex bg-slate-100 py-2 min-w-full flex-col justify-center items-center'>
					<div className='flex flex-col justify-center w-full bg-white'>
						<div className='flex justify-between  min-w-[90vw] py-4 px-4 flex-row  items-center '>
							<h2 className='text-xl font-semibold '>Categories</h2>
							<Link to='/'>See all...</Link>
						</div>
						<MainCategories />
					</div>

					{/* <MainCategories /> */}
					<div className='w-full text-left px-4 pt-5 pb-3 font-semibold text-2xl '>
						<h2>Chosen for you</h2>
					</div>
					<DisplayListings
						dataArray={collectionDocuments}
						widthFull={false}
						activeUser={activeUser}
						activeUserFetch={activeUserFetch}
					/>
				</div>
			</div>
		</div>
	)
}
