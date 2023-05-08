import React, { useState, useEffect } from 'react'
import back from '../../assets/arrow_back.svg'
import check from '../../assets/check.svg'
import addPhoto from '../../assets/addPhoto.svg'
import location from '../../assets/locationIcon.svg'
import { useNavigate, Link } from 'react-router-dom'
import LocationSearch from './LocationSearch'
import { v4 as uuidv4 } from 'uuid'
import { UserAuth } from '../../context/AuthContext'
import { storage } from '../../firebase'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import ChooseCategory from './ChooseCategory'
import useFirestore from '../../hooks/useFirestore'
export default function AddListing({ activeUser, activeUserFetch }) {
	const { addDocument } = useFirestore('listings')
	const { updateDocument } = useFirestore('users')
	const { user } = UserAuth()
	const [listingTitle, setListingTitle] = useState()
	const [showCategories, setShowCategories] = useState(false)
	const [category, setCategory] = useState()
	const [subCategory, setSubcategory] = useState()
	const [selectedImages, setSelectedImages] = useState([])
	const [selectedFiles, setSelectedFiles] = useState([])
	const [price, setPrice] = useState()
	const [negotiable, setNegotiable] = useState(false)
	const [free, setFree] = useState(false)
	const [trade, setTrade] = useState(false)
	const [description, setDescription] = useState()
	const [listingLocation, setListingLocation] = useState('')
	const [coordinates, setCoordinates] = useState()
	const [emailAddress, setEmailAddress] = useState()
	const [phoneNumber, setPhoneNumber] = useState()
	const [condition, setCondition] = useState()
	const [conditionOpen, setConditionOpen] = useState(false)
	const [errArr, setErrArr] = useState([])
	const errorsArray = []
	const navigate = useNavigate()
	const imgsUrl = []
	const id = uuidv4()
	const createdAt = Math.round(Date.now() / 1000)

	// Condition

	// Transaction Type
	const resetTransactionType = () => {
		setPrice(0)
		setFree(false)
		setTrade(false)
	}

	// Photo upload
	const handleImageChange = e => {
		if (e.target.files) {
			const filesArray = Array.from(e.target.files).map(file => URL.createObjectURL(file))

			setSelectedFiles(Array.from(e.target.files))
			// console.log("filesArray: ", filesArray);

			setSelectedImages(prevImages => prevImages.concat(filesArray))
			Array.from(e.target.files).map(
				file => URL.revokeObjectURL(file) // avoid memory leak
			)
		}
	}
	const renderPhotos = source => {
		// console.log('source: ', source)
		return source.map(photo => {
			return <img className='w-2/3 max-h-[250px] pr-2 py-2 object-cover ' src={photo} alt='' key={photo} />
		})
	}

	const uploadImgs = async files => {
		files.map(async img => {
			const imgRef = await ref(storage, '/listings/' + user.uid + '/' + id + '/' + img.name)

			await uploadBytes(imgRef, img).then(res => {
				console.log(res)
				console.log('image uploaded')
			})

			try {
				const url = await getDownloadURL(imgRef)
				// Use the URL to display the image in your application
				console.log(url)

				await imgsUrl.push(url)
			} catch (error) {
				// Handle any errors that occur
				console.error(error)
			}
		})
	}

	// Listing submit
	const listingObj = {
		id,
		listingTitle,
		category,
		subCategory,
		description,
		listingLocation,
		coordinates,
		price,
		negotiable,
		free,
		trade,
		emailAddress,
		phoneNumber,
		imgsUrl,
		selectedImages,
		createdAt,
		condition,
		createdBy: activeUser,
		active: true,
	}

	// Error check

	const errorCheck = () => {
		!listingTitle && errorsArray.push(`Listing Title is blank.`)
		!category && errorsArray.push(`You didn't selected the category.`)
		!subCategory && errorsArray.push(`You didn't selected the subcategory.`)
		!description && errorsArray.push(`Listing has no description.`)
		!listingLocation && errorsArray.push(`You didn't selected item location.`)
		!price && !free && !trade && errorsArray.push(`You didn't named to price for the item.`)
		!emailAddress && errorsArray.push(`Select email address for commu`)
		!phoneNumber && errorsArray.push(`Type in phone number for easier communication.`)
		!condition && errorsArray.push(`Select listed item condition.`)
		setErrArr(errorsArray)
	}

	// Submitting
	const handleSubmit = async e => {
		e.preventDefault()
		errorCheck()
		if (errorsArray.length > 0) return

		await uploadImgs(selectedFiles)

		setTimeout(async () => {
			await addDocument(listingObj, 'listings')
			await updateDocument(activeUser, {
				listings: [...activeUser.listings, listingObj.id],
			})
			navigate('/')
		}, 3000)
	}
	// Preview
	const handlePreview = async e => {
		e.preventDefault()
		errorCheck()
		if (errorsArray.length > 0) return

		navigate(`/preview/${listingObj.id}`, {
			state: {
				listing: listingObj,
				selectedFiles: selectedFiles,
				preview: true,
			},
		})
	}
	useEffect(() => {
		activeUserFetch()
	}, [imgsUrl])

	return (
		<>
			{!showCategories && (
				<div className='p-4 text-black flex-col w-full flex text-left md:w-[1300px] '>
					<div className='flex flex-col'>
						<img
							onClick={() => {
								navigate(-1)
							}}
							src={back}
							className='w-9 h-7 pl-2 cursor-pointer  '
							alt=''
						/>
						<h2 className='text-3xl mt-4 mb-2 font-semibold'>Add listing</h2>
					</div>

					{/* Listing Title */}
					<form onSubmit={e => e.preventDefault()} className='py-6 pt-2 w-full '>
						<div className='space-y-2 my-6'>
							<label className='text-sky-950'>Listing title*</label>
							<input
								onChange={e => setListingTitle(e.target.value)}
								value={listingTitle || ''}
								type='text'
								className='w-full p-4 rounded bg-slate-200 placeholder:text-sky-950 '
								placeholder='E.g. iPhone 11 warranty'
							/>
						</div>

						{/* Category */}

						<div className='space-y-2 relative my-6'>
							<label className='text-sky-950'>Category*</label>
							<input
								onClick={e => setShowCategories(true)}
								onChange={e => setCategory(e.target.value)}
								value={subCategory ? category?.categoryName + ' / ' + subCategory : 'Choose category'}
								type='text'
								className='w-full cursor-pointer p-4 rounded bg-slate-200 placeholder:text-sky-950 '
								placeholder='Choose category'
							/>
							<img src={back} className='absolute right-7 bottom-3 rotate-180 w-7 ' alt='' />
						</div>

						{/* Add photo */}
						<div className='flex flex-col justify-center bg-opacity-60 items-center w-full h-[230px] bg-yellow-100 space-y-4'>
							<img src={addPhoto} alt='' className='h-1/4 ' />

							<input
								type='button'
								id='loadFileXml'
								value='Add photos'
								className='border-2 border-teal-700  rounded font-semibold text-teal-700  outline-none hover:text-white  hover:bg-teal-700 px-5 py-2  text-red text-center'
								onClick={() => document.getElementById('file').click()}
							/>

							<input
								multiple
								id='file'
								name='file'
								accept='image/*'
								type='file'
								className='hidden'
								onChange={handleImageChange}
							/>
						</div>
						{selectedImages && (
							<div className='w-full flex flex-row overflow-scroll'>{renderPhotos(selectedImages)}</div>
						)}

						{/* Description */}
						<div className='space-y-2 my-6'>
							<label className='text-sky-950'>Description*</label>
							<textarea
								onChange={e => setDescription(e.target.value)}
								value={description || ''}
								type='text'
								className='w-full h-[150px] p-4 rounded bg-slate-200 placeholder:text-sky-950 '
								placeholder='Add information that would be important for you while browsing trough listing like this'
							/>
						</div>
						{/* Transaction Type */}
						<div className='bg-slate-200 rounded'>
							<button
								onClick={resetTransactionType}
								className={`w-1/3 p-4 font-semibold rounded-l ${
									!free && !trade ? `bg-teal-950 text-white` : 'bg-transparent text-teal-950'
								}`}>
								Price
							</button>
							<button
								onClick={() => {
									resetTransactionType()
									setFree(true)
								}}
								className={`w-1/3 p-4 font-semibold ${
									free ? `bg-teal-950 text-white` : 'bg-transparent text-teal-950'
								}`}>
								Free
							</button>
							<button
								onClick={() => {
									resetTransactionType()
									setTrade(true)
								}}
								className={`w-1/3 p-4 font-semibold rounded-r ${
									trade ? `bg-teal-950 text-white` : 'bg-transparent text-teal-950'
								}`}>
								Exchange
							</button>
						</div>
						{/* Price */}
						{!trade && !free && (
							<div className='space-y-2 relative my-6'>
								<label className='text-sky-950'>Price*</label>
								<input
									onChange={e => setPrice(e.target.value)}
									value={price && price}
									type='number'
									className='w-full cursor-pointer p-4 rounded bg-slate-200 placeholder:text-sky-950 '
									placeholder='Name a fair price for the item'
								/>

								{/* Negotiable */}
								<div className='  pt-2 pl-6 flex w-full justify-between items-center '>
									<p>Price is negotiable</p>
									<div
										onClick={() => {
											!negotiable ? setNegotiable(true) : setNegotiable(false)
										}}
										className={`${
											negotiable ? 'bg-teal-950' : 'bg-slate-200'
										} transition-all rounded-full w-[70px] p-1  `}>
										<div
											className={` flex justify-center items-center w-5 h-5 rounded-full transition-all ${
												negotiable ? 'bg-slate-200 translate-x-[40px]' : 'bg-teal-950'
											}`}>
											<div
												className={` ${
													negotiable ? 'bg-teal-950' : 'bg-slate-200'
												} w-3 h-3 transition-all rounded-full r`}></div>
										</div>
									</div>
								</div>
							</div>
						)}

						{/* Condition */}
						<div className='my-6 '>
							{' '}
							<div className='space-y-2 relative '>
								<label className='text-sky-950'>Condition*</label>
								<input
									onClick={() => {
										setConditionOpen(true)
									}}
									type='text'
									className='w-full cursor-pointer outline-none border-none p-4 rounded bg-slate-200 placeholder:text-sky-950 '
									value={condition ? condition : 'Choose'}
								/>
								<img
									onClick={() => setConditionOpen(false)}
									src={back}
									className={`absolute right-5 transition-all  w-8 ${
										conditionOpen ? 'rotate-90 bottom-1' : 'rotate-[270deg] bottom-5'
									}`}
									alt=''
								/>
							</div>
							<div
								className={`px-4 py-2 border-t-2 ${
									conditionOpen ? 'h-full' : 'hidden'
								}  transition-all  border-teal-950 bg-slate-200 shadow`}>
								<div className='flex flex-row justify-between'>
									<p
										onClick={e => {
											setCondition(e.target.textContent)
											setConditionOpen(false)
										}}
										className={`py-2 cursor-pointer ${condition == 'New' ? 'font-bold' : ''}`}>
										New
									</p>
									<img src={check} className={`w-10 ${condition == 'New' ? 'block' : 'hidden'}`} alt='' />
								</div>
								<div className='flex flex-row justify-between'>
									<p
										onClick={e => {
											setCondition(e.target.textContent)
											setConditionOpen(false)
										}}
										className={`py-2 cursor-pointer ${condition == 'Used' ? 'font-bold' : ''}`}>
										Used
									</p>
									<img src={check} className={`w-10 ${condition == 'Used' ? 'block' : 'hidden'}`} alt='' />
								</div>{' '}
								<div className='flex flex-row justify-between'>
									<p
										onClick={e => {
											setCondition(e.target.textContent)
											setConditionOpen(false)
										}}
										className={`py-2 cursor-pointer ${condition == 'Broken' ? 'font-bold' : ''}`}>
										Broken
									</p>
									<img src={check} className={`w-10 ${condition == 'Broken' ? 'block' : 'hidden'}`} alt='' />
								</div>
							</div>
						</div>

						{/* Location */}
						<div className='space-y-2 relative my-6'>
							<label className='text-sky-950'>Location*</label>

							<img className='absolute left-4 w-7 top-9 z-30' src={location} alt='' />
							<LocationSearch setListingLocation={setListingLocation} listingLocation={listingLocation} setCoordinates={setCoordinates} />

							{/* <img src={back} className='absolute right-7 top-9 rotate-180 w-7 ' alt='' /> */}
						</div>

						<h2 className='text-xl font-semibold z-30'>Contact details</h2>
						{/* Email address */}
						<div className='space-y-2 my-6'>
							<label className='text-sky-950'>Email address*</label>
							<input
								onChange={e => setEmailAddress(e.target.value)}
								value={emailAddress || ''}
								type='text'
								className='w-full p-4 rounded bg-slate-200 placeholder:text-sky-950 '
								placeholder='Your email address'
							/>
						</div>
						{/* Phone Number */}
						<div className='space-y-2 my-6'>
							<label className='text-sky-950'>Phone number*</label>
							<input
								onChange={e => setPhoneNumber(e.target.value)}
								value={phoneNumber || ''}
								type='number'
								className='w-full p-4 rounded bg-slate-200 placeholder:text-sky-950 '
								placeholder='Your phone number'
							/>
						</div>
						{errArr?.length > 0 && (
							<div className=' rounded-lg slide-in-bottom z-30 p-4 my-4 font-semibold'>
								{errArr?.map(err => {
									return <p className='rounded bg-red-500 text-white px-2 py-1 my-2'>!!! {err}</p>
								})}
							</div>
						)}
						<div className='flex flex-col w-full font-semibold space-y-6 z-40'>
							<button onClick={handlePreview} className='w-full h-12 border-2 border-teal-950 text-teal-950 rounded '>
								Preview listing
							</button>
							<button onClick={handleSubmit} className='w-full h-12 bg-teal-950 text-white rounded '>
								Add listing
							</button>
						</div>
					</form>
				</div>
			)}
			{showCategories && (
				<ChooseCategory
					category={category}
					setCategory={setCategory}
					setShowCategories={setShowCategories}
					subCategory={subCategory}
					setSubcategory={setSubcategory}
				/>
			)}
		</>
	)
}
