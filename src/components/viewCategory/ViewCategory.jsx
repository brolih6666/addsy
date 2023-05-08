import React, { useState } from 'react'
import Searchbar from '../Searchbar'
import { useLocation } from 'react-router-dom'
import useFirestore from '../../hooks/useFirestore'
import noListing from '../../assets/noListing.svg'
import heartIcon from '../../assets/favouriteIconBar.svg'
import heartIconFull from '../../assets/favouriteIconFull.svg'
import { Link } from 'react-router-dom'
import CategoryFilters from './CategoryFilters'
import Loading from '../Loading'
export default function ViewCategory() {
	const [mounted, setMounted] = useState(false)
	const { activeUser, addFavourite, removeFavourite } = useFirestore('users')
	const { collectionDocuments } = useFirestore('listings')
	const location = useLocation()
	const categoryName = location.state?.category

	const listings = collectionDocuments?.filter(listing => {
		if (categoryName == undefined) {
			return listing
		} else {
			if (listing?.category.categoryName != categoryName) return

			return listing
		}
	})
	const handleBounce = target => {
		target.classList.add('bounce-in-fwd')

		setTimeout(() => {
			target.classList.remove('bounce-in-fwd')
		}, 2000)
	}

	const setMount = () => {
		console.log(mounted)
		setTimeout(() => {
			setMounted(true)
		}, 1500)
	}

	setMount()
	return (
		<div className='w-full h-full  bg-slate-100'>
			<Searchbar />
			<CategoryFilters />
			<div>
				{!mounted && <Loading />}
				{listings?.length && mounted && (
					<>
						<p className='text-teal-900 text-left text-sm my-2 px-4 font-semibold '>{`We've found ${listings?.length} listings`}</p>
						{listings &&
							listings?.map(listing => {
								const inFavs = activeUser?.favourites?.includes(listing?.id)
								const date = new Date(listing.createdAt)

								const month = date.toLocaleString('default', { month: 'long' })

								return (
									<div className='relative px-4'>
										<div className=' w-10 absolute top-[16px] right-[16px] flex'>
											{inFavs && (
												<img
													onClick={e => {
														removeFavourite(e, listing.id)
													}}
													src={heartIconFull}
													className=' px-2 h-10 w-full z-40'
													alt=''
												/>
											)}

											{!inFavs && (
												<img
													onClick={e => {
														addFavourite(listing.id)
														handleBounce(e.target)
													}}
													src={heartIcon}
													className='  px-2 h-10 w-full -fwd z-40'
													alt=''
												/>
											)}
										</div>
										<Link
											state={{ listing: listing, preview: false }}
											to={`/listing/${listing?.id}`}
											key={listing?.id}
											className=' my-2 h-40  flex bg-white '>
											<img src={listing?.imgsUrl[0]} className='h-full w-[45%] object-cover rounded-tl-lg' alt='' />

											<div className='p-4 text-teal-950 text-left'>
												<p className='my-1'>{listing?.listingTitle}</p>
												<button className='px-2 rounded my-1 bg-slate-100'>{listing?.condition}</button>
												<p className='font-bold my-1'>{listing?.price} $</p>
												<p className='text-xs'>{listing?.listingLocation}</p>
												<p className='text-xs'>{`${date.getDate()} ${month} ${date.getFullYear()}`}</p>
											</div>
										</Link>
									</div>
								)
							})}
					</>
				)}

				{mounted && !listings?.length && (
					<div className={`text-black flex w-full justify-center items-center h-[60%] flex-col`}>
						<img className='w-24' src={noListing} alt='' />
						<p className='font-bold pt-6'>Sorry, there are no ads for this category</p>
					</div>
				)}
			</div>
		</div>
	)
}
