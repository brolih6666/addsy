import React, { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import back from '../../assets/arrow_back.svg'
import locationIcon from '../../assets/locationIcon.svg'
export default function LocationDisplay({ listing, setDisplayLocation }) {
	const navigate = useNavigate()
	console.log(listing)
	let map
	const mapDiv = useRef()
	function initMap() {
		const position = { lat: listing.coordinates.latitude, lng: listing.coordinates.longitude }

		const map = new google.maps.Map(document.getElementById('map'), {
			zoom: 12,
			center: position,
		})
	}

	useEffect(() => {
		mapDiv.current && initMap()
	}, [mapDiv.current])

	return (
		<div className='h-full w-full fixed top-0 bg-black bg-opacity-60 z-[99] flex flex-col'>
			<div className='bg-white flex items-center justify-center p-4'>
				<img onClick={() => setDisplayLocation(false)} src={back} className='w-7 absolute left-4' alt='' />
				<h2 className='text-xl font-semibold'> {listing.listingTitle}</h2>
			</div>
			<div ref={mapDiv} className='h-full w-full' id='map'></div>
			<div className='bg-white h-16 flex items-center p-2 border-t border-slate-600  bottom-0'>
				<img src={locationIcon} className='w-6' alt='' />
				<p className='ml-4'>{listing?.listingLocation}</p>
			</div>
		</div>
	)
}
