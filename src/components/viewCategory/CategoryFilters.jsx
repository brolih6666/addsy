import React, { useEffect, useRef } from 'react'
import back from '../../assets/arrow_back.svg'
import filter from '../../assets/filter.svg'
export default function CategoryFilters() {
	const filterDiv = useRef(null)

	useEffect(() => {
		filterDiv.current.scrollLeft = 100
		// filterDiv?.current.scrollLeft = 100
	}, [])
	return (
		<div ref={filterDiv} className=' flex px-4  overflow-scroll pb-2'>
			<button className=' bg-white px-4 text-black mr-2 rounded text flex flex-row justify-center items-center'>
				<p className='px-2 py-1'>Filters</p>
				<img src={filter} className=' w-5 h-5 rotate-[270deg] ' alt='' />
			</button>
			<button className=' bg-white px-4 text-black mr-2 rounded text flex flex-row justify-center items-center'>
				<p className='px-2 whitespace-nowrap'>Choose category</p>
				<img src={back} className=' w-5 h-5 rotate-[270deg] -translate-y-1' alt='' />
			</button>
			<button className=' bg-white px-4 text-black mr-2 rounded text flex flex-row justify-center items-center'>
				<p className='px-2 whitespace-nowrap'>Choose location</p>
				<img src={back} className=' w-5 h-5 rotate-[270deg] -translate-y-1' alt='' />
			</button>
		</div>
	)
}
