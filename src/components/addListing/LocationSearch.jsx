import React, { useState, useRef } from 'react'
import axios from 'axios'
export default function LocationSearch({ setListingLocation, listingLocation, setCoordinates }) {
	const handleGeo = async placeID => {
		const apiKey = 'AIzaSyBDd9t4NmQlVlLFfmrL2vQO8HVg9reqwaM'
		const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${apiKey}&place_id=${placeID}&fields=geometry`

		const response = await fetch(url)
		const result = await response.json()
		const latitude = result.result.geometry.location.lat
		const longitude = result.result.geometry.location.lng

		setCoordinates({ latitude, longitude })
		return latitude
	}

	const [suggestions, setSuggestions] = useState([])
	console.log(suggestions)
	const handleInputChange = event => {
		const value = event.target.value
		setListingLocation(value)

		const autocompleteService = new window.google.maps.places.AutocompleteService()
		autocompleteService.getPlacePredictions({ input: value, types: ['(cities)'] }, (results, status) => {
			if (status === window.google.maps.places.PlacesServiceStatus.OK) {
				setSuggestions(results)
			} else {
				setSuggestions([])
			}
		})
	}

	const handleSelectSuggestion = placeId => {
		handleGeo(placeId)
		const placesService = new window.google.maps.places.PlacesService(document.createElement('div'))
		placesService.getDetails({ placeId: placeId, fields: ['formatted_address', 'geometry'] }, (place, status) => {
			if (status === window.google.maps.places.PlacesServiceStatus.OK) {
				// Do something with the selected city
				console.log(place.formatted_address, place.geometry.location)
				setListingLocation(place.formatted_address)
			}
		})

		setSuggestions([])
	}
	return (
		<div className='max-w-screen'>
			<input
				type='text'
				placeholder='Enter a city'
				value={listingLocation}
				onChange={handleInputChange}
				className='w-full group-focus p-4 drop-shadow peer z-10 pl-[60px] rounded bg-slate-200 placeholder:text-sky-950 '
			/>
			<ul
				className={`bg-slate-100 p-4 space-y-2   mt-2 w-full  peer-focus:${
					listingLocation.length > 0 ? '  h-full' : 'hidden h-0 overflow-hidden fixed  '
				} rounded-b `}>
				{suggestions.map(suggestion => {
					console.log(suggestion)
					return (
						<li
							className={` ${
								listingLocation.length == 0 ? 'hidden h-0 overflow-hidden fixed' : ''
							} border-b border-slate-300 p-2`}
							key={suggestion.place_id}
							onClick={() => handleSelectSuggestion(suggestion.place_id)}>
							{suggestion.description}
						</li>
					)
				})}
			</ul>
		</div>
	)
}
