import React from 'react'
import search from '../assets/searchIcon.svg'
export default function Searchbar() {
	return (
		<div className='sticky bg-slate-100 px-4 md:px-2 py-4 md:py-12 w-full md:flex md:relative flex-col items-center'>
			<div className='flex h-12 md:h-16 w-full max-w-[1250px] '>
				<input placeholder='Find something for yourself...' className=' px-6 grow rounded-l bg-white' type='search' />
				<div className='flex rounded-r  items-center  min-w-[40px] flex-row  bg-teal-900'>
					<p className='hidden md:flex font-bold px-4 pl-6 '>Search</p>
					<img className='h-6 w-12 md:h-12 md:w-12 md:pr-4 ' src={search} alt='' />
				</div>
			</div>
		</div>
	)
}
