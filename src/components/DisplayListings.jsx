import { useEffect, useRef } from 'react'
import heartIcon from '../assets/favouriteIconBar.svg'
import heartIconFull from '../assets/favouriteIconFull.svg'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import useFirestore from '../hooks/useFirestore'
import { useNavigate } from 'react-router-dom'
import { uuidv4 } from '@firebase/util'
import { Link } from 'react-router-dom'
export default function DisplayListings({ dataArray, widthFull, setFavourites }) {
	const { activeUser, addFavourite, removeFavourite } = useFirestore('users')
	const listingsContainer = useRef()
	const navigate = useNavigate()
	const id = uuidv4()
	const { collectionDocuments } = useFirestore('listings')
	const handleBounce = target => {
		target.classList.add('bounce-in-fwd')

		setTimeout(() => {
			target.classList.remove('bounce-in-fwd')
		}, 2000)
	}
	useEffect(() => {}, [listingsContainer.current])

	return (
		<div
			ref={listingsContainer}
			className={`w-full   h-full text-teal-950 bg-slate-100 grid  ${
				widthFull ? 'grid-cols-1 gap-4 p-4 ' : ' grid-cols-2 gap-2 p-2'
			} `}>
			{dataArray?.map(listing => {
				if (listingsContainer?.current?.childElementCount >= dataArray.length) return

				if (listing == null) return
				const inFavs = activeUser?.favourites?.includes(listing.id)
				if (Object?.keys(listing)?.length == 0) return
				if (listing?.imgsUrl?.length == 0) return

				return (
					dataArray && (
						<div key={id} className='relative'>
							<div className=' w-10 absolute top-[170px] right-0 flex'>
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
								to={`/listing/${listing.id}`}
								state={{ listing: listing, preview: false }}
								key={uuidv4()}
								className={`${
									widthFull ? 'max-h-[350px] ' : ' max-h-[300px] '
								} rounded-lg overflow-hidden flex flex-col cursor-pointer bg-white `}>
								<div className='w-full h-1/2 rounded-t overflow-hidden'>
									<img src={listing?.imgsUrl[0]} className='object-cover h-[300px] object-center w-full ' alt='' />
								</div>
								<div className='h-1/2 rounded-b  px-4 pt-3 pb-5 bg-white flex flex-col   relative  justify-start items-start'>
									<div className='w-full flex h-[50px] overflow-hidden flex-row  justify-start items-start space-x-4'>
										<p className='w-5/6 text-left  font-semibold  flex h-[40px] break-all  flex-wrap'>
											{listing.listingTitle}
										</p>
									</div>
									<p className='font-semibold my-2'>{listing.price}$</p>
									<div className=' text-left text-xs font-light'>
										<p>{listing.category.name}</p>
										<p>Added {formatDistanceToNow(new Date(listing?.createdAt * 1000), { addSuffix: true })}</p>
									</div>
								</div>
							</Link>
						</div>
					)
				)
			})}
		</div>
	)
}
