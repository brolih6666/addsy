import React, { useState } from 'react'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase'
import LocationDisplay from './LocationDisplay'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useLocation, useNavigate } from 'react-router-dom'
import back from '../../assets/arrow_back_white.svg'
import avatar from '../../assets/defaultAvatar.png'
import staticMap from '../../assets/staticMap.svg'
import heartIcon from '../../assets/favouriteIconBar.svg'
import useFirestore from '../../hooks/useFirestore'
import heartIconFull from '../../assets/favouriteIconFull.svg'
import { Swiper, SwiperSlide } from 'swiper/react'
import { uuidv4 } from '@firebase/util'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

import '../../App.css'

// import required modules
import { Pagination, Navigation } from 'swiper'
import SliderDisplay from './SliderDisplay'

export default function viewListing() {
	const { addDocument } = useFirestore('listings')

	const { activeUser, addFavourite, removeFavourite, updateDocument } = useFirestore('users')
	const location = useLocation()
	const navigate = useNavigate()
	const listing = { ...location.state?.listing }
	const preview = location.state?.preview
	const selectedFiles = location.state?.selectedFiles
	const id = uuidv4()
	const [callModal, setCallModal] = useState(false)
	const inFavs = activeUser?.favourites?.includes(listing?.id)
	const listingImgs = listing?.imgsUrl?.length > 0 ? listing.imgsUrl : listing?.selectedImages
	const [displayLocation, setDisplayLocation] = useState(false)
	const [displaySlider, setDisplaySlider] = useState(false)
	const [readMore, setReadMore] = useState(false)
	const handleBounce = target => {
		console.log(target)
		target.classList.add('bounce-in-fwd')

		setTimeout(() => {
			target.classList.remove('bounce-in-fwd')
		}, 2000)
	}

	const uploadImgs = async files => {
		files.map(async img => {
			const imgRef = await ref(storage, '/listings/' + activeUser.id + '/' + id + '/' + img.name)

			await uploadBytes(imgRef, img).then(res => {
				console.log(res)
				console.log('image uploaded')
			})

			try {
				const url = await getDownloadURL(imgRef)
				// Use the URL to display the image in your application
				console.log(url)

				await listing.imgsUrl.push(url)
			} catch (error) {
				// Handle any errors that occur
				console.error(error)
			}
		})
	}

	// Submitting
	const handleSubmit = async e => {
		await uploadImgs(selectedFiles)

		console.log(activeUser)

		setTimeout(async () => {
			await addDocument(listing, 'listings')
			await updateDocument(activeUser, {
				listings: [...activeUser.listings, listing.id],
			})
			navigate('/')
		}, 3000)
	}
	window.scrollTo(0, 0)
	return (
		<div className=' text-black flex-col w-full flex text-left md:w-[1300px] min-h-screen bg-white pb-[70px] '>
			<img
				onClick={() => {
					navigate(-1)
				}}
				src={back}
				className='w-9 h-7 top-4 left-4 cursor-pointer absolute  z-40 '
				alt=''
			/>

			<div className='w-full  bg-red-200 h-[300px] justify-center flex'>
				{displaySlider && <SliderDisplay setDisplaySlider={setDisplaySlider} listingImgs={listingImgs} />}
				<Swiper
					slidesPerView={1}
					spaceBetween={30}
					loop={true}
					pagination={{
						clickable: true,
					}}
					navigation={true}
					modules={[Pagination, Navigation]}
					className='mySwiper'>
					{listingImgs?.map(img => {
						return (
							<SwiperSlide>
								<img
									onClick={() => {
										setDisplaySlider(true)
									}}
									className='object-cover w-full h-[300px] object-center'
									src={img}
									alt=''
								/>
							</SwiperSlide>
						)
					})}
				</Swiper>
			</div>

			<div className='bg-white relative  rounded-t-2xl -translate-y-[10px] z-40'>
				{/* Favoruites */}

				<div className=' w-20 p-2 absolute bg-white rounded-full top-3 right-3 flex'>
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

					{!inFavs && !preview && (
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

				{/* Title, price, condition */}
				<div className='border-b border-slate-300 p-4 '>
					{' '}
					<p className='text-[12px] text-slate-500'>
						Added {formatDistanceToNow(new Date(listing?.createdAt * 1000), { addSuffix: true })}
					</p>
					<h2 className='text-2xl my-2 '>{listing?.listingTitle}</h2>
					{!listing?.free && !listing?.trade && <p className='text-3xl font-bold my-2'>{listing?.price} $</p>}
					<div className='border-2 border-slate-300 flex max-w-[50%] justify-center items-center py-2 mt-4 rounded-lg'>
						<p>Condition: {listing?.condition}</p>
					</div>
				</div>

				<div className='px-4'>
					{' '}
					<div className='border-b my-4 py-2 border-slate-200 '>
						<p className='font-semibold text-sm'>DESCRIPTION</p>

						<div className={`wrapper  ${readMore ? 'isOpen' : ''}`}>
							<p className={`overflow-hidden my-2  `}>{listing?.description}</p>
						</div>
						{listing?.description.length > 500 && <button onClick={() => setReadMore(true)}>Read more...</button>}
					</div>
					<div>
						<p className='font-semibold text-sm'>SELLER</p>
						<div className='py-2 flex border-b my-4 border-slate-200'>
							<img className='rounded-full w-14 h-14 mr-4' src={listing?.createdBy?.avatarUrl || avatar} alt='' />
							<div className='px-4'>
								<p className='text-2xl '>{listing?.createdBy?.displayName.split(' ')[0]}</p>

								<p>
									Joined{' '}
									{formatDistanceToNow(new Date(listing?.createdBy?.joined?.seconds * 1000), { addSuffix: true })}
								</p>
								<p className='py-4  '>More from this seller</p>
							</div>
						</div>

						<div className='flex justify-between items-center'>
							<div className='h-1/2'>
								<p className='font-semibold'>{listing.listingLocation.split(',')[0]},</p>
								<p>{listing.listingLocation.split(',')[1]}</p>
							</div>
							<img onClick={() => setDisplayLocation(true)} src={staticMap} alt='' />
						</div>
					</div>
				</div>
			</div>

			{/* Fixed bottom and Modal */}
			{callModal && (
				<div
					className=' h-screen z-[70]
       w-full fixed'>
					<div onClick={() => setCallModal(false)} className='bg-black bg-opacity-80 h-full'>
						asdf
					</div>
					<div
						className={`bg-white flex justify-center items-center translate-y-[0%] transition-all flex-col w-full fixed bottom-0   slide-in-bottom  `}>
						<p className='text-lg font-semibold my-4'>Phone number</p>
						<p className='font-bold text-3xl'>{listing?.phoneNumber}</p>
						<a
							href={`tel:${listing?.phoneNumber}`}
							className='my-4 text-white bg-teal-950 font-bold w-[70%] flex justify-center items-center cursor-pointer text-xl border-2 border-teal-950 rounded h-[45px]'>
							Phone call
						</a>
						<a
							href={`sms:${listing?.phoneNumber}`}
							className='text-teal-950 font-bold w-[70%] text-xl border-2 border-teal-950 rounded h-[45px] flex justify-center items-center cursor-pointer'>
							Send text
						</a>

						<p
							onClick={() => setCallModal(false)}
							className='border-b-2 border-teal-950 cursor-pointer font-bold text-lg pb-2 mb-8 mt-4 pt-4'>
							Cancel
						</p>
					</div>
				</div>
			)}
			{!preview && (
				<div
					className={`${
						displaySlider ? 'bg-transparent' : 'bg-white'
					} w-full fixed bottom-0 z-[80] h-[70px] flex justify-center items-center px-4 space-x-4`}>
					<button
						onClick={() => setCallModal(true)}
						className={` ${
							displaySlider ? 'border-white text-white' : 'text-teal-950 border-teal-950 '
						} font-bold w-1/2 text-xl border-2  rounded h-[45px]`}>
						Call / SMS
					</button>
					<button
						className={`${
							displaySlider ? 'text-teal-950 bg-white border-white' : 'text-white bg-teal-950 border-teal-950'
						} font-bold w-1/2 text-xl border-2  rounded h-[45px]`}>
						Message
					</button>
				</div>
			)}
			{preview && (
				<div className='bg-white w-full fixed bottom-0 z-[70] h-[70px] flex justify-center items-center px-4 space-x-4'>
					<button
						onClick={() => navigate(-1)}
						className=' text-teal-950 font-bold w-1/2 text-xl border-2 border-teal-950 rounded h-[45px]'>
						Go back
					</button>
					<button
						onClick={handleSubmit}
						className=' text-white bg-teal-950 font-bold w-1/2 text-xl border-2 border-teal-950 rounded h-[45px]'>
						Add listing
					</button>
				</div>
			)}
			{displayLocation && <LocationDisplay listing={listing} setDisplayLocation={setDisplayLocation} />}
		</div>
	)
}
